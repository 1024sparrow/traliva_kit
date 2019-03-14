#USAGE_BEGIN#traliva_kit_debug##
registerHelp('$Bedsheet', {
    title: 'Простыня - это контейнер, который отображает контент на широких (десктопных) экранах не на всю ширину, а лишь на узкой вертикальной полосе по центру',
    descr: 'Используйте конструктор как функцию, чтобы сгенерировать в лейауте описание виджета, обёрнутого этим контейнером',
    //options:{},
    //stateObj:{}
});
#USAGE_END#traliva_kit_debug##
function $Bedsheet($p_wContainer, $p_options, $p_widgets){
    var $children, $content, $1, $2 = {};
    if (this.constructor !== $Bedsheet){ // это не конструктор, а тупо функция
        // сокращённая семантика для сокращения лейаутов.
        // Должны вернуть фрагмент описателя лейаута.
        // p_wContainer - это не $Traliva.$Widget, а часть описания лейаута (объект или строка).
        return {
            $type: $Bedsheet,
            $content: [{
                $_widget: $p_wContainer
            }]
        };
    }
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
    $1 = $Traliva.$createElement('<div traliva="$1"></div>', $2);
    $2.$1.style.margin = 'auto';
    //$2.$1.style.background = 'rgba(255,255,255,0.3)';
    $2.$1.style.background = '#ffc';
    $2.$1.style.padding = '10px';
    $2.$1.style.borderRight = '1px solid #420';
    $2.$1.style.borderLeft = '1px solid #420';
    $1.style.overflow = '';
    $p_wContainer.$_onResized = (function($0, $1){return function($w, $h){
        this.$_content.style.height = '' + $h + 'px';
        $0.style.minHeight = '' + ($h - 20) + 'px';
        var $2 = $w * 0.9;
        if ($2 > 800)
            $2 = 800;
        $0.style.width = '' + $2 + 'px';
        console.log('content: ', $1);//
        $1.$_widget.$resize($2, 0);
    };})($2.$1, $content);
    $2.$1.appendChild($content.$_widget.$_div);
    $p_wContainer.$setContent($1);
    $p_wContainer.$_content.style.overflow = 'auto';
};
$Bedsheet.prototype = Object.create($Traliva.$WidgetStateSubscriber.prototype);
$Bedsheet.prototype.constructor = $Bedsheet;
$Bedsheet.prototype.$destroy = function(){
};
$Bedsheet.prototype.$processStateChanges = function(s){
};
$Bedsheet.$widgetsFields = ['$content'];
