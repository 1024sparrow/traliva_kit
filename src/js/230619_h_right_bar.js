#USAGE_BEGIN#traliva_kit_debug##
registerHelp('$230619HRightBar', {
    title: 'краткого описания нет',
    //descr: '',
    //options:{},
    //stateObj:{}
});
#USAGE_END#traliva_kit_debug##
function $230619HRightBar($p_wContainer, $p_options, $p_widgets){
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
	this.$e.width += 100; // Место для текста справа
};
$230619HRightBar.prototype = Object.create($Traliva.$WidgetStateSubscriber.prototype);
$230619HRightBar.prototype.constructor = $230619HRightBar;
$230619HRightBar.prototype.$processStateChanges = function(s){
	var $1;
	if (!s){
		console.error('epic fail');
		return;
	}
	console.log('230619 1: ', s);
	if (s.$needUpdate){
		this.$_update();

		$1 = false; // признак того, что данные хоть какие-то есть
		if(s.$dataset.length){
				$1 = true;
		}
		this.$wConpainer.$setVisible($1);
	}

};

$230619HRightBar.prototype.$_update = function(){
	this.$e.width = this.$w;;
	this.$e.height = this.$h;

	const ctx = this.$e.getContext('2d');
	const barHeight = 20;
	const barMargin = 30;
	const labelMargin = 4;


	ctx.clearRect(0, 0, this.$e.width, this.$e.height);

	const textWidth = 40;

	var minH = this.$_state.$dataset[0].value, maxH = 0;
	for (const [i, data] of this.$_state.$dataset.entries()){
		const point = data.value;
		if (point > maxH){
			maxH = point;
		}
		if (point < minH){
			minH = point;
		}
	};

	for (const [i, data] of this.$_state.$dataset.entries()){
		const barX = barMargin;
		const barY = (barHeight + barMargin) * i;

		// Значение справа
		const valueX = this.$e.width - labelMargin;
		const valueY = barY + barHeight / 2;

		// Рассчет ширины прямоугольника с учетом доступной ширины текста
		const rectWidth = (data.value-maxH)/(minH-maxH)*this.$e.width;

		// Прямоугольник
		const rectX = barX;
		ctx.fillStyle = data.color;
		ctx.fillRect(this.$e.width-rectWidth+textWidth, barY+labelMargin*4, this.$e.width, barHeight+labelMargin*4);

		ctx.fillStyle = '#000';
		ctx.textAlign = 'right';
		ctx.fillText(data.value+this.$_state.$measure, this.$e.width-rectWidth+textWidth, valueY+labelMargin);
		ctx.fillText(data.title, valueX, valueY+labelMargin*8);
	};
};
