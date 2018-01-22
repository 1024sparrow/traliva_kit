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
    this.e = document.createElement('div');
    this.e.innerHTML = this.text;
    this.e.className = 'traliva_kit__label';
    p_wContainer.setContent(this.e);
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
    valueVarName - имя свойства(boolean), значение которого будет меняться при нажатии на кнопку. По умолч. 'active'
*/
function Button(p_wContainer, p_options){
    Traliva.WidgetStateSubscriber.call(this, p_wContainer);
    console.log('hello from Button. Options: '+JSON.stringify(p_options));
    if (p_options.hasOwnProperty('title')){
        this.titleVarName = undefined;
        this.title = p_options.title;
    }
    else{
        this.titleVarName = p_options.titleVarName || 'title';
        this.title = '';
    }
    this.activeVarName = p_options.activeVarName || 'active';
    this.active = false;
    var e = Traliva.createElement('<div class="traliva_kit__bn" traliva="e">' + this.title + '</div>', this);
    this.e.addEventListener('click', function(self){return function(){
        self._onClicked();
    };}(this));
    p_wContainer.setContent(e);
}
Button.prototype = Object.create(Traliva.WidgetStateSubscriber.prototype);
Button.prototype.constructor = Button;
Button.prototype.processStateChanges = function(s){
    if (!s)
        console.log('epic fail');
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
    this._state.active = this.active;
    this.e.className = this.active ? 'traliva_kit__bn active' : 'traliva_kit__bn';
    this._registerStateChanges();
}
p_namespace.Button = Button;

/*
Виджет строка ввода
Принимаемые опции:
    placeholder - строка подсказки вроде "введите ..(что-то)"
*/
function LineEdit(p_wContainer, p_options){
    Traliva.WidgetStateSubscriber.call(this, p_wContainer);
    p_wContainer.setContent(Traliva.createElement('<input type="text" traliva="e"></input>', this));
    p_wContainer._onResized = (function(self){
        return function(w,h){
            self.e.style.width = (w - 18) + 'px';
        }
    })(this);
    if (p_options.hasOwnProperty('placeholder'))
        this.e.placeholder = p_options.placeholder;
}
LineEdit.prototype = Object.create(Traliva.WidgetStateSubscriber.prototype);
LineEdit.prototype.constructor = LineEdit;
LineEdit.prototype.processStateChanges = function(s){
}
p_namespace.LineEdit = LineEdit;

/*
Виджет Поле выбора файла из файловой системы пользователя
*/
function FileSelect(p_wContainer, p_options){
    Traliva.WidgetStateSubscriber.call(this, p_wContainer);
    p_wContainer.setContent(Traliva.createElement('<input type="file" traliva="e"></input>', this));
    p_wContainer._onResized = (function(self){
        return function(w,h){
            self.e.style.width = (w - 18) + 'px';
        }
    })(this);
}
FileSelect.prototype = Object.create(Traliva.WidgetStateSubscriber.prototype);
FileSelect.prototype.constructor = FileSelect;
FileSelect.prototype.processStateChanges = function(s){
}
p_namespace.FileSelect = FileSelect;

//
})(TralivaKit);
}
