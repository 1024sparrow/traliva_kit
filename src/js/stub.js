#USAGE_BEGIN#traliva_kit_debug##
registerHelp('$Stub', {
    title: 'краткого описания нет',
    //descr: '',
    //options:{},
    //stateObj:{}
});
#USAGE_END#traliva_kit_debug##
function $Stub($p_wContainer, $p_options, $p_widgets){
    $Traliva.$WidgetStateSubscriber.call(this, $p_wContainer, $p_options, $p_widgets);
    // ...
};
$Stub.prototype = Object.create($Traliva.$WidgetStateSubscriber.prototype);
$Stub.prototype.constructor = $Stub;
$Stub.prototype.$processStateChanges = function(s){
    if (!s){
        console.error('epic fail');
        return;
    }
    // ...
};
//$Stub.$widgetsFields = [];
