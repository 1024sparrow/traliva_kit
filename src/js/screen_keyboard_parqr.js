#USAGE_BEGIN#traliva_kit_debug##
registerHelp('$ScreenKeyboardParqr', {
    title: 'краткого описания нет',
    //descr: '',
    //options:{},
    //stateObj:{}
});
#USAGE_END#traliva_kit_debug##
#u#ScreenKeyboard##
function $ScreenKeyboardParqr($p_wContainer, $p_options, $p_widgets){
    $ScreenKeyboard.call(this, $p_wContainer, $p_options, $p_widgets);
    // ...
};
$ScreenKeyboardParqr.prototype = Object.create($ScreenKeyboard.prototype);
$ScreenKeyboardParqr.prototype.constructor = $ScreenKeyboardParqr;
$ScreenKeyboardParqr.prototype.$_processEvent = function($p_eventType, $p, $p_takenFromSensorScreen){
    if ($p_eventType === 2)
        return;

    if ($p_eventType === 1){
        console.log('b11015 key: ', $p[0].$buttonId);
    }
};
//$ScreenKeyboardParqr.$widgetsFields = [];
