registerHelp('Tree', {
    title: 'Дерево. Многоколоночное. С функцией мониторинга состояния (иконка и текст могут меняться). Поддерживается ленивая подгрузка узлов.',
    //descr: '',
    options:{
        selectable: 'boolean. можно ли выбирать элементы(в каждый момент времени может быть выбран только один элемент). По умолчанию - да.',
        getChildren: 'function. На вход id родителя (или undefined для корневых элементов). На выход - список дочерних элементов (см. help(\'Tree\', \'item\')). Если задано, get_children_url игнорируется и ленивая подгрузка не используется.',
        getChildrenUrl: 'function. На вход id родителя (или undefined для корневых элементов). На выход - URL, с которого грузить дочерние элементы (см. help(\'Tree\', \'item\')',
        //updates. Имеется ввиду автоматическое обновление дерева, в случае, когда данные изменились на сервере. Для ручного изменения данных используйте объект changes.
        // Обновления пока не поддерживаются - когда надо будет, надо будет в Тралива включать Инициатор (агент обратной связи с сервером), и изменения в дереве получат ьчерез тот агент.
        //updates: 'объект. Поля: "initiator" - ; "interval" - интервал между запросами изменений в миллисекундах; "url" - сетевой адрес, по которому запрашивать изменения дерева.'
        color: 'цвет текста',
        guiElements: 'Объект, характеризующий отображение элементов дерева. Поля:\n\ttreeicons_sprite - путь к спрайту, содержащем набор линий и узлов в разных состояниях\n\ttreeicons_w - ширина элемента спрайта (в пикселях)\n\ttreeicons_h - высота элемента спрайта (в пикселях)\n\tstates_sprite - путь к спрайту, содержащем набор иконок для разных состояний узла дерева\n\tstates_w - ширина элемента спрайта (в пикселях)\n\tstates_h - высота элемента спрайта (в пикселях)'
    },
    //stateObj:{},
    children:{
        item:{
            title: 'Формат описания элемента дерева',
            options:{
                id: 'string. Уникальный идентификатор элемента дерева.',
                d: 'array. Массив, в котором задано содержимое ячеек. Для первой колонки задаётся содержимое без учёта иконки "состояния" элемента. См. help(\'Tree\', \'item\', \'content\')',
                hasChildren: 'boolean. Имеет ли этот элемент дочерние элементы, т.е. есть ли смысл запрашивать для этого элемента дочерние элементы',
                state: 'integer. Идентификатор (порядковый номер (от нуля)) "состояния" элемента - какой значок показывать'
            },
            children:{
                content:{
                    title: 'Формат описания содержимого ячейки',
                    options:{
                        e: 'текст'
                    }
                }
            }
        }
    }
});

function Tree(p_wContainer, p_options){
    if (!p_options)
        console.error('Tree: options must be set');
    if (!p_options.hasOwnProperty('guiElements'))
        p_options.guiElements = {};
    (function(p){
        if (!p.hasOwnProperty('treeicons_sprite'))
            p.treeicons_sprite = undefined;
        if (!p.hasOwnProperty('states_sprite'))
            p.states_sprite = undefined;
        p.treeicons_w = p.treeicons_w || 0;
        p.treeicons_h = p.treeicons_h || 0;
        p.states_w = p.states_w || 0;
        p.states_h = p.states_h || 0;
        if (p.states_w > p.treeicons_w)
            p.states_w = p.treeicons_w;
        if (p.states_h > p.treeicons_h)
            p.states_h = p.treeicons_h;
    })(p_options.guiElements);
    this._guielements = p_options.guiElements;

    this.options = p_options;
    Traliva.WidgetStateSubscriber.call(this, p_wContainer, p_options);
    this.eTable = document.createElement('table');
    this.eTable.style.width = "100%";
    this.eTable.style.tableLayout = "fixed";
    this.eTable.style.borderSpacing = "0";
    this.__objectMap = {};//eDiv by id
    this.__objects = {};//object by id
    this.__currentRow = -1;
    /*if (this._getUpdatesUrl){
        (function(myself){
            var func = function(){myself.__onUpdateTimer();};
            myself.intervalID = window.setInterval(func, 1000);
        })(this);
    }*/
    
    var eDest = document.createElement('div');
    eDest.className = '__treeview';
    eDest.style.overflow = "auto";
    eDest.appendChild(this.eTable);
    //this.__createElementForObject(undefined, this._getChildren());
    //eDest.style.background = "rgb(194,194,193)";
    //eDest.style.background = "url(treeicons.png) no-repeat";
    //eDest.style.background = "url(treeicons.png) repeat-x";//boris here
    //eDest.style.backgroundPositionY = '0 -160px';
    eDest.style.cursor = 'default';
    
    var stylePrefix = ".__treeview ";
    var eGlobalStylesheet = document.createElement('style');
    document.head.appendChild(eGlobalStylesheet);
    var vitrinaStylesheet = eGlobalStylesheet.sheet;
    vitrinaStylesheet.insertRule(stylePrefix + "*{cursor: default;-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;-o-user-select: none;user-select: none;}", 0);
    if (this._guielements.treeicons_sprite){
        var a0 = this._guielements;
        var a = a0.treeicons_sprite;
        var i, tmp;
        for (i = 0 ; i <= 10 ; i++){
            tmp = i * a0.treeicons_h;
            if (tmp > 0)
                tmp = '-' + tmp + 'px';
            vitrinaStylesheet.insertRule(stylePrefix + '.line_' + i + '{background:url(' + a + ') no-repeat;background-position: 0 ' + tmp + '}', 1);
            vitrinaStylesheet.insertRule(stylePrefix + '.selectedRow .line_' + i + '{background:url(' + a + ') no-repeat;background-position: -' + a0.treeicons_w + 'px ' + tmp + '}', 1);
        }
//        vitrinaStylesheet.insertRule(stylePrefix + '.row{background:url(' + a + ') repeat-x;background-position: 0 -160px}', 1);
//        vitrinaStylesheet.insertRule(stylePrefix + '.row .selectedRow{background:url(' + a + ') repeat-x;background-position: 0 -200px}', 1);
        vitrinaStylesheet.insertRule(stylePrefix + '.row{background:url(' + a + ') repeat-x;background-position: 0 -' + (8 * a0.treeicons_h) + 'px}', 1);
        vitrinaStylesheet.insertRule(stylePrefix + '.row .selectedRow{background:url(' + a + ') repeat-x;background-position: 0 -' + (10 * a0.treeicons_h) + 'px}', 1);
    }
    
    p_wContainer.setContent(eDest);
}

