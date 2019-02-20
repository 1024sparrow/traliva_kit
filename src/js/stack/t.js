#USAGE_BEGIN#traliva_kit_debug##
registerHelp('$Stack', {
    title: 'Многослойный лейаут: элементы один поверх другого',
    //descr: '',
    //options:{},
    //stateObj:{}
});
#USAGE_END#traliva_kit_debug##
function $Stack($p_wContainer, $p_options, $p_widgets){
    console.log('Запускается конструктор класса $Stack');
	this.$__items = [];
	this.$__zIndexCounter = 1;
    this.$_w = undefined;
    this.$_h = undefined;

	this.$_eStack = document.createElement('div');
	this.$_eStack.style.position = 'relative';
    var $children = $Traliva.$WidgetStateSubscriber.call(this, $p_wContainer, $p_options, $p_widgets),
        $1;
    $p_wContainer.$_onResized = (function($0){return function($w, $h){
        $0.$_w = $w;
        $0.$_h = $h;
        for (var $1 = 0 ; $1 < $0.$__items.length ; $1++){
            var $item = $0.$__items[$1];
            $item.$resize($w,$h);
        }
    };})(this);

    $p_wContainer.$setContent(this.$_eStack);
    if ($p_widgets){ // Содержимое меню формируется динамически
        console.log('ДИНАМИКА:', $p_widgets, $children, $p_options);//
    }
    else if ($p_options.$_children){ // Содержимое меню задано статически
        console.log('СТАТИКА:', $p_widgets, $children, $p_options);//
        for ($1 = 0 ; $1 < $children.length ; ++$1){
            this.$addItem($children[$1]);
        }
    }
    if ($children)
        this.$_updateItems($children.$items);
    console.log('----');
};
$Stack.prototype = Object.create($Traliva.$WidgetStateSubscriber.prototype);
$Stack.prototype.constructor = $Stack;
$Stack.$widgetsFields = ['$items'];
$Stack.prototype.$_createContentElem = function(){
	return this.$_eStack;
};
$Stack.prototype.$_updateLayout = function($p){
    this.$_updateItems($p ? ($p.$items || []) : []);
};
$Stack.prototype.$_updateItems = function($p_content){
    var $1;
    while (this.$__items.length){
        this.$removeItem(0);
    }
    for ($1 = 0 ; $1 < $p_content.length ; ++$1){
        this.$addItem($p_content[$1].$_widget);
    }
};
$Stack.prototype.$addItem = function($p_itemWidget){
	if (typeof $p_itemWidget != 'object'){
		console.log('epic fail');
		return;
	}
	$p_itemWidget.$_div.style.position = 'absolute';
	$p_itemWidget.$_div.style.zIndex = this.$__zIndexCounter;
	$p_itemWidget.$_div.style.left = '0';
	$p_itemWidget.$_div.style.top = '0';
	this.$_eStack.appendChild($p_itemWidget.$_div);
	this.$__items.push($p_itemWidget);
    if (this.$_w)
        $p_itemWidget.$resize(this.$_w, this.$_h);

	this.$__zIndexCounter++;
};
$Stack.prototype.$removeItem = function($p_index){
    if ($p_index >= this.$__items.length){
        console.log('epic fail');
        return;
    }
    this.$_eStack.removeChild(this.$__items[$p_index].$_div);
    this.$__items.splice($p_index, 1);
};
$Stack.prototype.$_onChildVisibilityChanged = function($wChild){
    var $0, $1, $2;//$1 - top level widget index
    for ($0 = 0 ; $0 < this.$__items.length ; $0++){
        if (this.$__items[$0].$isVisible())
            $1 = $0;
    }
    for ($0 = 0 ; $0 < this.$__items.length ; $0++){
        $2 = this.$__items[$0];
        $2.$setMouseEventsBlocked($0 !== $1);
    }
};
{%% process_state_changes.js %%}
