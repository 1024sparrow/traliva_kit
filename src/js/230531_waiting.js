#USAGE_BEGIN#traliva_kit_debug##
registerHelp('$230531Waiting', {
    title: 'краткого описания нет',
    //descr: '',
    //options:{},
    //stateObj:{}
});
#USAGE_END#traliva_kit_debug##
function $230531Waiting($p_wContainer, $p_options, $p_widgets){
    $Traliva.$WidgetStateSubscriber.call(this, $p_wContainer, $p_options, $p_widgets);
    $p_wContainer.$setContent($Traliva.$createElement('', this, '$230531WaitingContent'));
	$p_wContainer.$_div.className = '$230531Waiting';
};
$230531Waiting.prototype = Object.create($Traliva.$WidgetStateSubscriber.prototype);
$230531Waiting.prototype.constructor = $230531Waiting;
$230531Waiting.prototype.$processStateChanges = function(s){
    if (!s){
        console.error('epic fail');
        return;
    }
    // ...
};
//$230531Waiting.$widgetsFields = [];