Tree.prototype = Object.create(Traliva.WidgetStateSubscriber.prototype);
Tree.prototype.constructor = Tree;

Tree.prototype._getChildren = function(parentObject){//<-- необходимо переопределить
    if (this.options.hasOwnProperty('getChildren'))
        return this.options.getChildren(parentObject ? parentObject.id : undefined);
    var sourcePath = this.options.getChildrenUrl(parentObject ? parentObject.id : undefined);
    var self = this;
    Traliva.ajax({
        sourcePath: sourcePath,
        readyFunc:function(result){
            var childrenObj = JSON.parse(result);
            if (parentObject){
                for (var i = 0 ; i < childrenObj.length ; i++){
                    childrenObj[i].parentId = parentObject.id;
                }
            }
            var changes = {added:childrenObj};
            self._applyChanges(changes);
        }
    });
    return [];//
/*  if (parentObject === undefined)
        return [{id:111,name:"1 мсв",hasChildren:true,state:0}];
    else{
        if (parentObject.id == 111)
            return [
                {id:222,name:"1 мсо",hasChildren:true,state:1},
                {id:333,name:"2 мсо",hasChildren:false,state:0}
            ];
        if (parentObject.id == 222)
            return [
                {id:444,name:"1 солдат",hasChildren:false,state:0},
                {id:555,name:"2 солдат",hasChildren:false,state:0},
                {id:666,name:"3 солдат",hasChildren:false,state:3}
            ];
    }
    return [];*/
    /*
    Common options needed:
    - legend (icons for states)
    - if start update item data loop
    */
};

Tree.prototype._applyChanges = function(changes){
    if (changes.removed){
    }
    if (changes.changed){
        for (var i = 0 ; i < changes.changed.length ; i++){
            var item = changes.changed[i];
            var id = item.id;
            if (!this.__objectMap.hasOwnProperty(id)){
                console.log("Error! server make update me an item, that I have not!");
                continue;
            }

            var newState = item.state;
            var eRowDiv = this.__objectMap[id];
            for (var ii = 0 ; ii < eRowDiv.childNodes.length ; ii++){
                if (eRowDiv.childNodes[ii].classList.contains("icon_container")){
                    eRowDiv.childNodes[ii].style.backgroundPosition = "-"+(parseInt(newState) * 16).toString()+"px 0px";
                }
            }
        }
    }
    if (changes.added){
        //console.log('added: '+changes.added);
        for (var i = 0 ; i < changes.added.length ; i++){
            //console.log(JSON.stringify(changes.added[i]));
            var o = changes.added[i];
            if (this.__objects.hasOwnProperty(o.id))
                this.__removeObjectChildren(o);
        }
        var groupsByParentId = {};
        for (var i = 0 ; i < changes.added.length ; i++){
            var o = changes.added[i];
            if (!o.hasOwnProperty('parentId')){
                if (!groupsByParentId.hasOwnProperty('-1'))
                    groupsByParentId[-1] = [];
                groupsByParentId[-1].unshift(o);
            }
            else{
                var parentId = o.parentId;
                if (!groupsByParentId.hasOwnProperty(parentId))
                    groupsByParentId[parentId] = [];
                groupsByParentId[parentId].push(o);
            }
        }
        for (var i in groupsByParentId){
            var oParent;//leave undefined
            if (i >= 0){
                oParent = this.__objects[i];
                if (!oParent){
                    console.log('epic fail');
                    continue;
                }
            }
            this.__createElementForObject(oParent, groupsByParentId[i])
        }
    }
}

