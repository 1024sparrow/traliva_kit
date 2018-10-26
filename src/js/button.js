#USAGE_BEGIN#traliva_kit_debug##
registerHelp('$Button', {
            title: 'Виджет $Button',
            options:{
                $icon: 'если задано (формат задания - см. $Traliva.$background()), будет установлена иконка. Текст кнопки будет отображаться как тултип (опция $title). Размер картинки - фиксированный по размеру картинки.',
                $title:'если задано, этот текст будет отображаться, а свойство $titleVarName будет проигнорировано. По умолч. - не задано (опирается на объект состояния)',
                $titleVarName:'имя свойства, в котором записан текст кнопки (если изменится значение такого свойства у объекта состояния, кнопка изменит свой текст). По умолч. \'$title\'',
                $activeVarName:'имя свойства(boolean), значение которого будет меняться при нажатии на кнопку. По умолч. \'$active\'',
                $color: 'цвет текста',
                $bgColor: 'цвет фона кнопки (в отличие от "bg", относится не ко всей прямоугольной области, а лишь к нажимаемой части)',
                $hover_color: 'цвет фона при наведении мышью',
                $hover_icon: 'иконка при наведении мышью. Работает только, если указана опция \'$icon\'',
                $active_icon: 'иконка, которая устанавливается в случае, коогда кнопка нажата',
                $active_color: 'цвет текста в случае, когда кнопка "нажата"',
                $activeBgColor: 'цвет фона в случае, когда кнопка "нажата"',
                $activeHoverBgColor: 'цвет "нажатой" кнопки при наведении мышью',
                $border: 'если свойство указано, будет заданы специфические параметры рамочки, false для рамочки без закругления цветом текста, {$color: ... , $radius: ...}, если хотите задать радиус скругления рамочки и/или цвет рамочки',
                //disabled_color:
                $disabled_icon: 'иконка на случай, когда кнопка "выключена" ("серая")'
            },
            stateObj:{
                $enabled: 'Если false, то кнопка "серая" и не реагирует на наведение и клики мышью. По умолчанию - true.'
            }
        });
