#USAGE_BEGIN#traliva_kit_debug##
registerHelp('$230606Table', {
	title: 'Таблица (с шапками)',
	//descr: '',
	//options:{},
	stateObj:{
		table_changes: 'объект, описывающий изменения в таблице (полная сверка данных таблицы каждый раз не производится - тот, кто вносил изменения, должен отписаться также и о том, какие изменения были произведены). Возможные свойства: reset (полное обновление), reset_body (обновляем всё, кроме горизонтальной шапки), cols, rows, cells',
		table_data: 'содержимое таблицы. Свойства: h - список полей в горизонтальной шапке (поле описывается объектом с полем t, где указывается текст, возможно с "|", если нужна иерархическая шапка);\nrows - список строк. Данные ячеек задаются в свойстве d объекта, описывающего строку (в d список объектов, описывающих ячейки, с текстом ячейки в свойстве t)'
	}
});
#USAGE_END#traliva_kit_debug##

/*
Сокращения:
HH - horizontal header
VH - vertical header
*/

//-----------------------------------------------

var $230606Table_TableViewWidget__maxColumnWidth = 60;//pixels
function $230606Table_TableViewWidget(p_parentWidget){
	this.__w;
	this.__h;
	this._hhElements = [];
	this._eHHTable;
	this._eBodyTable
	$Traliva.$_WidgetBase.call(this, p_parentWidget, true);
};
$230606Table_TableViewWidget.prototype = Object.create($Traliva.$_WidgetBase.prototype);
$230606Table_TableViewWidget.prototype.constructor = $230606Table_TableViewWidget;
$230606Table_TableViewWidget.prototype.$_createContentElem = function(){
	this._eTable = document.createElement('table');
	this._eTable.style.borderCollapse = 'collapse';
	this._tableData;
	
	this._eTopHalf = this._eTable.insertRow();
	
	this._eCorner = this._eTopHalf.insertCell();
	this._eCorner.style.margin = '0';
	
	var eHHCell = this._eTopHalf.insertCell();
	eHHCell.style.margin = '0';
	eHHCell.style.padding = '0';
	this._eHH = document.createElement('div');
	this._eHH.style.overflow = 'hidden';
	eHHCell.appendChild(this._eHH);
	
	this._eBottomHalf = this._eTable.insertRow();
	
	this._eVH = this._eBottomHalf.insertCell();
	this._eVH.style.margin = '0';
	this._eVH.style.padding = '0';
	
	var eBodyCell = this._eBottomHalf.insertCell();
	eBodyCell.style.margin = '0';
	eBodyCell.style.padding = '0';
	this._eBody = document.createElement('div');
	this._eBody.id="_eBody";
	this._eBody.style.overflow = 'auto';
	eBodyCell.appendChild(this._eBody);
	
	var  eDiv = document.createElement('div');
	eDiv.appendChild(this._eTable);

	return eDiv;
};
$230606Table_TableViewWidget.prototype.$_onResized = function(w,h){
	this.__w = w;
	this.__h = h;
	
	if (true){
		var tmpH = (h - this._eHH.offsetHeight) + 'px';
		var tmpW = w + 'px';
		
		this._eBody.style.height = tmpH;
		this._eBody.style.minHeight = tmpH;
		this._eBody.style.maxHeight = tmpH;
		this._eBody.style.width = tmpW;
		this._eBody.style.minWidth = tmpW;
		this._eBody.style.maxWidth = tmpW;
		
		//this._eHH.style.height = h;
		//this._eHH.style.minHeight = h;
		//this._eHH.style.maxHeight = h;
		this._eHH.style.width = tmpW;
		this._eHH.style.minWidth = tmpW;
		this._eHH.style.maxWidth = tmpW;
	}
};
function removeColItemsFromTable(eTable){
	var itemsToRemove = [];
	var list = eTable.childNodes;
	for (var i = 0 ; i < list.length ; i++){
		var e = list[i];
		if (e.tagName == 'TBODY'){
			var list1 = e.childNodes;
			var itemsToRemove1 = [];
			for (var i1 = 0 ; i1 < list1.length ; i1++){
				var e1 = list1[i1];
				if (e1.tagName == 'COL'){
					itemsToRemove1.push(e1);
				}
			}
			for (var i1 = 0 ; i1 < itemsToRemove1.length ; i1++){
				var e1 = itemsToRemove1[i1];
				console.log(1);//
				e.removeChild(e1);
			}
		}
		else if (e.tagName == 'COL'){
			itemsToRemove.push(e);
		}
	}
	for (var i = 0 ; i < itemsToRemove.length ; i++){
		var e = itemsToRemove[i];
		eTable.removeChild(e);
		console.log(1);//
	}
};
$230606Table_TableViewWidget.prototype.$_updateSizes = function(){
	//synchronize headers and body (header and body cell sizes)
	//здесь должны убрать предыдущие элементы "col" из "table"-ов
	removeColItemsFromTable(this._eHHTable);
	removeColItemsFromTable(this._eBodyTable);
	
	if (this.hasOwnProperty('_eBodyTable') && this.hasOwnProperty('_eHHTable')
		&& this._tableData && this._tableData.hasOwnProperty('h')){
		for (var i = 0 ; i < this._tableData.h.length ; i++){
			var maxWidth = 0;
			if (this._eBodyTable.rows.length){
				// boris here: здесь не по первой строке одной надо, а циклом по всем строкам
				var row = this._eBodyTable.rows[0];
				if (row && row.cells.length > i)
					maxWidth = row.cells[i].offsetWidth;

				this._eBodyTable.rows[0].cells[i].children[0].style.width = '' + maxWidth + 'px';//
			}
			if (this._hhElements[i]){
				var tmp = this._hhElements[i].offsetWidth;
				if (tmp > maxWidth)
					maxWidth = tmp;

				this._hhElements[i].children[0].style.width = '' + maxWidth + 'px';//
			}
			/*var eHHCol = document.createElement('col');
			var eBodyCol = document.createElement('col');
			eHHCol.style.width = maxWidth + 'px';
			eBodyCol.style.width = maxWidth + 'px';
			this._eHHTable.appendChild(eHHCol);
			this._eBodyTable.appendChild(eBodyCol);*/

			//this._eHHTable.rows[this._eHHTable.rows.length - 1].cells[2].children[0].style.width = '200px';
			//this._eHHTable.rows[0].cells[2].children[0].style.width = '200px';
		}
	}
	else
		console.log(1);
	
	var totalWidth = 0;
	var totalHeight = 0;
	var h = this._eBodyTable.offsetHeight;
	//var w = this._eBodyTable.offsetWidth - this._eBody.offsetWidth;
	var w = this._eHHTable.offsetWidth;
	totalWidth += w;
	totalHeight += h;
	h = h + 'px';
	w = w + 'px';
	this._eBody.style.height = h;
	this._eBody.style.minHeight = h;
	this._eBody.style.maxHeight = h;
	this._eBody.style.width = w;
	this._eBody.style.minWidth = w;
	this._eBody.style.maxWidth = w;
	
	this._eBodyTable.style.height = h;
	this._eBodyTable.style.minHeight = h;
	this._eBodyTable.style.maxHeight = h;
	this._eBodyTable.style.width = w;
	this._eBodyTable.style.minWidth = w;
	this._eBodyTable.style.maxWidth = w;
	
	h = this._eHHTable.offsetHeight;
	w = this._eHHTable.offsetWidth;
	totalWidth += w;
	totalHeight += h;
	h = '' + h + 'px';
	w = '' + w + 'px';
	this._eHH.style.height = h;
	this._eHH.style.minHeight = h;
	this._eHH.style.maxHeight = h;
	this._eHH.style.width = w;
	this._eHH.style.minWidth = w;
	this._eHH.style.maxWidth = w;
	
	this._eHHTable.style.height = h;
	this._eHHTable.style.minHeight = h;
	this._eHHTable.style.maxHeight = h;
	this._eHHTable.style.width = w;
	this._eHHTable.style.minWidth = w;
	this._eHHTable.style.maxWidth = w;
};
$230606Table_TableViewWidget.prototype.$_reset = function(table_data){
	this._tableData = table_data;
	this._hhElements = [];
	if (table_data.hasOwnProperty('h')){ // build horizontal header
	
		if (this._eHHTable)
			this._eHH.removeChild(this._eHHTable);
		var tableWidthMaxLimit = table_data.h.length * $230606Table_TableViewWidget__maxColumnWidth;
		this._eBody.style.width = tableWidthMaxLimit + 'px';
		
		this._eHHTable = document.createElement('table');
		this._eHHTable.style.borderCollapse = 'collapse';	
		this._eHHTable.style.background = '#ccc';
		this._eHHTable.style.color = '#1d2435';
		this._eHH.style.width = tableWidthMaxLimit + 'px';
		this._eHH.style.minWidth = tableWidthMaxLimit + 'px';
		this._eHH.style.maxWidth = tableWidthMaxLimit + 'px';
		var srcMatrix = new Array(table_data.h.length);
		var maxDepth = 0;
		for(var columnCounter = 0; columnCounter < table_data.h.length; ++columnCounter) {
			var column = [];
			srcMatrix[columnCounter] = column;
			var text = '  ';
			if (table_data.h[columnCounter].t === null)
				;
			else
				text = table_data.h[columnCounter].t;
		
			var rows = text.split('|');
			srcMatrix[columnCounter] = rows;
			if (rows.length > maxDepth){
				maxDepth = rows.length;
			}
			for (var rowCounter = 0 ; rowCounter < rows.length ; ++rowCounter) {
				srcMatrix[columnCounter][rowCounter] = rows[rowCounter];
			}
		}
		var horSpanCounter = 0;
		for (var rowCounter = 0 ; rowCounter < maxDepth ; ++rowCounter) {
			var row = this._eHHTable.insertRow();
			var prevText = 'no-text';
			var cell;
			for (var columnCounter = 0 ; columnCounter < srcMatrix.length ; ++columnCounter) {
				var rowCount = srcMatrix[columnCounter].length;
				if (rowCounter < rowCount) {
					//здесь идёт вставка ячейки. Возможно со спаном.
					//Возможно, мы должны пропустить вставку ячейки,
					//если она попадает в область горизонтального спана.
					var currentText = srcMatrix[columnCounter][rowCounter];
					//в последней строке шапки никогда не бывает спанов
					if ((rowCounter == (rowCount - 1)) || (currentText != prevText)) {
						if (columnCounter > 0) {
							if (horSpanCounter > 1){
								cell.setAttribute('colspan', horSpanCounter);
							}
						}
						horSpanCounter = 1;
						cell = row.insertCell();
						if (rowCounter == (rowCount - 1)){
							cell.setAttribute('rowspan', maxDepth - rowCount + 1);
						}
						this._hhElements[columnCounter] = cell;
						
						cell.style.margin = '0';
						cell.style.border = '1px solid #313438';
						var contentDiv = document.createElement('div');
						contentDiv.setAttribute('style', 'font-weight:bold; text-align:center;');
						contentDiv.innerHTML = currentText;
						cell.appendChild(contentDiv);
					}
					else {
						++horSpanCounter;
					}
					prevText = currentText;
				}
				else {
					prevText = 'no-text';
				}
			}
		}
		this._eHH.appendChild(this._eHHTable);
	}
	this.$_resetBody(table_data);
};
$230606Table_TableViewWidget.prototype.$_resetBody = function(table_data){
	if (this._eBodyTable)
		this._eBody.removeChild(this._eBodyTable);

	this._tableData = table_data;
	if (!table_data.hasOwnProperty('rows')) // build table body
		return;
	this._eBodyTable = document.createElement('table');
	this._eBodyTable.id = "_eBodyTable";
	this._eBodyTable.style.background = '#fff';
	this._eBodyTable.style.borderCollapse = 'collapse';

	var tableWidthMaxLimit = table_data.h.length * $230606Table_TableViewWidget__maxColumnWidth;
	this._eBody.style.width = tableWidthMaxLimit + 'px';
	this._eBody.style.minWidth = tableWidthMaxLimit + 'px';
	this._eBody.style.maxWidth = tableWidthMaxLimit + 'px';
	
	for (var rowCounter = 0 ; rowCounter < table_data.rows.length ; rowCounter++){
		var eRow = this._eBodyTable.insertRow();
		var rowData = table_data.rows[rowCounter];
		if (rowData.hasOwnProperty('h')){
			// вставляем ячейки, соответствующие вертикальному хидеру
			console.log('vertical header: not implemented');
		}
		if (rowData.hasOwnProperty('d')){
			for (var colCounter = 0 ; colCounter < rowData.d.length ; colCounter++){
				var eCell = eRow.insertCell();
				eCell.style.margin = '0';
				eCell.style.border = '1px solid #313438';
				var cellData = rowData.d[colCounter];
				if (cellData.hasOwnProperty('t')){
					//eCell.innerHTML = cellData.t;
					var contentDiv = document.createElement('div');
					contentDiv.setAttribute('style', 'font-weight:bold; text-align:center;');
					contentDiv.innerHTML = cellData.t;
					eCell.appendChild(contentDiv);
				}
			}
		}
	}
	this._eBody.appendChild(this._eBodyTable);
	(function(self){
		self._eBody.addEventListener('scroll', function(){
			self._eHH.scrollLeft = self._eBody.scrollLeft;
		});
	})(this);
};
$230606Table_TableViewWidget.prototype.$_updateCols = function(table_data, changes){
	this._tableData = table_data;
	console.log('not implemented');
};
$230606Table_TableViewWidget.prototype.$_updateRows = function(table_data, changes){
	this._tableData = table_data;
	console.log('not implemented');
};
$230606Table_TableViewWidget.prototype.$_updateCells = function(table_data, changes){
	this._tableData = table_data;
	console.log('not implemented');
};

