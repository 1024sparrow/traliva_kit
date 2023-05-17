#USAGE_BEGIN#traliva_kit_debug##
registerHelp('$230517List', {
	title: 'Виджет списка элементов с возможностью выбора. Элмент - строка теста.',
	descr: '',
	options:{
		selectable: 'none, single, multiple'
	},
	//stateObj:{}
});
#USAGE_END#traliva_kit_debug##
function $230517List($p_wContainer, $p_options, $p_widgets){
	$Traliva.$WidgetStateSubscriber.call(this, $p_wContainer, $p_options, $p_widgets);
	// ...
	var
		$itemHeight = 24,
		$1, $2
	;
	this.$constItemHeight = 24;
	this.$_tt = document.createElement('div');
	//this.$boris = $2;
	this.$containers = [];
	this.$w = 0;
	this.$h = 0;
	this.$scrollPos = 0;
	this.$options = $p_options;

	$p_wContainer.$_onResized = (function($self){
		return function($w, $h){
			//$self.$_onResized($w, $h);
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
	this.$_tt.className = '$traliva_kit__230517List';
	$p_wContainer.$setContent(this.$_tt);
};
$230517List.prototype = Object.create($Traliva.$WidgetStateSubscriber.prototype);
$230517List.prototype.constructor = $230517List;
$230517List.prototype.$processStateChanges = function(s){
	if (!s){
		console.error('epic fail');
		return;
	}
	this.$_update();
};
$230517List.prototype.$_update = function(){
	var $1, $2, $3;

	if (this.$scrollPos > this.$_state.$list.length * this.$constItemHeight){
		this.$scrollPos = this.$_state.$list.length * this.$constItemHeight - this.$h;
	}
	if (this.$scrollPos < 0){
		this.$scrollPos = 0;
	}
	/*if (this.$_state.$list.length * this.$constItemHeight < this.$h){
		this.$scrollPos = 0;
	}*/

	//$1 = this.$h / this.$_state.$list.length;
	$1 = this.$h / this.$constItemHeight + 1;
	for ($2 = this.$containers.length ; $2 < $1 ; ++$2){
		$3 = document.createElement('div');
		$3.className = '$1';
		$3.style.height = '24px';
		$3.innerHTML = 'qwe';
		this.$containers.push($3);
		this.$_tt.appendChild($3);
	}
	for ($2 = 0 ; $2 < this.$containers.length ; ++$2){
		this.$containers[$2].style.width = '' + this.$w + 'px';
	}

	for (
		$1 = 0, $2 = parseInt(this.$scrollPos / this.$constItemHeight);
		$1 < this.$containers.length;
		++$1, ++$2
	){
		this.$containers[$1].innerHTML =
			$2 < this.$_state.$list.length ?
				this.$_state.$list[$2] :
				''
		;
	}
	this.$_tt.style.marginTop = '-' + this.$scrollPos%24 + 'px';
};
//$230517List.$widgetsFields = [];
