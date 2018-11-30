#USAGE_BEGIN#traliva_kit_debug##
registerHelp('$StaticHtml', {
    title: 'Тупо отображатель статического HTML',
    //descr: '',
    options:{
        $html: 'HTML, отображаемый данным виджетом.',
        $htmlVarName: 'имя переменной в объекте состояния, в которой хранится HTML-код, который данный виджет должен отображать. Если не задано, то отображаемый код будет неизменным. Если значение переменной имеет неопределённое значение, то отображается HTML-код, заданный в опции "html".'
    }
    //stateObj:{}
});
#USAGE_END#traliva_kit_debug##
function $StaticHtml($p_wContainer, $p_options){
    $Traliva.$WidgetStateSubscriber.call(this, $p_wContainer, $p_options);
    this.$_options = $p_options;
    if ($p_options.$html)
        $p_wContainer.$setContent($Traliva.$createElement($p_options.$html));
}
$StaticHtml.prototype = Object.create($Traliva.$WidgetStateSubscriber.prototype);
$StaticHtml.prototype.constructor = $StaticHtml;
$StaticHtml.prototype.$processStateChanges = function(s){
    if (!s){
        console.error('epic fail');
        return;
    }
    //if ()
}
