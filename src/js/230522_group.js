#USAGE_BEGIN#traliva_kit_debug##
registerHelp('$230522Group', {
	title: 'Рамочка с названием секции (аналог QFrame)',
	//descr: '',
	options:{
		title: 'строка с названием секции'
	},
	//stateObj:{}
});
#USAGE_END#traliva_kit_debug##
function $230522Group($p_wContainer, $p_options, $p_widgets){
	$Traliva.$WidgetStateSubscriber.call(this, $p_wContainer, $p_options, $p_widgets);
	// ...
};
$230522Group.prototype = Object.create($Traliva.$WidgetStateSubscriber.prototype);
$230522Group.prototype.constructor = $230522Group;
$230522Group.prototype.$processStateChanges = function(s){
	if (!s){
		console.error('epic fail');
		return;
	}
	// ...
};
//$230522Group.$widgetsFields = [];