Tree.prototype.__removeObjectChildren = function(o){
    var treeData = this._state;
    var eContainer = this.eTable;
    var candidates = [];
    var stack = [o];
    while (stack.length){
        var parent = stack.pop();
        candidates.push(parent);
        if (parent.children){
            for (var i = 0 ; i < parent.children.length ; i++){
                var child = parent.children[i];
                stack.push(child);
            }
        }
    }
    for (var i = candidates.length - 1 ; i >= 1 ; i--){
        eContainer.removeChild(candidates[i].element);
        delete candidates[i].children;
    }
    delete o.children;
    
    for (var i = candidates.length - 1 ; i >= 1 ; i--){
        var candidateId = candidates[i].id;
        treeData.removed.push(candidateId);
        delete this.__objectMap[candidateId];
        delete this.__objects[candidateId];
    }
    this._registerStateChanges();
};
Tree.prototype.__onRowClicked = function(id){
    if (id === this.__currentRow)
        return;
    var treeData = this._state;
    if (this.__objectMap.hasOwnProperty(this.__currentRow)){
        this.__objectMap[this.__currentRow].className = "";
    }
    if (this.__objectMap.hasOwnProperty(id)){
        this.__objectMap[id].className = "selectedRow";
        this.__currentRow = id;
        treeData.selected = id;
        this._registerStateChanges();
    }
    else{
        console.log('epic fail: clicked on absense row');
    }
};
Tree.prototype.__createElementForObject = function(wsObject, children){
    var children = this._getChildren(children);
    var treeData = this._state;
    if (treeData){
        if (treeData.removed){
            for (var i = children.length - 1 ; i >= 0 ; i--){
                var ii = treeData.removed.indexOf(children[i].id);
                if (ii >= 0)
                    treeData.removed.splice(ii, 1);
            }
        }
    }
    this._registerStateChanges();
    if (wsObject){
        wsObject.children = children;
    }
    for (var i = children.length - 1 ; i >= 0 ; i--){
        var oChild = children[i];
        var eRow = document.createElement('tr');
        eRow.style.color = this.options.color || '#fff';
        eRow.className = "row";
        //var eDiv = document.createElement("div");//<-----------
        var eFirstColTable = document.createElement('table');
        eFirstColTable.style.padding = 0;
        eFirstColTable.style.borderSpacing = '0';
        var eFirstColTableRow = eFirstColTable.insertRow();
        eFirstColTableRow.style.height = this._guielements.states_h.toString() + 'px';
        eFirstColTableRow.style.minHeight = this._guielements.states_h.toString() + 'px';
        eFirstColTableRow.style.maxHeight = this._guielements.states_h.toString() + 'px';
        eFirstColTableRow.style.padding = 0;
        this.__objectMap[oChild.id] = eFirstColTableRow;
        this.__objects[oChild.id] = oChild;
        oChild.element = eRow;//eDiv;
        if (wsObject){
            oChild.level = wsObject.level.concat(i === (children.length - 1) ? 1 : 0);
        }
        else
            oChild.level = (i === (children.length - 1)) ? [0] : [1];
        console.log('**************');
        console.log(oChild.element)
        console.log(oChild.level);
        //eDiv.style.width = "100%";
        //eDiv.style.height = "20px";
        
        //eDiv.style.border = "1px solid #f00";
        //eDiv.style.color = "#fff";
        //eDiv.style.padding = "0 0 0 "+(oChild.level*constSingleLevelPadding)+"px";//insert (oChild.level) images instead (lines from sprite)
        
        //eDiv.style.padding = 0;

        for (var ii = 0 ; ii < (oChild.level.length - 1) ; ii++){
            (function(self, num){
                //console.log(oChild.level[num]);
                var eLineElement = document.createElement("div");
                eLineElement.className = 'lineelement';
                //eLineElement.style.display = "inline-block";
                eLineElement.style.width = self._guielements.treeicons_w.toString() + 'px';
                eLineElement.style.height = self._guielements.treeicons_h.toString() + 'px';
                var a = oChild.level[ii] ? 8 : 0;
                eLineElement.className = ('line_' + a);
                var eCell = eFirstColTableRow.insertCell();
                eCell.style.padding = 0;
                eCell.appendChild(eLineElement);
            })(this, ii);
        }
        if (oChild.level.length){
            var param = oChild.level[oChild.level.length - 1];
            var eLineElement = document.createElement("div");
            eLineElement.className = 'lineelement';
            //eLineElement.style.display = "inline-block";
            eLineElement.style.width = this._guielements.treeicons_w.toString() + 'px';
            eLineElement.style.height = this._guielements.treeicons_h.toString() + 'px';
            
            if (oChild.hasChildren){
                eLineElement.className = ('line_' + (param ? 7 : 6));
                (function(object, div, wsTree){
                    div.onclick = function(){
                        if (object.children){//это минус
                            div.className = ('line_' + (param ? 7 : 6));
                            wsTree.__removeObjectChildren(object);
                        }
                        else{//это плюс
                            div.className = ('line_' + (param ? 4 : 3));
                            wsTree.__createElementForObject(object, wsTree._getChildren(object));
                        }
                    }
                })(oChild, eLineElement, this);
            }
            else{
                eLineElement.className = ('line_' + (param ? 2 : 1));
            }
            var eCell = eFirstColTableRow.insertCell();
            eCell.style.padding = 0;
            eCell.appendChild(eLineElement);
        }
        var eIcon = document.createElement("div");
        eIcon.className += "icon_container";
        //eIcon.src = "icons/state_" + oChild.state + ".png";
        //eIcon.style.display = "inline-block";
        eIcon.style.height = this._guielements.states_h.toString() + 'px';
        eIcon.style.width = this._guielements.states_w.toString() + 'px';
        //eIcon.style.background = "black";
        eIcon.style.background = 'url(' + this._guielements.states_sprite + ') no-repeat';
        //eIcon.style.backgroundSize = "16px";//картинка сама должна быть такого размера!
        eIcon.style.backgroundPosition = "-"+
            (parseInt(oChild.state) * this._guielements.states_w).toString() +
            "px 0";
        //eIcon.style.border = "2px solid red";
        //eIcon.style.border = "2px solid rgb(194,194,193)";
        
        var eTitle = document.createElement("div");
        this.initializeDivForColumn(0, eTitle);
        var text = '<span style="color:#888;">Без названия</span>';
        if (oChild.hasOwnProperty('d') && (typeof oChild.d == 'object') && (oChild.d instanceof Array) && oChild.d.length){
            if (oChild.d[0].hasOwnProperty('e')){
                this.setDataToColumn(0, eTitle, oChild.d[0].e)
                eTitle.innerHTML = JSON.stringify(oChild.d[0].level);
            }
        }
        
        var eCell = eFirstColTableRow.insertCell();
        eCell.style.padding = 0;
        eCell.appendChild(eIcon);
        eCell = eFirstColTableRow.insertCell();
        eCell.style.padding = 0;
        eCell.appendChild(eTitle);
        /*eDiv.style.maxHeight = "20px";
        eDiv.style.fontSize = "12px";
        eDiv.style.fontFamily = "'Open Sans', sans-serif";*/
        
        var eCol = document.createElement('td');
        eCol.style.padding = "0";
        eCol.appendChild(eFirstColTable);
        eRow.appendChild(eCol);

        (function(manager, id){
            var func = function(){
                manager.__onRowClicked(id);
            };
            eIcon.onclick = func;
            eTitle.onclick = func;
        })(this, oChild.id);

        if (oChild.hasOwnProperty('d') && (typeof oChild.d == 'object') && (oChild.d instanceof Array) && oChild.d.length){
            for (var ii = 1 ; ii < oChild.d.length ; ii++){
                var eColSecond = eRow.insertCell();
                var eDiv = document.createElement('div');
                this.initializeDivForColumn(ii, eDiv);
                this.setDataToColumn(ii, eDiv, oChild.d[ii].e)
                eColSecond.appendChild(eDiv);
            }
        }
        if (wsObject)
            wsObject.element.parentNode.insertBefore(eRow, wsObject.element.nextSibling);
        else
            this.eTable.appendChild(eRow);
    }
};
Tree.prototype.reset = function(){
    this.eTable.innerHTML = "";
    this.__createElementForObject();
    return;
};
Tree.prototype.expand = function(row){
}
Tree.prototype.initializeDivForColumn = function(col, div){
}
Tree.prototype.setDataToColumn = function(col, element, data){//Это базовая реализация. Переопределите, если у вас не простейший случай (когда тупо текст).
    element.innerHTML = data || '';
}

Tree.prototype.processStateChanges = function(s){
    if (!s)
        console.error('epic fail');
    // ...
    if (s.changes)
        //
        this.__createElementForObject(undefined, this._getChildren());
}
