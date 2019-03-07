#USAGE_BEGIN#traliva_kit_debug##
registerHelp('$Bedsheet', {
    title: 'Простыня - это контейнер, который отображает контент на широких (десктопных) экранах не на всю ширину, а лишь на узкой вертикальной полосе по центру',
    //descr: '',
    //options:{},
    //stateObj:{}
});
#USAGE_END#traliva_kit_debug##
function $Bedsheet($p_wContainer, $p_options, $p_widgets){
    var $children, $content, $1, $2 = {};
    $children = $Traliva.$WidgetStateSubscriber.call(this, $p_wContainer, $p_options, $p_widgets);
    console.log('3333:',$children.$content);//
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
    console.log('4444:', $2);
    $2.$1.appendChild($content.$_widget.$_div);
    $p_wContainer.$setContent($1);
};
$Bedsheet.prototype = Object.create($Traliva.$WidgetStateSubscriber.prototype);
$Bedsheet.prototype.constructor = $Bedsheet;
$Bedsheet.prototype.$processStateChanges = function(s){
};
$Bedsheet.$widgetsFields = ['$content'];
