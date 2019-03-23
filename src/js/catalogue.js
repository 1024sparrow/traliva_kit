#USAGE_BEGIN#traliva_kit_debug##
registerHelp('$Catalogue', {
    title: 'Контейнер для "карточек товаров"',
    //descr: '',
    //options:{},
    //stateObj:{}
});
#USAGE_END#traliva_kit_debug##
#USAGE_BEGIN#TralivaKit.Catalogue##
function $Catalogue($p_wContainer, $p_options, $p_widgets){
    $Traliva.$WidgetStateSubscriber.call(this, $p_wContainer, $p_options, $p_widgets);
    console.log('Catalogue constrictor: taken p_widgets: ', $p_widgets);//
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
#USAGE_END#TralivaKit.Catalogue##
