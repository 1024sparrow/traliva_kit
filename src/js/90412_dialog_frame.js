#USAGE_BEGIN#traliva_kit_debug##
registerHelp('$90412DialogFrame', {
    title: 'краткого описания нет',
    descr: 'Используйте конструктор как функцию, чтобы сгенерировать в лейауте описание виджета, обёрнутого этим контейнером',
    //options:{},
    //stateObj:{}
});
#USAGE_END#traliva_kit_debug##
function $90412DialogFrame($p_wContainer, $p_options, $p_widgets){
    var $children, $content;
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
    // ...
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
