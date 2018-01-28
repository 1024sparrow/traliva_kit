'use strict';
var TralivaKit;
if (TralivaKit)
    console.log('epic fail: TralivaKit is not empty');
else{
    TralivaKit = {};
(function(p_namespace){

/*
Виджет Label - тупо отображает текст
Принимаемые опции:
    text - если задано, этот текст будет отображаться, а свойство textVarName будет проигнорировано. По умолч. - не задано (опирается на объект состояния)
    textVarName - имя свойства, в котором записан текст для отображения

    color - цвет текста
    border - если свойство указано, будет добавлена рамочка, false для рамочки без закругления цветом текста, {color: ... , radius: ...}, если хотите задать радиус скругления рамочки и/или цвет рамочки
*/
function Label(p_wContainer, p_options){
    Traliva.WidgetStateSubscriber.call(this, p_wContainer);
    if (p_options.hasOwnProperty('text')){
        this.textVarName = undefined;
        this.text = p_options.text;
    }
    else{
        this.textVarName = p_options.textVarName || 'text';
        this.text = '';
    }
    //this.e = document.createElement('div');
    var e = Traliva.createElement('<div class="traliva_kit__label" traliva="e">'+this.text+'</div>', this);
    if (p_options.hasOwnProperty('color')){
        this.e.style.color = p_options.color;
        if (p_options.hasOwnProperty('border')){
            this.e.style.border = '1px solid ' + p_options.border.color || p_options.color;
            if (p_options.border && p_options.border.hasOwnProperty('radius')){
                this.e.style.borderRadius = p_options.border.radius;
            }
        }
    }
    //this.e.style.margin = '6px';
    //this.e.style.padding = '10px';
    //this.e.className = 'traliva_kit__label';
    p_wContainer._onResized = (function(e){return function(w,h){
        e.style.width = (w - 32) + 'px';
        e.style.height = (h - 32) + 'px';
    };})(this.e);
    //this.e.innerHTML = this.text;
    this.e.style.textAlign = 'center';
    p_wContainer.setContent(e);
}
Label.prototype = Object.create(Traliva.WidgetStateSubscriber.prototype);
Label.prototype.constructor = Label;
Label.prototype.processStateChanges = function(s){
    if (!s)
        console.error('epic fail');
    if (this.textVarName !== undefined){
        if (s[this.textVarName] !== this.text){
            this.text = s[this.textVarName] || '';
            this.e.innerHTML = this.text;
        }
    }
}
p_namespace.Label = Label;

/*
Виджет Button.
Принимаемые опции:
    title - если задано, этот текст будет отображаться, а свойство titleVarName будет проигнорировано. По умолч. - не задано (опирается на объект состояния)
    titleVarName - имя свойства, в котором записан текст кнопки (если изменится значение такого свойства у объекта состояния, кнопка изменит свой текст). По умолч. 'title'
    activeVarName - имя свойства(boolean), значение которого будет меняться при нажатии на кнопку. По умолч. 'active'

    color - цвет текста
    hover_color - цвет фона при наведении мышью
    border - если свойство указано, будет заданы специфические параметры рамочки, false для рамочки без закругления цветом текста, {color: ... , radius: ...}, если хотите задать радиус скругления рамочки и/или цвет рамочки
*/
function Button(p_wContainer, p_options){
    Traliva.WidgetStateSubscriber.call(this, p_wContainer);
    console.log('hello from Button. Options: '+JSON.stringify(p_options));
    if (p_options.hasOwnProperty('title')){
        this.titleVarName = undefined;
        this.title = p_options.title;
    }
    else{
        this.titleVarName = (p_options.hasOwnProperty('titleVarName')) ? p_options.titleVarName : 'title';
        this.title = '';
    }
    this.activeVarName = (p_options.hasOwnProperty('activeVarName')) ? p_options.activeVarName : 'active';
    this.active = false;
    var e = Traliva.createElement('<div class="traliva_kit__bn" traliva="e">' + this.title + '</div>', this);
    if (p_options.hasOwnProperty('color')){
        this.e.style.color = p_options.color;
        this.e.style.border = '1px solid '+p_options.color;
        if (p_options.hasOwnProperty('border')){
            this.e.style.border = '1px solid ' + p_options.border.color || p_options.color;
            if (p_options.border && p_options.border.hasOwnProperty('radius')){
                this.e.style.borderRadius = p_options.border.radius;
            }
        }
    }
    if (p_options.hasOwnProperty('hover_color')){
        this.e.addEventListener('mouseover', (function(c){return function(){this.style.background = c;};})(p_options.hover_color))
        this.e.addEventListener('mouseleave', (function(c){return function(){this.style.background = 'rgba(0,0,0,0)';};})())
    }
    this.e.addEventListener('click', function(self){return function(){
        self._onClicked();
    };}(this));
    p_wContainer.setContent(e);
}
Button.prototype = Object.create(Traliva.WidgetStateSubscriber.prototype);
Button.prototype.constructor = Button;
Button.prototype.processStateChanges = function(s){
    if (!s)
        console.error('epic fail');
    if (this.titleVarName !== undefined){
        if (s[this.titleVarName] !== this.title){
            this.title = s[this.titleVarName] || '';
            this.e.innerHTML = this.title;
        }
    }
    if (s[this.activeVarName] !== this.active){
        this.active = s[this.activeVarName];
        this.e.className = this.active ? 'traliva_kit__bn active' : 'traliva_kit__bn';
    }
}
Button.prototype._onClicked = function(){
    this.active = !this.active;
    this._state[this.activeVarName] = this.active;
    this.e.className = this.active ? 'traliva_kit__bn active' : 'traliva_kit__bn';
    this._registerStateChanges();
}
p_namespace.Button = Button;

/*
Виджет строка ввода
Принимаемые опции:
    placeholder - строка подсказки вроде "введите ..(что-то)"
    requireVarName - имя свойства(boolean), true которого означает, что нужно записать в объект состояния значение этого текстового поля. Если не задано, в объекте состояния значения будет обновляться при каждом изменении текста
    textVarName - текст в поле редактирования. Это значение как для задания предустановленного значения, так и для считывания другими компонентами введённого пользователем текста

    color
    hover_color
*/
function LineEdit(p_wContainer, p_options){
    Traliva.WidgetStateSubscriber.call(this, p_wContainer);
    this.requireVarName;

    p_wContainer.setContent(Traliva.createElement('<input type="text" traliva="e" class="traliva_kit__lineedit"></input>', this));
    p_wContainer._onResized = (function(self){
        return function(w,h){
            self.e.style.width = (w - 32) + 'px';
        }
    })(this);
    if (p_options.hasOwnProperty('placeholder'))
        this.e.placeholder = p_options.placeholder;
    if (p_options.hasOwnProperty('color')){
        this.e.style.color = p_options.color;
        this.e.style.border = '1px solid ' + p_options.color;
    }
    if (p_options.hasOwnProperty('hover_color')){
        this.e.addEventListener('mouseover', (function(c){return function(){this.style.background = c;};})(p_options.hover_color))
        this.e.addEventListener('mouseleave', (function(c){return function(){this.style.background = 'rgba(0,0,0,0)';};})())
    }
    if (p_options.hasOwnProperty('textVarName'))
        this.textVarName = p_options.textVarName;
    else
        console.error('LineEdit: textVarName - обязательное поле для задания в options');
    if (p_options.hasOwnProperty('requireVarName')){
        this.requireVarName = p_options.requireVarName;
    }
    else{
        this.e.addEventListener('input', (function(self){return function(){
            self._state[self.textVarName] = self.e.value;
            self._registerStateChanges();
        }})(this));
        // event 'change' fires only on focus off
    }
}
LineEdit.prototype = Object.create(Traliva.WidgetStateSubscriber.prototype);
LineEdit.prototype.constructor = LineEdit;
LineEdit.prototype.processStateChanges = function(s){
    if (this.requireVarName){
        // опция выдачи строго по запросу не протестирована.
        // надеюсь, при запуске ошибок не возникнет
        if (s[this.requireVarName]){
            s[this.requireVarName] = false;
            s[this.textVarName] = this.e.value;
            this._registerStateChanges();
        }
    }
    if (this.e.value !== s[this.textVarName])
        this.e.value = s[this.textVarName];
}
p_namespace.LineEdit = LineEdit;

/*
Виджет Поле выбора файла из файловой системы пользователя
Принимаемые опции:
    vaueVarName
    filter - по каким расширениям фильтровать. Пример: ".mp3, .mpeg, .wav, .ogg"
    color - цвет
    hover_color - цвет при наведении мыши
Traliva.api.get_filepath(p_file) - должна быть, возвращает путь к файлу.
*/
function FileSelect(p_wContainer, p_options){
    Traliva.WidgetStateSubscriber.call(this, p_wContainer);
    p_wContainer.setContent(Traliva.createElement('<input type="file" traliva="e" class="traliva_kit__fileselect"></input>', this));
//wAddBn.setContent(Traliva.createElement('<input type="file" accept=".mp3, .mpeg, .wav, .ogg" traliva="bn_add" class="bn stage2_bn_add"></input>'));
    this.valueVarName = p_options.valueVarName;
    this.e.addEventListener('change', (function(self){return function(){
        var files = self.e.files;
        files = files.length ? files[0] : undefined;
        var tmppath = window.URL.createObjectURL(files);
        self._state[self.valueVarName] = tmppath;
        self._registerStateChanges();
    };})(this));
    
    if (p_options.hasOwnProperty('filter')){
        this.e.accept = p_options.filter;
    }
    if (p_options.hasOwnProperty('color')){
        this.e.style.color = p_options.color;
        this.e.style.border = '1px solid ' + p_options.color;
    }
    if (p_options.hasOwnProperty('hover_color')){
        this.e.addEventListener('mouseover', (function(c){return function(){this.style.background = c;};})(p_options.hover_color))
        this.e.addEventListener('mouseleave', (function(c){return function(){this.style.background = 'rgba(0,0,0,0)';};})())
    }
    /*p_wContainer._onResized = (function(self){
        return function(w,h){
            self.e.style.width = (w - 18) + 'px';
        }
    })(this);*/
}
FileSelect.prototype = Object.create(Traliva.WidgetStateSubscriber.prototype);
FileSelect.prototype.constructor = FileSelect;
FileSelect.prototype.processStateChanges = function(s){
    //boris here: применить изменения в выбранном файле
}
p_namespace.FileSelect = FileSelect;

/*
Класс SimpleList.
Список элементов, с возможностью выбора какого-то одного элемента(выделяемость настраивается с помощью options)
Принимаемые опции:
    selectable - по умолчанию false,
    getText - если у вас список объектов, то вам потребуется функция, которая даёт текст для отображения в элементе списка. По умолчанию, элементы списка трактуются как строки.
Формат объекта состояния:
    current - порядковый номер в массиве
    list - массив строк (заголовкой на вывод)
*/
function SimpleList(p_wContainer, p_options){
    Traliva.WidgetStateSubscriber.call(this, p_wContainer);
    p_wContainer.setContent(Traliva.createElement('<table class="traliva_kit__simplelist" traliva="table"></table>', this));
    this.options = p_options;
    this._len = 0;
}
SimpleList.prototype = Object.create(Traliva.WidgetStateSubscriber.prototype);
SimpleList.prototype.constructor = SimpleList;
SimpleList.prototype.processStateChanges = function(s){
    if (s.changed){
        this._update();
        s.changed = false;
        this._registerStateChanges();
    }
}
SimpleList.prototype._update = function(){
    var i, eRow, eCell;
    console.log('%%%%%%%'+JSON.stringify(this._state));

    for (i = this._state.list.length ; i < this._len ; i++){
        this.table.deleteRow(-1);
    }
    for (i = this._len ; i < this._state.list.length ; i++){
        eRow = this.table.insertRow();
        eRow.insertCell();
    }
    this._len = this._state.list.length;
    var rows = this.table.rows;
    for (i = 0 ; i < rows.length ; i++){
        //eRow = this._state.list[i];
        eRow = rows[i];
        eCell = eRow.cells[0];
        //eCell.innerHTML = 'adasdasd';
        eCell.innerHTML = '<div>' + (this.options.getText ? this.options.getText(this._state.list[i]) : this._state.list[i]) + '</div>';
    }
}
p_namespace.SimpleList = SimpleList;

//
})(TralivaKit);
}
