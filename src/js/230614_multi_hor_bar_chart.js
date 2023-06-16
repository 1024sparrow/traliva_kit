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
	this.$constItemHeight = 24;
	this.$_tt = document.createElement('table');
	this.$_tt.style.margin = '0px';
	this.$containers = [];
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
	this.$_tt.addEventListener(
		'wheel',
		(function($self){
			return function($event) {
				var
					$1 = $self.$scrollPos + $event.deltaY/5,
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
	var $1, $2, $3, $4, $5, $6, $7;

	if (this.$scrollPos > this.$_state.$list.length * this.$constItemHeight){
		this.$scrollPos = this.$_state.$list.length * this.$constItemHeight - this.$h;
	}
	if (this.$scrollPos < 0){
		this.$scrollPos = 0;
	}

	$1 = this.$h / this.$constItemHeight + 1;
	for ($2 = this.$containers.length ; $2 < $1 ; ++$2){
		$3 = this.$_tt.insertRow();
		//$3.height = '64px';
		$4 = $3.insertCell();
		$4.innerHTML = '1111';//
		$5 = $3.insertCell();
		$6 = document.createElement('canvas');
		$6.height = 64;
		$4.style.borderRight = '1px solid #808284';
		$5.appendChild($6);
		this.$containers.push({$eRow: $3, $eTitle: $4, $eDiagram: $5});
	}



	for ($2 = 0 ; $2 < this.$containers.length ; ++$2){
		//this.$containers[$2].$root.style.width = '' + this.$w + 'px';
	}



	/*for ($2 = 0 ; $2 < this.$containers.length ; ++$2){
		this.$containers[$2].$root.style.width = '' + this.$w + 'px';
	}

	for (
		$1 = 0, $2 = parseInt(this.$scrollPos / this.$constItemHeight);
		$1 < this.$containers.length;
		++$1, ++$2
	){
		this.$containers[$1].index = $2;
		this.$containers[$1].$1.className =
			this.$_state.$selected.lastIndexOf($2) >= 0 ?
				($2 < this.$_state.$list.length ? '$1 $on' : '$1') :
				($2 < this.$_state.$list.length ? '$1 $off' : '$1')
		;
		this.$containers[$1].$root.className = ($2 < this.$_state.$list.length ? '$item $used' : '$item');
		this.$containers[$1].$2.innerHTML =
			$2 < this.$_state.$list.length ?
				this.$_state.$list[$2] :
				''
		;
	}
	this.$_tt.style.marginTop = '-' + this.$scrollPos%24 + 'px';*/
};
$230614MultiHorBarChart.prototype.$_updatelistItem = function($a_element, $a_descriptor){
};
//$230614MultiHorBarChart.$widgetsFields = [];
