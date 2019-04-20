#USAGE_BEGIN#traliva_kit_debug##
registerHelp('$90412DialogFrame', {
    title: 'Контейнер для модальных диалоговых окон. На сером фоне с крестиком в правом верхнем углу',
    descr: 'Используйте конструктор как функцию, чтобы сгенерировать в лейауте описание виджета, обёрнутого этим контейнером',
    options:{
        visibleVarName: 'имя свойства в объекте состояния, определяющего видимость диалогового окна. По умолчанию, visible',
        aboutToCloseVarName: 'если указано, то нажатие на крестик не будет закрывать окно, а будет выставляться указанный changeFlag. Не может совпадать с visibleVarName'
    },
    //stateObj:{}
});
#USAGE_END#traliva_kit_debug##
function $90412DialogFrame($p_wContainer, $p_options, $p_widgets){
    var $children, $content,
        $1 = {}, $2;
    if (this.constructor !== $90412DialogFrame){ // это не конструктор, а тупо функция
        // сокращённая семантика для сокращения лейаутов.
        // Должны вернуть фрагмент описателя лейаута.
        // p_wContainer - это не $Traliva.$Widget, а часть описания лейаута (объект или строка).
        return {
            $type: $90412DialogFrame,
            $content: [{
                $_widget: $p_wContainer
            }]
        };
    }
    //$p_wContainer.$setVisible(false);
    this.$wContainer = $p_wContainer;
    this.$visibleVarName = $p_options.$visibleVarName || '$visible';
    #USAGE_BEGIN#debug##
    if ($p_options.$visibleVarName === $p_options.$aboutToCloseVarName)
        console.log('error: $visibleVarName и $aboutToCloseVarName не могут совпадать');
    #USAGE_END#debug##
    if ($p_options.$aboutToCloseVarName){
        $2 = {};
        $2[$p_options.$aboutToCloseVarName] = true;
    }
    $children = $Traliva.$WidgetStateSubscriber.call(this, $p_wContainer, $p_options, $p_widgets, $2);
    $content = $children.$content;
    #USAGE_BEGIN#traliva_kit_debug##if ($content)#USAGE_END#traliva_kit_debug##
        $content = $content[0];
    #USAGE_BEGIN#traliva_kit_debug##
    if (!$content){
        console.log('epic fail');
        return;
    }
    #USAGE_END#traliva_kit_debug##

    this.$e = $Traliva.$createElement('<div traliva="$cross" class="$TralivaKit__90412DialogFrame_cross"></div>', $1, '$TralivaKit__90412DialogFrame');
    this.$e.appendChild($content.$_widget.$_div);
    if ($p_options.$aboutToCloseVarName){
        $1.$cross.addEventListener('click', (function($1, $2){return function(){
            $1.$_state[$2] = false;
            $1.$_registerStateChanges();
        };})(this, $p_options.$aboutToCloseVarName));
    }
    else{
        //$1.$cross.addEventListener();
        $1.$cross.addEventListener('click', (function($1){return function(){
            $1.$wContainer.$setVisible(false);
            $1.$_state[$1.$visibleVarName] = false;
            $1.$_registerStateChanges();
        };})(this));
    }
    $content.$_widget.$_div.style.position = 'relative';
    $p_wContainer.$_onResized = function($w, $h){
        var $5 = $w > $h ? $h : $w, $6 = 0.1;
        if ($5 * $6 < 32){
            $6 = 32./$5;
        }
        $5 = $content.$_widget.$resize($w * (1. - 2.*$6), $h * (1. - 2.*$6));
        $content.$_widget.$_div.style.left = '' + $w * $6 + 'px';
        $content.$_widget.$_div.style.top = '' + $h * $6 + 'px';
        $1.$cross.style.left = '' + ($w * (1. - $6)) + 'px';
        $1.$cross.style.top = '' + ($h * $6) + 'px';
    };
    $p_wContainer.$setContent(this.$e);
};
$90412DialogFrame.prototype = Object.create($Traliva.$WidgetStateSubscriber.prototype);
$90412DialogFrame.prototype.constructor = $90412DialogFrame;
$90412DialogFrame.prototype.$processStateChanges = function(s){
    this.$wContainer.$setVisible(s && s[this.$visibleVarName]);
};
$90412DialogFrame.$widgetsFields = ['$content'];
