#USAGE_BEGIN#traliva_kit_debug##
registerHelp('$RollIn', {
    title: 'Выкатывающееся меню для смартфонов',
    //descr: '',
    options:{
        $visibleVarName: 'имя свойства, которое в объекте состояния указывает, выкачен виджет или нет должен быть. Значение по умолчанию - \'$visible\'.'
    },
    //stateObj:{}
});
#USAGE_END#traliva_kit_debug##
function $RollIn($p_wContainer, $p_options, $p_widgets){
    var $children = $Traliva.$WidgetStateSubscriber.call(this, $p_wContainer, $p_options, $p_widgets);
    //this.$_rollInState = undefined;
    #USAGE_BEGIN#debug##
    if (typeof $p_options.$visibleVarName !== 'string'){
        console.log('ERROR: опция $visibleVarName должна быть явно указана (тип строка).');
    }
    #USAGE_END#debug##
    this.$_options = $p_options;
    //this.$e = $Traliva.$createElement('<div traliva="$_eMenuRect"><h1>Hello!</h1></div>', this, '$traliva_kit__roll_inn');
    this.$e = $Traliva.$createElement('<div traliva="$_eMenuRect"/>', this, '$traliva_kit__roll_inn');
    $p_wContainer.$_onResized = (function($0){return function($w, $h){
        $0.$_w = $0.$_getMenuWidth($w);
        if (!$0.$_rollState){
            $0.$_w = $0.$_getMenuWidth($w);
            $0.$_eMenuRect.style.left = '-' + $0.$_w + 'px';
            $0.$_eMenuRect.style.width = '' + $0.$_w + 'px';
        }
    };})(this);
    console.log(this.$e);
    if ($p_widgets){ // Содержимое меню формируется динамически
        console.log('ДИНАМИКА:', $p_widgets, $children, $p_options);//
    }
    else if ($p_options.$_children){ // Содержимое меню задано статически
        console.log('СТАТИКА:', $p_widgets, $children, $p_options);//
    }
    $p_wContainer.$setContent(this.$e);
};
$RollIn.prototype = Object.create($Traliva.$WidgetStateSubscriber.prototype);
$RollIn.prototype.constructor = $RollIn;
$RollIn.$widgetsFields = ['$content'];
$RollIn.prototype.$_getMenuWidth = function($p_width){
    return $p_width * 0.8;
};
$RollIn.prototype.$processStateChanges = function(s){
    if (!s){
        console.error('epic fail');
        return;
    }
    var $0;
    $0 = s[this.$_options.$visibleVarName || '$visible'] ? true : false;
    if (this.$_rollInState !== $0){
        console.log($0);
        if ($0){
            //this.$e.style.display = 'block';
            this.$_eMenuRect.style.left = '0px';
            this.$e.style.backgroundColor = 'rgba(0,0,0,0.5)';
        }
        else{
            //this.$e.style.display = 'none';
            this.$_eMenuRect.style.left = '-' + this.$_w + 'px';
            this.$e.style.backgroundColor = 'rgba(0,0,0,0)';
        }
        this.$_rollInState = $0;
    }

    // ...
    //
};
//$RollIn.widgetsFields = [];
