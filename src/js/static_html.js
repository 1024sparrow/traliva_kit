#USAGE_BEGIN#traliva_kit_debug##
registerHelp('$StaticHtml', {
    title: 'Тупо отображатель статического HTML',
    //descr: '',
    options:{
        $html: 'HTML, отображаемый данным виджетом.',
        $htmlVarName: 'имя переменной в объекте состояния, в которой хранится HTML-код, который данный виджет должен отображать. Если не задано, то отображаемый код будет неизменным. Если значение переменной имеет неопределённое значение, то отображается HTML-код, заданный в опции "html".',
        $processor: 'функция преобразования DOM-элемента сразу после установки innerHTML=<значение HTML`>. Единственный параметр: DOM-элемент (div), возвращаемое значение не требуется.'
    }
    //stateObj:{}
});
#USAGE_END#traliva_kit_debug##
#USAGE_BEGIN#TralivaKit.StaticHtml##
function $StaticHtml($p_wContainer, $p_options){
    $Traliva.$WidgetStateSubscriber.call(this, $p_wContainer, $p_options);
    this.$_options = $p_options;
    this.$_prevVal = '';
    this.$_wContainer = $p_wContainer;
    //this.$_e;
    var $1;
    if ($p_options.$html){
        this.$_e = $Traliva.$createElement('<div traliva=$container>' + $p_options.$html + '</div>', $1 = {}, '$traliva_kit__static_html');
        if ($p_options.$processor)
            $p_options.$processor($1.$container);
        //this.$_e.style.margin = 'auto';//
        $p_wContainer.$setContent(this.$_e);
        this.$_prevVal = $p_options.$html;
        //$1.$container.style.width = '600px';
    }
    //else
    //    console.log('22 облом');//
    //var $1 = this.$_e;
    $p_wContainer.$_onResized = function(w, h){
        //if ($1)
        //    $1.style.margin = 'auto';
        //this.$_div.style.margin = 'auto';//
        //this.$_contentDiv.style.width = '600px';//'' + ((w > 600) ? 600 : w) + 'px';

        this.$_contentDiv.style.width = '' + w + 'px';
        //this.$_contentDiv.style.height = '' + h + 'px';
        return {
            $h: this.$_contentDiv.clientHeight
        };
    };
};
$StaticHtml.prototype = Object.create($Traliva.$WidgetStateSubscriber.prototype);
$StaticHtml.prototype.constructor = $StaticHtml;
$StaticHtml.prototype.$destroy = function(){
    //this.$_wContainer.$_contentDiv.removeAttribute('style');
    //console.log('static html destroy');
    //this.$_e.removeAttribute('style');
};
$StaticHtml.prototype.$processStateChanges = function(s){
    if (!s){
        console.error('epic fail');
        return;
    }
    if (!this.$_options.$htmlVarName)
        return;
    var $0 = this.$_state[this.$_options.$htmlVarName] || this.$_options.$html || '';
    if ($0 === this.$_prevVal)
        return;
    this.$_e = $Traliva.$createElement($0, undefined, '$traliva_kit__static_html');
    console.log('----------------------\n', this.$_options);//
    if (this.$_options.$processor)
        this.$_options.$processor(this.$_e);
    this.$_wContainer.$setContent(this.$_e);
    this.$_prevVal = $0;
};
#USAGE_END#TralivaKit.StaticHtml##
