#USAGE_BEGIN#traliva_kit_debug##
registerHelp('$Stack', {
    title: 'краткого описания нет',
    //descr: '',
    //options:{},
    //stateObj:{}
});
#USAGE_END#traliva_kit_debug##
function $Stack($p_wContainer, $p_options, $p_widgets){
    $Traliva.$WidgetStateSubscriber.call(this, $p_wContainer, $p_options, $p_widgets);
    // ...
};
$Stack.prototype = Object.create($Traliva.$WidgetStateSubscriber.prototype);
$Stack.prototype.constructor = $Stack;
$Stack.prototype.$processStateChanges = function(s){
    if (!s){
        console.error('epic fail');
        return;
    }
    // ...
};
//$Stack.widgetsFields = [];
