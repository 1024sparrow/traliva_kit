#USAGE_BEGIN#traliva_kit_debug##
registerHelp('$230525Chart', {
	title: 'График',
	descr: 'https://www.chartjs.org/',
	options:{
		type: '(строка) bar | line',
		options: 'см. документацию chartjs (объект)'
	},
	stateObj:{
		needUpdate: 'требуется ли обновлять. Во избежание слишком частых проверок предусмотрен флаг, при активности которого только обновление производится. Предагается в разработке всегда держать true, а подыгрывать уже, когда будут проблемы с производительностью',
		data: 'см. документацию chartjs (объект)'
	}
});
#USAGE_END#traliva_kit_debug##

(function(){
	if (typeof window !== 'undefined'){ // Проверка на NodeJS
		var $1 = document.createElement('script');
		$1.src = 'https://cdn.jsdelivr.net/npm/chart.js';
		document.head.appendChild($1);
	}
	else{
		//
	}
})();

function $230525Chart($p_wContainer, $p_options, $p_widgets){
	$Traliva.$WidgetStateSubscriber.call(this, $p_wContainer, $p_options, $p_widgets);
	this.$options = $p_options;
	this.$wConpainer = $p_wContainer;
	
	$p_wContainer.$setContent(this.$e = document.createElement('canvas'));

	this.$chart = new Chart(this.$e, {
		type: $p_options.$type,
		options: $p_options.$options,
		plugins: $p_options.$plugins
	});
};
$230525Chart.prototype = Object.create($Traliva.$WidgetStateSubscriber.prototype);
$230525Chart.prototype.constructor = $230525Chart;
$230525Chart.prototype.$processStateChanges = function(s){
	var $1;
	if (!s){
		console.error('epic fail');
		return;
	}
	console.log('230525 1: ', s);
	if (s.$needUpdate){
		this.$chart.data = s.$data;
		$1 = false; // признак того, что данные хоть какие-то есть
		for (const o of s.$data.datasets){
			if (o.data.length){
				$1 = true;
				break;
			}
		}
		this.$wConpainer.$setVisible($1);
		this.$chart.update();
	}
};
//$230525Chart.$widgetsFields = [];