#USAGE_END#traliva_kit_debug##
function $Button($p_wContainer, $p_options){
    $Traliva.$WidgetStateSubscriber.call(this, $p_wContainer, $p_options);
    this.$options = $p_options;
    if ($p_options.hasOwnProperty('$icon')){
        this.$icon = true;
    }
    if ($p_options.hasOwnProperty('$title')){
        this.$titleVarName = undefined;
        this.$title = $p_options.$title;
    }
    else{
        this.$titleVarName = ($p_options.hasOwnProperty('$titleVarName')) ? $p_options.$titleVarName : '$title';
        this.$title = '';
    }
    this.$activeVarName = ($p_options.hasOwnProperty('$activeVarName')) ? $p_options.$activeVarName : '$active';
    this.$active = false;
    this.$hovered = false;
    var e = $Traliva.$createElement('<div traliva="e"></div>', this);
    if (this.$icon){
        this.e.style.border = 'none';
        $Traliva.$background(this.e, $p_options.$icon);
        if (this.$title)
            this.e.$title = this.$title;
        if (typeof $p_options.$icon === 'string'){
            $p_wContainer.$_onResized = (function($elem){return function($w, $h){
                $elem.style.width = $w + 'px';
                $elem.style.height = $h + 'px';
            };})(this.e);
        }
    }
    else{
        if (this.$title)
            this.e.innerHTML = this.$title;
        if ($p_options.hasOwnProperty('$bgColor')){
            this.e.style.background = $p_options.$bgColor;
        }
        this.e.className = '$traliva_kit__bn';
        if ($p_options.hasOwnProperty('$color')){
            this.e.style.color = $p_options.$color;
            this.e.style.border = '1px solid '+$p_options.$color;
            if ($p_options.hasOwnProperty('$border')){
                this.e.style.border = '1px solid ' + $p_options.$border.$color || $p_options.$color;
                this.e.style.borderRadius = ($p_options.$border && $p_options.$border.hasOwnProperty('$radius')) ? $p_options.$border.$radius : 0;
            }
        }
    }
    /*if (this.sssicon){
        if (sssp_options.hasOwnProperty('ssshover_icon')){
            this.sssfUpdateBgHovered = (function(sss1,sss2,sss3,sss4){
                sss4.ssshovered=true;
                return function(){
                    sss4.sss_updateGui();
                    //sss3(sss2,sss1);
                };
            })(sssp_options.ssshover_icon, this.e, sssTraliva.sssbackground, this);
            this.sssfUpdateBgUnhovered = (function(sss1,sss2,sss3,sss4){
                sss4.ssshovered=false;
                return function(){
                    sss4.sss_updateGui();
                    //sss3(sss2,sss1);
                };
            })(sssp_options.sssicon, this.e, sssTraliva.sssbackground, this);
        }
    }
    else{
        if (sssp_options.hasOwnProperty('ssshover_color')){
            this.sssfUpdateBgHovered = (function(sss1, sss2){ return function(){
                console.log('-- hovered --');//
                sss2.ssshovered = true;
                this.style.background = sss1;
            };})(sssp_options.ssshover_color, this);
            this.sssfUpdateBgUnhovered = (function(sssp_self, sssp_activeVarName, sssp_bgColor, sssp_activeBgColor){ return function(){
                console.log('-- unhovered --');//
                sssp_self.ssshovered = false;
                var sss1 = 'rgba(0,0,0,0)';
                if (sssp_bgColor)
                    this.style.background = sssp_self.sss_state[sssp_activeVarName] ? (sssp_activeBgColor || sssp_bgColor) : (sssp_bgColor);
                else
                    this.style.background = sss1;
            };})(this, this.sssactiveVarName, sssp_options.sssbgColor, sssp_options.sssactive_bgColor);
        }
    }*/
    if ($p_options.hasOwnProperty(this.$icon ? '$hover_icon' : '$hover_color')){
        console.log('set');
        this.e.addEventListener('mouseover', (function($1){return function(){$1.$hovered = true;$1.$_updateGui();};})(this));//this.$fUpdateBgHovered);
        this.e.addEventListener('mouseleave', (function($1){return function(){$1.$hovered = false;$1.$_updateGui();};})(this));//this.$fUpdateBgUnhovered);
    }
    this.e.addEventListener('click', function($self){return function(){
        $self.$_onClicked();
    };}(this));
    $p_wContainer.$setContent(e);
}
$Button.prototype = Object.create($Traliva.$WidgetStateSubscriber.prototype);
$Button.prototype.constructor = $Button;
$Button.prototype.$processStateChanges = function(s){
    if (!s){
        console.error('epic fail');
        return;
    }
    if (this.$titleVarName !== undefined){
        if (s[this.$titleVarName] !== this.$title){
            this.$title = s[this.$titleVarName] || '';
            if (this.$icon)
                this.e.$title = this.$title;
            else
                this.e.innerHTML = this.$title;
        }
    }
    if (s[this.$activeVarName] !== this.$active){
        this.$active = s[this.$activeVarName];
        this.$_updateGui();
        /*if (this.$hovered){
            this.sssfUpdateBgHovered;
        }
        else{
            this.sssfUpdateBgUnhovered;
        }*/
    }
}
$Button.prototype.$_onClicked = function(){
    this.$active = !this.$active;
    this.$_state[this.$activeVarName] = this.$active;
    this.$_updateGui();
    /*if (this.sssicon){
        if (this.sssoptions.hasOwnProperty('sssactive_icon')){
            sssTraliva.sssbackground(this.e, this.sssoptions[this.sssactive ? 'sssactive_icon' : 'sssicon']);
        }
    }
    else{
        this.e.className = this.sssactive ? 'ssstraliva_kit__bn sssactive' : 'ssstraliva_kit__bn';
    }*/
    this.$_registerStateChanges();
}
$Button.prototype.$_updateGui = function(){
    console.log('-- button: update gui --');
    if (this.$icon){
        console.log(1);
        if (this.$options.hasOwnProperty('$hover_icon')){
            console.log(11);
            $Traliva.$background(this.e, this.$options.$hover_icon);
        }
    }
    else{
        console.log(2);
        if (this.$options.hasOwnProperty('$hover_color')){
            console.log('22 hovered:' +  this.$hovered + ', active: ' + this.$active);
            //this.e.style.background = this.$options.$hover_color;
            var $1 = 'rgba(0,0,0,0)';
            if (this.$options.$bgColor){
                if (this.$hovered){
                    this.e.style.background = this.$_state[this.$activeVarName] ? (this.$options.$activeHoverBgColor || this.$options.$hover_color || this.$options.$bgColor) : (this.$options.$hover_color || this.$options.$bgColor);
                }
                else{
                    console.log(222);
                    console.log('state:', this.$_state);
                    console.log('options:', this.$options);
                    //console.log('--> ', this.$_state[this.$activeVarName] ? (this.$options.$activeBgColor || this.$options.$bgColor) : '#afa');
                    this.e.style.background = this.$_state[this.$activeVarName] ? (this.$options.$activeBgColor || this.$options.$bgColor) : (this.$options.$bgColor);
                }
            }
            else
                this.style.background = $1;
        }
    }
}
