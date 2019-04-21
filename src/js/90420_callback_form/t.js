#USAGE_BEGIN#traliva_kit_debug##
registerHelp('$90420CallbackForm', {
    title: 'Форма обратного звонка',
    //descr: '',
    options:{
        режимРаботы: 'режим работы',
        mediatorUrl: 'url посредника. На этот URL ожидается POST-запрос об оповещении менеджера, в ответ на POST-запрос ожидается объект с полями descr и status.',
        dataVarName: 'имя переменной, в которой будет храниться информация, введённая пользователем'
    },
    stateObj:{
        data: `{
    number: '+71234567890'
}`
    }
});
#USAGE_END#traliva_kit_debug##
#u#TralivaKit__Strip##
#u#TralivaKit__Stack##
#u#TralivaKit__Button##
#u#TralivaKit__LineEdit##
#u#TralivaKit__Label## // или StaticHTML
function $90420CallbackForm($p_wContainer, $p_options, $p_widgets){
    $Traliva.$WidgetStateSubscriber.call(this, $p_wContainer, $p_options, $p_widgets);
    var $wContent;
    this.$widgetsScope = {};
    this.$oWidgets = {};
    // неизвестен defaultBackground
    //$wContent = new $Traliva.$Widget();
    //$wContent.$setContent(undefined, '#f00');
    $wContent = $Traliva.$_constructLayout($p_wContainer, {%% layout.js %%}, undefined, this.$oWidgets, this.$widgetsScope);
    //$wContent = new $TralivaKit.$Button($p_wContainer, {$title:'123'});
    $p_wContainer.$setContent($wContent.$_div);
};
$90420CallbackForm.prototype = Object.create($Traliva.$WidgetStateSubscriber.prototype);
$90420CallbackForm.prototype.constructor = $90420CallbackForm;
$90420CallbackForm.prototype.$processStateChanges = function(s){
    if (!s){
        console.error('epic fail');
        return;
    }
    // ...
};
//$90420CallbackForm.$widgetsFields = [];
