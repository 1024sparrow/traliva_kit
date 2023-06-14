#USAGE_BEGIN#traliva_kit_debug##
registerHelp('$230614MultiHorBarChart', {
	title: 'Горизонтальная столбчатая диаграмма (множественная). Если более одной диаграммы задано, то вертикальный скроллбар должен возникать',
	//descr: '',
	options:{
		//leftToRight: '(bool) слева направо столбцы должны располагаться. По умолчанию true. Если false указано, диаграммы будут отображаться справа налево.'
	},
	//stateObj:{}
});
#USAGE_END#traliva_kit_debug##
function $230614MultiHorBarChart($p_wContainer, $p_options, $p_widgets){
	$Traliva.$WidgetStateSubscriber.call(this, $p_wContainer, $p_options, $p_widgets);
	// ...
};
$230614MultiHorBarChart.prototype = Object.create($Traliva.$WidgetStateSubscriber.prototype);
$230614MultiHorBarChart.prototype.constructor = $230614MultiHorBarChart;
$230614MultiHorBarChart.prototype.$processStateChanges = function(s){
	if (!s){
		console.error('epic fail');
		return;
	}
	// ...
};
//$230614MultiHorBarChart.$widgetsFields = [];
