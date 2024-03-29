
#USAGE_BEGIN#traliva_kit_debug##
registerHelp('$230616LineChart', {
title: 'краткого описания нет',
//descr: '',
//options:{},
//stateObj:{}
});
#USAGE_END#traliva_kit_debug##


function $230616LineChart($p_wContainer, $p_options, $p_widgets){
	$Traliva.$WidgetStateSubscriber.call(this, $p_wContainer, $p_options, $p_widgets);
	this.$options = $p_options;
	this.$wConpainer = $p_wContainer;

	$p_wContainer.$_onResized = (function($self){
			return function($w, $h){
			$self.$w = $w;
			$self.$h = $h;
			$self.$_update();
			}
			})(this);

	$p_wContainer.$setContent(this.$e = document.createElement('canvas'));

	this.$e.height=200;
	this.$e.width+=200;
	this.$chartPadding = 20; // Отступы графика от краев canvas
};


$230616LineChart.prototype = Object.create($Traliva.$WidgetStateSubscriber.prototype);
$230616LineChart.prototype.constructor = $230616LineChart;
$230616LineChart.prototype.$processStateChanges = function(s){
	var $1;
	if (!s){
		console.error('epic fail');
		return;
	}
	console.log('230616 1: ', s);
	if (s.$needUpdate){
		this.$_update();
		$1 = false; // признак того, что данные хоть какие-то есть
		for (const o of s.$data.datasets){
			if (o.data.length){
				$1 = true;
				break;
			}
		}
		this.$wConpainer.$setVisible($1);
	}
};
$230616LineChart.prototype.$_update = function(){
	this.$e.width = this.$w;
	this.$e.height = this.$h;
	const ctx = this.$e.getContext('2d');
	ctx.clearRect(0, 0, this.$e.width, this.$e.height);
	ctx.beginPath();

	// Подписи
	const labelY = this.$e.height - this.$chartPadding / 2;
	ctx.fillStyle = '#000';
	const size = this.$_state.$data.labels.length-1;
	for(const [i, label] of this.$_state.$data.labels.entries()){

		const labelX = this.$chartPadding + (this.$e.width - 2 * this.$chartPadding) * (i / (size));
		if (i == 0){
			ctx.textAlign = 'left';
		}else if (i == size){
			ctx.textAlign = 'right';
		}else{
			ctx.textAlign = 'center';
		}
		ctx.fillText(label, labelX, labelY);
	};
	console.log('h:'+this.$e.height+'\tw:'+this.$e.width)
		ctx.textAlign = 'center';
	var maxH = this.$_state.$data.datasets[0].data[0], minH = this.$_state.$data.datasets[0].data[0];
	for (const [i, dataset] of this.$_state.$data.datasets.entries()){
		const points = dataset.data;
		const maxValue = Math.max(...points);
		const minValue = Math.min(...points);
		if (maxValue > maxH){
			maxH = maxValue;
		}
		if (minValue < minH){
			minH = minValue;
		}
	};

	for (const [i, dataset] of this.$_state.$data.datasets.entries()){
		const points = dataset.data;
		const maxValue = Math.max(...points);
		const minValue = Math.min(...points);
		const valueRange = maxValue - minValue;

		ctx.beginPath();
		ctx.fillStyle = dataset.backgroundColor;
		ctx.strokeStyle = dataset.borderColor;

		for (const [i, value] of points.entries()){
			const pointX = this.$chartPadding + (this.$e.width - this.$chartPadding * 2) * (i / (points.length - 1));
			const pointY = this.$chartPadding + (this.$e.height - this.$chartPadding * 3) * (1 - (value - minH) / (maxH-minH));
			// Точка
			ctx.moveTo(pointX, pointY);
			ctx.arc(pointX, pointY, 3, 0, Math.PI * 2);

			// Выводим значение точки над ней
		};

		ctx.fill();

		// Соединение точек линиями
		ctx.beginPath();
		for (const [i, value] of points.entries()){
			const pointX = this.$chartPadding + (this.$e.width - 2 * this.$chartPadding) * (i / (points.length - 1));

			const pointY = this.$chartPadding + (this.$e.height - this.$chartPadding * 3) * (1 - (value - minH) / (maxH-minH));
			if (i === 0) {
				ctx.moveTo(pointX, pointY);
			} else {
				ctx.lineTo(pointX, pointY);
			}
		};


		for (const [i, value] of points.entries()){
			const pointX = this.$chartPadding + (this.$e.width - this.$chartPadding * 2) * (i / (points.length - 1));
			const pointY = this.$chartPadding + (this.$e.height - this.$chartPadding * 3) * (1 - (value - minH) / (maxH-minH));

			// Вывод значение точки над ней
			ctx.fillText(value, pointX, pointY - 10);
		};


		ctx.stroke();
	};
};
