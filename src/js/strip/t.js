#USAGE_BEGIN#traliva_kit_debug##
registerHelp('$Strip', {
	title: 'Линейный лейаут: элементы встроку или встолбец',
	//descr: '',
	options:{
		$orient: 'горизонтальный или вертикальный. Перечисление $TralivaKit__Strip__orient:v,h'
	},
	//stateObj:{}
});
#USAGE_END#traliva_kit_debug##

#ENUM#$TralivaKit__Strip__orient:v,h##
//#e#$TralivaKit__Strip__orient:h##;
function $Strip($p_wContainer, $p_options, $p_descr){
	var $children = $Traliva.$WidgetStateSubscriber.call(this, $p_wContainer, $p_options, $p_descr);
	this.$__orient = $p_options.$orient;
	this.$__items = [];
	this.$__sizes = [];
	this.$__w;
	this.$__h;
	this.$__wContainer = $p_wContainer;

	this.$_eTable = document.createElement('table');
	this.$_eTable.style.border = 'none';
	this.$_eTable.cellSpacing = '0';
	if (this.$__orient === #e#$TralivaKit__Strip__orient:h##){
		this.$_eRowSingle = this.$_eTable.insertRow(0);
	}
	$p_wContainer.$setContent(this.$_eTable);
	(function(self, $p_wContainer){
	$p_wContainer.$_onResized = function($w, $h){
		self.$__w = $w;
		self.$__h = $h;
		self.$__updateSizes();
	};
	$p_wContainer.$_onChildVisibilityChanged = function($wChild){
		self.$__updateSizes();
	};
	})(this, $p_wContainer);
	console.log('strip constructor parameters: ', $p_wContainer, $p_options, $p_descr);
	//this.$_updateItems($p_options.$_children.$items);
	console.log('strip constructor children: ', $children);
	if ($children)
		this.$_updateItems($children.$items);
	//$_WidgetBase.call(this, $p_parentWidget, $p_attr);
	// ...
};
$Strip.prototype = Object.create($Traliva.$WidgetStateSubscriber.prototype);
$Strip.prototype.constructor = $Strip;
$Strip.$widgetsFields = ['$items'];
{%% process_state_changes.js %%}
{%% __update_sizes.js %%}
$Strip.prototype.$_updateItems = function($p_content){
	console.log('^^', $p_content);//
	var $1,
		$eCell, $itemWidget, $size,
		$0;
	// убираем лишние
	for ($1 = $p_content.length ; $1 < this.$__items.length ; ++$1){
	}

	// добавляем новые
	for ($1 = this.$__items.length ? this.$__items.length - 1 : 0 ; $1 < $p_content.length ; ++$1){
		$size = this.$_transformStringSize($p_content[$1].$size);
		$itemWidget = $p_content[$1].$_widget;
		if (this.$__orient == #e#$TralivaKit__Strip__orient:h##){
			$eCell = this.$_eRowSingle.insertCell(this.$_eRowSingle.cells.length);
		}
		else {
			var $eRow = this.$_eTable.insertRow(this.$_eTable.rows.length);
			$eCell = $eRow.insertCell(0);
		}
		$eCell.appendChild($itemWidget.$_div);
		$eCell.style.padding = '0';
		this.$__items.push($itemWidget);
		this.$__sizes.push($size);
	}

	/*var $eCell;
	if (this.$__orient === #e#TralivaKit__Strip__orient:h##){
		//$eCell = this.$_eRowSingle.insertCell(this.$_eRowSingle.cells.length);
		
	}
	else {
		var $eRow = this.$_eTable.insertRow(this.$_eTable.rows.length);
		$eCell = $eRow.insertCell(0);
	}
	$eCell.appendChild($p_itemWidget.$_div);
	$eCell.style.padding = '0';
	this.$__items.push($p_itemWidget);
	this.$__sizes.push($size);*/
};
$Strip.prototype.$_updateLayout = function($p){
	console.log('strip: update layout: ', $p);//
	this.$_updateItems($p ? ($p.$items || []) : []);
};
