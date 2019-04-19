#USAGE_BEGIN#traliva_kit_debug##
registerHelp('$90412DialogFrame', {
    title: 'Контейнер для модальных диалоговых окон. На сером фоне с крестиком в правом верхнем углу',
    descr: 'Используйте конструктор как функцию, чтобы сгенерировать в лейауте описание виджета, обёрнутого этим контейнером',
    //options:{},
    //stateObj:{}
});
#USAGE_END#traliva_kit_debug##
function $90412DialogFrame($p_wContainer, $p_options, $p_widgets){
    var $children, $content,
        $1 = {};
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
    $p_wContainer.$setVisible(false);
    $children = $Traliva.$WidgetStateSubscriber.call(this, $p_wContainer, $p_options, $p_widgets);
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
    if (!s){
        console.error('epic fail');
        return;
    }
    // ...
};
$90412DialogFrame.$widgetsFields = ['$content'];
