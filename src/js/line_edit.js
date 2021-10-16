#USAGE_BEGIN#traliva_kit_debug##
registerHelp('$LineEdit', {
            title: 'Виджет строка ввода',
            options:{
                placeholder:'строка подсказки вроде "введите ..(что-то)"',
                requireVarName: 'имя свойства(boolean), true которого означает, что нужно записать в объект состояния значение этого текстового поля. Если не задано, в объекте состояния значения будет обновляться при каждом изменении текста',
                textVarName:'текст в поле редактирования. Это значение как для задания предустановленного значения, так и для считывания другими компонентами введённого пользователем текста',
                datatype: 'тип элемента ввода (см. документацию по свойству type HTML5-элемента <input>). По умолчанию, \'text\'.',
                color:'цвет текста и рамочки',
                hover_color:'цвет фона при наведении мышью'
            }
        });
#USAGE_END#traliva_kit_debug##
function $LineEdit($p_wContainer, $p_options){
    $Traliva.$WidgetStateSubscriber.call(this, $p_wContainer, $p_options);
    this.$requireVarName;

    var $datatype = $p_options.$datatype || 'text';
    $p_wContainer.$setContent($Traliva.$createElement('<input type="' + $datatype + '" traliva="e" class="$traliva_kit__lineedit"></input>', this));
    $p_wContainer.$_onResized = (function($self){
        return function(w,h){
            $$self.e.style.width = (w - 32) + 'px';
        }
    })(this);
    if ($p_options.hasOwnProperty('$placeholder'))
        this.e.placeholder = $p_options.$placeholder;
    if ($p_options.hasOwnProperty('$color')){
        this.e.style.color = $p_options.$color;
        this.e.style.border = '1px solid ' + $p_options.$color;
    }
    if ($p_options.hasOwnProperty('$hover_color')){
        this.e.addEventListener('mouseover', (function($1){return function(){this.style.background = $1;};})($p_options.$hover_color));
        this.e.addEventListener('mouseleave', (function($1){return function(){this.style.background = 'rgba(0,0,0,0)';};})());
    }
    if ($p_options.hasOwnProperty('$textVarName'))
        this.$textVarName = $p_options.$textVarName;
#USAGE_BEGIN#traliva_kit_debug##
    else
        console.error('$LineEdit: $textVarName - обязательное поле для задания в options');
#USAGE_END#traliva_kit_debug##
    if ($p_options.hasOwnProperty('$requireVarName')){
        this.$requireVarName = $p_options.$requireVarName;
    }
    else{
        this.e.addEventListener('input', (function($self){return function(){
            $self.$_state[$self.$textVarName] = $self.e.value;
            $self.$_registerStateChanges();
        }})(this));
        // event 'change' fires only on focus off
    }
};
$LineEdit.prototype = Object.create($Traliva.$WidgetStateSubscriber.prototype);
$LineEdit.prototype.constructor = $LineEdit;
$LineEdit.prototype.$processStateChanges = function(s){
    if (this.$requireVarName){
        // опция выдачи строго по запросу не протестирована.
        // надеюсь, при запуске ошибок не возникнет
        if (s[this.$requireVarName]){
            s[this.$requireVarName] = false;
            s[this.$textVarName] = this.e.value;
            this.$_registerStateChanges();
        }
    }
    if (this.e.value !== s[this.$textVarName])
        this.e.value = s[this.$textVarName];
};
