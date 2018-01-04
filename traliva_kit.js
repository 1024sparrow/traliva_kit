'use strict';
var TralivaKit;
if (TralivaKit)
    console.log('epic fail: TralivaKit is not empty');
else{
    TralivaKit = {};
(function(p_namespace){

/*
Виджет Button.
Принимаемые опцмм:
    title - если задано, этот текст будет отображаться, а свойство titleVarName будет проигнорировано. По умолч. - не задано (опирается на объект состояния)
    titleVarName - имя свойства, в котором записан текст кнопки (если изменится значение такого свойства у объекта состояния, кнопка изменит свой текст). По умолч. 'title'
    valueVarName - имя свойства(boolean), значение которого будет меняться при нажатии на кнопку. По умолч. 'active'
*/
function Button(p_wContainer, p_options){
    Traliva.WidgetStateSubscriber.call(this, p_wContainer);
    console.log('hello from Button');
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
    if (!s){
        console.log('epic fail');
        return;
    }
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

//
})(TralivaKit);
}
