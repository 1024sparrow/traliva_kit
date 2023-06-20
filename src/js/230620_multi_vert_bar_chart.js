#USAGE_BEGIN#traliva_kit_debug##
registerHelp('$230620MultiVertBarChart', {
	title: 'Вертикаотная столбчатая диаграмма (множественая), с горизонтальной прогруткой',
	//descr: '',
	//options:{},
	//stateObj:{}
});
#USAGE_END#traliva_kit_debug##
function $230620MultiVertBarChart($p_wContainer, $p_options, $p_widgets){
	$p_options
	$Traliva.$WidgetStateSubscriber.call(this, $p_wContainer, $p_options, $p_widgets);
	var $1, $2;
	this.$constItemWidth = 64;
	this.$constScaleHeight = 32;

	this.$e = $Traliva.$createElement('<canvas traliva="$1"></canvas>', this, '$traliva_kit__230620MultiVertBarChart');
	this.$w = 0;
	this.$h = 0;
	this.$scrollPos = 0;
	this.$options = $p_options;

	$p_wContainer.$_onResized = (function($self){
		return function($w, $h){
			$self.$w = $w;
			$self.$h = $h;
			$self.$_update();
		}
	})(this);
	this.$e.addEventListener(
		'wheel',
		(function($self){
			return function($event) {
				var
					$1 = $self.$scrollPos + $event.deltaY * $self.$constItemWidth / 120,
					$2 = $self.$1.width,
					$3 = $2 - $self.$w
				;
				if ($self.$w){
					$self.$scrollPos = ($1 < $3) ? $1 : $3;
				}
				$self.$_update();
			}
		})(this)
	);
	//this.$_tt.className = '$traliva_kit__230620MultiVertBarChart';
	$p_wContainer.$setContent(this.$e);
};
$230620MultiVertBarChart.prototype = Object.create($Traliva.$WidgetStateSubscriber.prototype);
$230620MultiVertBarChart.prototype.constructor = $230620MultiVertBarChart;
$230620MultiVertBarChart.prototype.$processStateChanges = function(s){
	if (!s){
		console.error('epic fail');
		return;
	}
	if (s.$needUpdate){
		this.$_update();
	}
};
$230620MultiVertBarChart.prototype.$_update = function(){
	var
		$1, $2, $3, $4, $5, $6, $7,
		$context,
		$w = 0,
		$k,
		$maxBarValue = 0,
		$containers = [],
		$containerCand,
		$constDiadgramWidth = 96,
		//$constDiadgramWidth = 48,
		$constDiagramIndent = 16,
		$scaleHeight = 16, // от нижней границы до верхней линии текста
		$textIndentBottom = 2, // от верхней линии текста подписи до начала столбца
		$textIndentTop = 2, // от столбца до нижней линии текста со значением
		$topIndent = 16, // от максимально возможной высоты столбца до верхней границы
		$barY = this.$h - $scaleHeight - $textIndentBottom,
		$barHeight = $barY - $topIndent
	;

	$1 = this.$scrollPos;
	$2 = this.$1.width;
	$3 = $2 - this.$w;
	if (this.$w){
		this.$scrollPos = ($1 < $3) ? $1 : $3;
	}
	if (this.$scrollPos < 0){
		this.$scrollPos = 0;
	}
	this.$1.height = this.$h;

	$context = this.$1.getContext('2d');
	$context.font = '10px arial';
	//$context.textBaseline = 'top';
	//$context.textAlign = 'center';
	$3 = 0;
	for ($1 of this.$_state.$list){
		$2 = $context.measureText($1.$title).width;
		if ($containers.length){
			$3 += $constDiagramIndent;
		}
		$containerCand = {
			$titleSize: $2
		};
		$containerCand.$x = $3;
		$3 += ($2 < $constDiadgramWidth) ? $constDiadgramWidth : $2;
		$containerCand.$xx = $3;
		$w = $3;
		$containers.push($containerCand);

		for ($4 of this.$_state.$options.$fields){ // boris stub
		//for ($4 of this.$options.$fields){
			$5 = $1[$4.$varName];
			if ($5 > $maxBarValue){
				$maxBarValue = $5;
			}
		}
	}
	console.log('230620: ', $w);
	this.$1.width = $w;

	/*$context.beginPath();
	$context.moveTo(0, this.$h - $scaleHeight);
	$context.lineTo($w, this.$h - $scaleHeight);
	$context.stroke();*/

	for ($1 = 0 ; $1 < $containers.length ; ++$1){
		//$context.fillText(this.$_state.$list.$title);
		$context.beginPath();
		$context.moveTo($containers[$1].$x, this.$h - $scaleHeight - 2);
		$context.lineTo($containers[$1].$xx, this.$h - $scaleHeight - 2);
		$context.stroke();

		$context.textBaseline = 'top';
		$context.textAlign = 'center';
		$context.fillStyle = '#000';
		$context.fillText(
			this.$_state.$list[$1].$title,
			($containers[$1].$x + $containers[$1].$xx) / 2,
			this.$h - $scaleHeight
			//$containers[$1].$xx
		);

		$context.textBaseline = 'bottom';
		$2 = 0;
		for ($4 of this.$_state.$options.$fields){ // boris stub
		//for ($4 of this.$options.$fields){
			$context.fillStyle = $4.$color;
			$k = this.$_state.$list[$1][$4.$varName] / $maxBarValue;
			$context.fillRect(
				$containers[$1].$x + ($containers[$1].$xx - $containers[$1].$x) * $2 / this.$_state.$options.$fields.length,
				$barY - $barHeight * $k,
				($containers[$1].$xx - $containers[$1].$x) / this.$_state.$options.$fields.length,
				$barHeight * $k
			);
			$context.fillText(
				this.$_state.$list[$1][$4.$varName],
				$containers[$1].$x + ($containers[$1].$xx - $containers[$1].$x) * ($2 + .5) / this.$_state.$options.$fields.length,
				$barY - $barHeight * $k - $textIndentTop
			);
			++$2;
		}
	}



	//this.$1.width = 2*this.$w;
	//this.$1.height = this.$h;

	/*$context = this.$1.getContext('2d');
	$context.beginPath();
	$context.moveTo(0,0);
	$context.lineTo(this.$w,this.$h);
	$context.stroke();

	$context.beginPath();
	$context.moveTo(this.$w,0);
	$context.lineTo(0,this.$h);
	$context.stroke();*/

	this.$1.style.left = '-' + this.$scrollPos + 'px';

};
//$230620MultiVertBarChart.$widgetsFields = [];
