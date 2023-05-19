#USAGE_BEGIN#traliva_kit_debug##
registerHelp('$230522Group', {
	title: 'Рамочка с названием секции (аналог QFrame)',
	//descr: '',
	options:{
		title: 'строка с названием секции'
	},
	//stateObj:{}
});
#USAGE_END#traliva_kit_debug##
function $230522Group($p_wContainer, $p_options, $p_widgets){
	if (this.constructor !== $230522Group){ // это не конструктор, а тупо функция
		// сокращённая семантика для сокращения лейаутов.
		// Должны вернуть фрагмент описателя лейаута.
		// p_wContainer - это не $Traliva.$Widget, а часть описания лейаута (объект или строка).
		return {
			$type: $230522Group,
			$content: [{
				$_widget: $p_wContainer
			}]
		};
	}
	var
		$children,
		$1
	;
	$children = $Traliva.$WidgetStateSubscriber.call(this, $p_wContainer, $p_options, $p_widgets);
	this.$e = $Traliva.$createElement('<div traliva="$content" class="$TralivaKit__230522Group__content">'+$p_options.$title+'</div>', this, '$TralivaKit__230522Group');
	/*this.$e.style.border = 'solid red 10px';
	this.$e.style.borderRadius = '10px';*/
	$1 = $children.$content[0].$_widget.$_div.style;
	//$1.border = 'solid #400 1px';
	//$1.borderRadius = '10px';
	$1.position = 'relative';
	this.$e.appendChild($children.$content[0].$_widget.$_div);
	$children.$content[0].$_widget.$_div.style.top = '4px';
	$p_wContainer.$_onResized = (function($1, $2){ return function($w,$h){
		$1.left = '20px';
		$2.$resize($w - 40, $h/2);
	};})($1, $children.$content[0].$_widget);
	$p_wContainer.$setContent(this.$e);
};
$230522Group.prototype = Object.create($Traliva.$WidgetStateSubscriber.prototype);
$230522Group.prototype.constructor = $230522Group;
$230522Group.prototype.$processStateChanges = function(s){
	if (!s){
		console.error('epic fail');
		return;
	}
	// ...
};
$230522Group.$widgetsFields = ['$content'];
