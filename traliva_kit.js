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
    title - если задано, этот текст будет отображаться
    titleVarName - имя свойства, в котором записан текст кнопки (если изменится значение такого свойства у объекта состояния, кнопка изменит свой текст)
    togglable - фиксировать ли кнопку. Если кнопка фиксированная, она будет хранить состояние "нажатости", и клик будет означать изменение "нажатости". Если кнопка не фиксированная, клик по ней будет приводить к тому, что в свойство valueVarName будет записано true
    valueVarName - имя свойства(boolean), значение которого будет меняться при нажатии на кнопку
Цвета кнопки могут быть заданы только через стили CSS.
*/
function Button(p_wContainer, p_options){// options: title, color('#f00'), valueVarName - имя свойства, в которое сохранять значение
    Traliva.WidgetStateSubscriber.call(this, p_wContainer);
    console.log('hello from Button');
    this.opt = p_options;
    this.title = p_options.title;
    var e = Traliva.createElement('<div class="traliva_kit__bn" traliva="e">' + this.title + '</div>', this);
    this.e.addEventListener('click', function(self){return function(){
        self._onClicked();
    };}(this));
    p_wContainer.setContent(e);
}
Button.prototype = Object.create(Traliva.WidgetStateSubscriber.prototype);
Button.prototype.constructor = Button;
Button.prototype.processStateChanges = function(s){
}
Button.prototype._onClicked = function(){
}
p_namespace.Button = Button;

//
})(TralivaKit);
}
