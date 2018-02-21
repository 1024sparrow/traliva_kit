registerHelp('TreeList', {
    title: 'краткого описания нет',
    //descr: '',
    //options:{},
    //stateObj:{}
});
function TreeList(p_wContainer, p_options){
    Traliva.WidgetStateSubscriber.call(this, p_wContainer, p_options);
    // ...
}
TreeList.prototype = Object.create(Traliva.WidgetStateSubscriber.prototype);
TreeList.prototype.constructor = TreeList;
TreeList.prototype.processStateChanges = function(s){
    if (!s)
        console.error('epic fail');
    // ...
}
