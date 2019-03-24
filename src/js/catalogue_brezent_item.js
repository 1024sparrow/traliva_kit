#USAGE_BEGIN#traliva_kit_debug##
registerHelp('$CatalogueBrezentItem', {
    title: 'Карточка товара для категории "брезент"',
    //descr: '',
    //options:{},
    //stateObj:{}
});
#USAGE_END#traliva_kit_debug##
function $CatalogueBrezentItem($p_wContainer, $p_options, $p_widgets){
    $Traliva.$WidgetStateSubscriber.call(this, $p_wContainer, $p_options, $p_widgets);
    $p_wContainer.$setContent($Traliva.$createElement('<img src="'+$p_options.$image+'"></img>'));
    // ...
};
$CatalogueBrezentItem.prototype = Object.create($Traliva.$WidgetStateSubscriber.prototype);
$CatalogueBrezentItem.prototype.constructor = $CatalogueBrezentItem;
$CatalogueBrezentItem.prototype.$processStateChanges = function(s){
    if (!s){
        console.error('epic fail');
        return;
    }
    // ...
};
