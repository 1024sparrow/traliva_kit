#USAGE_BEGIN#traliva_kit_debug##
registerHelp('$230618CascadeDiagram', {
	title: 'Каскадная диаграмма',
	//descr: '',
	//options:{},
	//stateObj:{}
});
#USAGE_END#traliva_kit_debug##
function $230618CascadeDiagram($p_wContainer, $p_options, $p_widgets){
	$Traliva.$WidgetStateSubscriber.call(this, $p_wContainer, $p_options, $p_widgets);
	this.$e = document.createElement('canvas');
	$p_wContainer.$_onResized = (function($self){
		return function($w, $h){
			$self.$w = $w;
			$self.$h = $h;
			$self.$_update();
		}
	})(this);
	$p_wContainer.$setContent(this.$e);
};
$230618CascadeDiagram.prototype = Object.create($Traliva.$WidgetStateSubscriber.prototype);
$230618CascadeDiagram.prototype.constructor = $230618CascadeDiagram;
$230618CascadeDiagram.prototype.$processStateChanges = function(s){
	if (!s){
		console.error('epic fail');
		return;
	}
	this.$_update();
};
$230618CascadeDiagram.prototype.$_update = function(){
	var
		$1, $2,
		$context = this.$e.getContext('2d'),
		$w,
		$fontSize,
		$labels = [],
		$ok,
		$cosAlpha = 0.5,
		$sinAlpha = 0.866,
		$scaleHeight = this.$h / 3;
	;
	this.$e.width = this.$w;
	this.$e.height = this.$h;
	/*$context.fillStyle = '#faa';
	$context.fillRect(0,0,this.$w, this.$h);*/

	if (this.$_state.$title){
		$context.beginPath();
		$context.moveTo(0, this.$h - $scaleHeight);
		$context.lineTo(this.$w, this.$h - $scaleHeight);
		$context.stroke();

		// Угол наклона: 60°
		// sin ⍺ = 0.866
		// cos ⍺ = 0.5

		$labels = [this.$_state.title];
		for ($1 of this.$_state.$parts){
			$labels.push($1.$title);
		}

		// ширина, выделяемая под подпись одного столбца
		$w = this.$w / (this.$_state.$parts.length + 1);

		// подбираем шрифт для шкалы
		for ($fontSize = 12 ; $fontSize >= 7 ; --$fontSize){
			$context.font = '' + $fontSize + 'px arial';
			$ok = true;
			for ($1 of $labels){
				$2 = $context.measureText($1).width * $cosAlpha + 1.5 * $fontSize * $sinAlpha;
				console.log('230619 ', $2, $w);
				if ($2 >= $w){
					$ok = false;
					break;
				}
			}
			if ($ok){
				break;
			}
		}
		console.log('230619 result font size: ', $fontSize);

		for ($1 = 0 ; $1 <= this.$_state.$parts.length ; ++$1){
			$context.save();
			$context.translate($1 * $w + $w / 2, this.$h);
			$context.rotate(-Math.PI/3);
			$context.textAlign = "right";
			$context.fillText($1 ? this.$_state.$parts[$1 - 1].$title : this.$_state.$title, $w, 0);
			$context.restore();
		}
	}
};
//$230618CascadeDiagram.$widgetsFields = [];
