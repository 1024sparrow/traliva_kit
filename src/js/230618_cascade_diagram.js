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
		$1, $2, $3,
		$constMinFontSize = 7,
		$constMaxFontSize = 12,
		$context = this.$e.getContext('2d'),
		$w,
		$fontSize,
		$labels = [],
		$ok = true,
		// Угол наклона: 30°
		// cos ⍺ = 0.866
		// sin ⍺ = 0.5
		$cosAlpha = 0.866,
		$sinAlpha = 0.5,
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

		$labels = [this.$_state.$title];
		for ($1 of this.$_state.$parts){
			$labels.push($1.$title);
		}

		// ширина, выделяемая под подпись одного столбца
		$w = this.$w / (this.$_state.$parts.length + 1);

		// подбираем шрифт для шкалы
		$3 = $scaleHeight / $sinAlpha;
		for ($fontSize = $constMaxFontSize ; $fontSize > $constMinFontSize ; --$fontSize){
			$context.font = '' + $fontSize + 'px arial';
			$2 = $3 - $fontSize * $sinAlpha / $cosAlpha;
			$ok = true;
			for ($1 of $labels){
				if ($context.measureText($1).width >= $2){
					$ok = false;
					break;
				}
			}
			if ($ok){
				break;
			}
		}
		// уже минимальный шрифт, а текст так и не помещается. Выкидываем по слову до тех пор, пока не станет помещаться.
		$context.font = '' + $fontSize + 'px arial';//
		if ($fontSize === $constMinFontSize){
			for ($1 = 0 ; $1 < $labels.length ; ++$1){
				while ($context.measureText($labels[$1]).width >= $2){
					if ($labels[$1].length === 0){
						break;
					}
					if ($labels[$1].slice(-3) === '...'){
						$labels[$1] = $labels[$1].slice(0, -3);
					}
					$labels[$1] = $labels[$1].trim().split(/\s+/).slice(0,-1).join(' ') + '...';
				}
			}
		}

		for ($1 = 0 ; $1 <= this.$_state.$parts.length ; ++$1){
			$context.moveTo($1 * $w,0); //
			$context.lineTo($1 * $w,this.$h); //
			$context.stroke();

			$context.save();
			$context.translate($1 * $w + $w / 2, this.$h - $scaleHeight);
			$context.rotate(-Math.PI/6);
			$context.textAlign = "right";
			$context.textBaseline = 'top';
			$context.fillText($labels[$1], 0, 0);
			$context.restore();
		}
	}
};
//$230618CascadeDiagram.$widgetsFields = [];
