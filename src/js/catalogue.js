#USAGE_BEGIN#traliva_kit_debug##
registerHelp('$Catalogue', {
    title: 'Контейнер для "карточек товаров"',
    //descr: '',
    //options:{},
    //stateObj:{}
});
#USAGE_END#traliva_kit_debug##
function $Catalogue($p_wContainer, $p_options){
    $Traliva.$WidgetStateSubscriber.call(this, $p_wContainer, $p_options);
    // ...
};
$Catalogue.prototype = Object.create($Traliva.$WidgetStateSubscriber.prototype);
$Catalogue.prototype.constructor = $Catalogue;
$Catalogue.prototype.$processStateChanges = function(s){
    if (!s){
        console.error('epic fail');
        return;
    }
    // ...
};
$Catalogue.widgetsFields = [
    '$items'
];
