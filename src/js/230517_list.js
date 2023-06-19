#USAGE_BEGIN#traliva_kit_debug##
registerHelp('$230517List', {
	title: 'Виджет списка элементов с возможностью выбора. Элмент - строка теста.',
	descr: '',
	options:{
	},
	stateObj:{
		//selectionMode: '0 - без выбора, 1 - одиночный выбор, 2 - множественный выбор; побитовое или с 4 - только чтение (выбрано, но поменять нельзя)',
		selectionMultiple: '(bool) - возможно ли выбрать несколько. По умолчанию true - можно выбрать несколько',
		selected: 'список индексов выбранных элементов',
		list: 'список строк с текстами'
	}
});
#USAGE_END#traliva_kit_debug##
function $230517List($p_wContainer, $p_options, $p_widgets){
	$Traliva.$WidgetStateSubscriber.call(this, $p_wContainer, $p_options, $p_widgets);
	var $1, $2;
	this.$constItemHeight = 24;
	this.$_tt = document.createElement('div');
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
	var $1, $2, $3, $4, $5;

	if (this.$scrollPos > this.$_state.$list.length * this.$constItemHeight){
		this.$scrollPos = this.$_state.$list.length * this.$constItemHeight - this.$h;
	}
	if (this.$scrollPos < 0){
		this.$scrollPos = 0;
	}

	$1 = this.$h / this.$constItemHeight + 1;
	for ($2 = this.$containers.length ; $2 < $1 ; ++$2){
		$3 = {};
		$3.$root = $Traliva.$createElement('<table cellspacing="0"><tr><td traliva="$1" class="$1 $off"></td><td traliva="$2" class="$2"></td></tr></table>', $3, '$item');
		$3.$1.descr = $3;
		$3.$root.addEventListener(
			'click',
			(function($1, $p_self){
				return function($event){
					var $2;
					if ($1.index < $p_self.$_state.$list.length){
						if ($1.hasOwnProperty('index')){
							$2 = $p_self.$_state.$selected.lastIndexOf($1.index);
							if ($2 < 0){
								$1.$1.className = '$1 $on';
								$p_self.$_state.$selected.push($1.index);
							}
							else {
								$1.$1.className = '$1 $off';
								$p_self.$_state.$selected.splice($2, 1);
							}
							$p_self.$_registerStateChanges();
						}
					}
				}
			})($3, this)
		);
		this.$containers.push($3);
		this.$_tt.appendChild($3.$root);
	}
	for ($2 = 0 ; $2 < this.$containers.length ; ++$2){
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
	this.$_tt.style.marginTop = '-' + this.$scrollPos%24 + 'px';
};
//$230517List.$widgetsFields = [];
