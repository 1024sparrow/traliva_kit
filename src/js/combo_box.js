registerHelp('ComboBox', {
    title: 'краткого описания нет',
    //descr: '',
    //options:{},
    //stateObj:{}
});
function ComboBox(p_wContainer, p_options){
    Traliva.WidgetStateSubscriber.call(this, p_wContainer, p_options);
    // ...
}
ComboBox.prototype = Object.create(Traliva.WidgetStateSubscriber.prototype);
ComboBox.prototype.constructor = ComboBox;
ComboBox.prototype.processStateChanges = function(s){
    if (!s)
        console.error('epic fail');
    // ...
}