function $230606Table($p_wContainer, $p_options, $p_widgets){
	$Traliva.$WidgetStateSubscriber.call(this, $p_wContainer, $p_options, $p_widgets);
	this.$_view = new $230606Table_TableViewWidget($p_wContainer);
	$p_wContainer.$setContent(this.$_view);
};
$230606Table.prototype = Object.create($Traliva.$WidgetStateSubscriber.prototype);
$230606Table.prototype.constructor = $230606Table;
$230606Table.prototype.$processStateChanges = function(s){
	if (!s){
		console.error('epic fail');
		return;
	}
	if (!s.hasOwnProperty('table_changes'))
		return;
	if (!s.hasOwnProperty('table_data')){
		console.log("critical error: state property 'table_data' must be presented.");
		return;
	}

	var $hasChanges = false;
	if (s.table_changes.hasOwnProperty('reset')&& s.table_changes.reset){
		this.$_view.$_reset(s.table_data);
		$hasChanges = true;
	}
	else if (s.table_changes.hasOwnProperty('reset_body') && s.table_changes.reset_body){
		this.$_view.$_resetBody(s.table_data);
		$hasChanges = true;
	}
	else{
		if (s.table_changes.hasOwnProperty('cols')){
			this.$_view.$_updateCols(s.table_data, s.table_changes.cols);
			$hasChanges = true;
		}
		if (s.table_changes.hasOwnProperty('rows')){
			this.$_view.$_updateRows(s.table_data, s.table_changes.rows);
			$hasChanges = true;
		}
		if (s.table_changes.hasOwnProperty('cells')){
			this.$_view.$_updateCells(s.table_data, s.table_changes.cells);
			$hasChanges = true;
		}
	}
	if ($hasChanges){
		this.$_view.$_updateSizes();
		this.$_view.$_onResized(this.$_view.__w,this.$_view.__h);//самому непонятно, зачем это вызывать. Но без этого пропадают скролл-бары после обновления(т.е. повторной установки) содержимого.
		
		//delete s.table_changes;
		//this.$_registerStateChanges();
	}
};
//$230606Table.$widgetsFields = [];
