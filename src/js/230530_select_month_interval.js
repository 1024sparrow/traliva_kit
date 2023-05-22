#USAGE_BEGIN#traliva_kit_debug##
registerHelp('$230530SelectMonthInterval', {
	title: 'Элемент выбора диапазона месяцев',
	//descr: '',
	//options:{},
	stateObj:{
		dateStart: '',
		dateEnd: ''
	}
});
#USAGE_END#traliva_kit_debug##
function $230530SelectMonthInterval($p_wContainer, $p_options, $p_widgets){
	$Traliva.$WidgetStateSubscriber.call(this, $p_wContainer, $p_options, $p_widgets);
	$p_wContainer.$setContent(
		$Traliva.$createElement('<table><tr><td>c</td><td><input lang="ru-RU" type="month" traliva="$1"></input></td></tr><tr><td>по</td><td><input lang="ru-RU" type="month" traliva="$2"></input></td></tr></table>', this)
	);

	this.$1.addEventListener('input', (function($self){return function(){
		$self.$_state.dateStart = this.value;
		$self.$_registerStateChanges();
	}})(this));
	this.$2.addEventListener('input', (function($self){return function(){
		$self.$_state.dateEnd = this.value;
		$self.$_registerStateChanges();
	}})(this));

};
$230530SelectMonthInterval.prototype = Object.create($Traliva.$WidgetStateSubscriber.prototype);
$230530SelectMonthInterval.prototype.constructor = $230530SelectMonthInterval;
$230530SelectMonthInterval.prototype.$processStateChanges = function(s){
	if (!s){
		console.error('epic fail');
		return;
	}
	// ...
};
//$230530SelectMonthInterval.$widgetsFields = [];
