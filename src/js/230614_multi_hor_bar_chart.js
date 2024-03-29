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
	var $1, $2;
	this.$constItemHeight = 64;
	this.$_tt = document.createElement('table');
	this.$_tt.style.margin = '0px';
	this.$containers = [];
	this.$w = 0;
	this.$h = 0;
	this.$scrollPos = 0;
	this.$options = $p_options;
	this.$maxW =0;
	this.$minW =0;

	$p_wContainer.$_onResized = (function($self){
		return function($w, $h){
			$self.$w = $w;
			$self.$h = $h;
			$self.$_update();
		}
	})(this);
	this.$_tt.addEventListener(
		'wheel',
		(function($self){
			return function($event) {
				var
					$1 = $self.$scrollPos + $event.deltaY * $self.$constItemHeight / 120,
					$2 = $self.$_state.$list.length * $self.$constItemHeight,
					$3 = $2 - $self.$h
				;
				if ($1 < $2){
					$self.$scrollPos = ($1 < $3) ? $1 : $3;
				}
				$self.$_update();
			}
		})(this)
	);
	this.$_tt.className = '$traliva_kit__230614MultiHorBarChart';
	$p_wContainer.$setContent(this.$_tt);
};
$230614MultiHorBarChart.prototype = Object.create($Traliva.$WidgetStateSubscriber.prototype);
$230614MultiHorBarChart.prototype.constructor = $230614MultiHorBarChart;
$230614MultiHorBarChart.prototype.$processStateChanges = function(s){
	if (!s){
		console.error('epic fail');
		return;
	}
	if (s.$needUpdate){
		this.$_update();
	}
};
$230614MultiHorBarChart.prototype.$_update = function(){
	var $1, $2, $3, $4, $5, $6, $7;//, maxW = this.$_state.$list[0].$plan, minW = this.$_state.$list[0].$plan;

	if (this.$scrollPos > this.$_state.$list.length * this.$constItemHeight){
		this.$scrollPos = this.$_state.$list.length * this.$constItemHeight - this.$h;
	}
	if (this.$scrollPos < 0){
		this.$scrollPos = 0;
	}

	$1 = this.$h / this.$constItemHeight + 1;
	for ($2 = this.$containers.length ; $2 < $1 ; ++$2){
		$3 = this.$_tt.insertRow();
		$4 = $3.insertCell();
		$4.style.textAlign = 'right';
		$4.style.padding = '0 10px';
		$5 = $3.insertCell();
		$6 = document.createElement('canvas');
		$6.height = this.$constItemHeight;
		$6.style.width = '100%';
		$4.style.borderRight = '1px solid #808284';
		$5.appendChild($6);
		this.$containers.push({$eRow: $3, $eTitle: $4, $eDiagram: $6, $eDiagramTd: $5});
	}


	for ($2 = 0 ; $2 < this.$containers.length ; ++$2){
		this.$containers[$2].$eDiagram.style.width = '0px';
/*		if (this.$_state.$list[$2] > this.$maxW){
			this.$maxW = this.$_state.$list[$2].$plan;
		}
		if (this.$_state.$list[$2] < this.$minW){
			this.$minW = this.$_state.$list[$2].$plan;
		}
		if (this.$_state.$list[$2].$planScor > maxW){
			maxW = this.$_state.$list[$2].$plan;
		}
		if (this.$_state.$list[$2].$planScor < minW){
			minW = this.$_state.$list[$2].$plan;
		}
		if (this.$_state.$list[$2].$fact > maxW){
			maxW = this.$_state.$list[$2].$plan;
		}
		if (this.$_state.$list[$2].$fact < minW){
			minW = this.$_state.$list[$2].$plan;
		}*/
	}

//		console.log('!!!!x\t'+this.$maxW);
//		console.log('!!!!m\t'+this.$minW);
	$4 = 0; // ширина первой колонки в виде числа
	for (
		$1 = 0, $2 = parseInt(this.$scrollPos / this.$constItemHeight);
		$1 < this.$containers.length;
		++$1, ++$2
	){
		$3 = this.$containers[$1];
		$3.$eTitle.innerHTML =
			$2 < this.$_state.$list.length ?
				this.$_state.$list[$2].$title :
				''
		;
		$5 = $3.$eTitle.offsetWidth;
		if ($5 > $4){
			$4 = $5;
		}
	}
	$4 = this.$w - $4; // ширина второй колоки в виде числа
	for ($1 = 0 ; $1 < this.$containers.length ; ++$1){
		$3 = this.$containers[$1];
		$3.$eDiagram.style.width = '' + $4 + 'px';
		$3.$eDiagram.width = $4;
		$3.$eDiagram.height = this.$constItemHeight - 4; // 4 - магическое число. Я так и не нашёл способа избавиться от этого отступа в 4 пиксела.
	}
	for (
		$1 = 0, $2 = parseInt(this.$scrollPos / this.$constItemHeight);
		$1 < this.$containers.length;
		++$1, ++$2
	){
		if($1 < this.$_state.$list.length){
			console.log(this.$_state.$list[$1].$plan);
				this.$maxW = this.$_state.$list[$1].$plan;
				this.$minW = this.$_state.$list[$1].$plan;
				break;
		}
	}
	for (
		$1 = 0, $2 = parseInt(this.$scrollPos / this.$constItemHeight);
		$1 < this.$containers.length;
		++$1, ++$2
	){
		console.log('iterator\t'+$1);
		if($1 < this.$_state.$list.length){
			console.log(this.$_state.$list[$1].$plan);
			if (this.$_state.$list[$2].$plan > this.$maxW){
				this.$maxW = this.$_state.$list[$1].$plan;
			}
			if (this.$_state.$list[$2].$plan < this.$minW){
				this.$minW = this.$_state.$list[$1].$plan;
			}
			if (this.$_state.$list[$2].$planSkor > this.$maxW){
				this.$maxW = this.$_state.$list[$1].$planSkor;
			}
			if (this.$_state.$list[$2].$planSkor < this.$minW){
				this.$minW = this.$_state.$list[$1].$planSkor;
			}
			if (this.$_state.$list[$2].$fact > this.$maxW){
				this.$maxW = this.$_state.$list[$1].$fact;
			}
			if (this.$_state.$list[$2].$fact < this.$minW){
				this.$minW = this.$_state.$list[$1].$fact;
			}
		}
	}
		console.log('???x\t'+this.$maxW);
		console.log('???m\t'+this.$minW);
	for (
		$1 = 0, $2 = parseInt(this.$scrollPos / this.$constItemHeight);
		$1 < this.$containers.length;
		++$1, ++$2
	){
		$3 = this.$containers[$1];
		this.$_updateListItem(
			$3.$eDiagram,
			$2 < this.$_state.$list.length ?
//				(this.$_state.$list[$2]-this.$minW)/(this.$maxW-this.$minW) :
				this.$_state.$list[$2] :
				undefined
		);
	}
	this.$_tt.style.marginTop = '-' + this.$scrollPos%(this.$constItemHeight) + 'px';
};
$230614MultiHorBarChart.prototype.$_updateListItem = function($a_element, $a_descriptor){
	var
		$context = $a_element.getContext('2d'),
		$w = $a_element.width,
		$h = $a_element.height,
		$ww = $w - 64,
		$hh = $h - 10,
		$h0 = 5
	;
	if ($a_descriptor){
		$context.textBaseline = 'middle';

		$context.fillStyle = '#434f59';
		$context.fillRect(0, $h0, $ww * ($a_descriptor.$plan-this.$minW)/(this.$maxW-this.$minW), $hh / 3);
		$context.fillText('' + $a_descriptor.$plan, $ww * ($a_descriptor.$plan-this.$minW)/(this.$maxW-this.$minW) + $h0, $h0 + $hh/6);
		console.log('!!!!1\t'+ ($a_descriptor.$plan-this.$minW)/(this.$maxW-this.$minW));
		$context.fillStyle = '#808284';
		$context.fillRect(0, $h0 + $hh/3, $ww * ($a_descriptor.$planSkor-this.$minW)/(this.$maxW-this.$minW), $hh / 3);
		$context.fillText('' + $a_descriptor.$planSkor, $ww *($a_descriptor.$planSkor-this.$minW)/(this.$maxW-this.$minW) + $h0, $h0 + $hh/2);

		console.log('!!!!2\t'+ ($a_descriptor.$planSkor-this.$minW)/(this.$maxW-this.$minW));
		$context.fillStyle = '#ed1c24';
		$context.fillRect(0, $h0 + 2 * $hh/3, $ww * ($a_descriptor.$fact-this.$minW)/(this.$maxW-this.$minW), $hh / 3);
		$context.fillText('' + $a_descriptor.$fact, $ww * ($a_descriptor.$fact-this.$minW)/(this.$maxW-this.$minW) + $h0, $h0 + 5 * $hh/6);
		console.log('!!!!3\t'+ ($a_descriptor.$fact-this.$minW)/(this.$maxW-this.$minW));
	}
	else{
	}
};
//$230614MultiHorBarChart.$widgetsFields = [];
