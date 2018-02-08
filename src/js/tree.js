registerHelp('Tree', {
    title: 'краткого описания нет',
    //descr: '',
    //options:{},
    //stateObj:{}
});
function Tree(p_wContainer, p_options){
    Traliva.WidgetStateSubscriber.call(this, p_wContainer, p_options);
    // ...
}
Tree.prototype = Object.create(Traliva.WidgetStateSubscriber.prototype);
Tree.prototype.constructor = Tree;
Tree.prototype.processStateChanges = function(s){
    if (!s)
        console.error('epic fail');
    // ...
}
