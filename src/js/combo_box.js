#USAGE_BEGIN#traliva_kit_debug##
registerHelp('$ComboBox', {
    title: 'выпадающий список',
    //descr: '',
    options:{
        $variants: 'список вариантов (исходный).'
    },
    stateObj:{
        $variants: 'список вариантов. Каждый должен быть представлен объектом с полями $id и $title',
        $variants_changed: '(boolean) флаг о том, что список вариантов изменился, и список отображаемых вариантов необходимо обновить',
        $shared: '(boolean) если true, то компонент не будет сам снимать флаг о том, что данные изменились (внешнее снятие флага)',
        $current: 'id текущего элемента. Особое значение - \'-1\' - означает, что элемент не выбран.'
    }
});
#USAGE_END#traliva_kit_debug##
function $ComboBox($p_wContainer, $p_options){
    $Traliva.$WidgetStateSubscriber.call(this, $p_wContainer, $p_options);
    this.$_options = $p_options;
    this.$_wContainer = $p_wContainer;
    if ($p_options.hasOwnProperty('$variants')){
        this.$_setupContainer($p_options.$variants, -1);
    }
    else{
        // "нет вариантов" - отображаем пустой список (сейчас это просто отсутвие виджета)
    }
};
$ComboBox.prototype = Object.create($Traliva.$WidgetStateSubscriber.prototype);
$ComboBox.prototype.constructor = $ComboBox;
$ComboBox.prototype.$processStateChanges = function(s){
    if (!s){
        console.error('epic fail');
        return;
    }
    if (s.$variants_changed){
        this.$_setupContainer(s.$variants, (s.$current === undefined) ? -1 : s.$current);
        if (!this.$_options.$shared){
            s.$variants_changed = false;
            this.$_registerStateChanges();
        }
    }
    else{
        if (this.$_current !== s.$current){
            if (this.e)
                this.e.value = s.$current;
            this.$_current = s.$current;
        }
    }
};
$ComboBox.prototype.$_setupContainer = function($p_variants, $p_current){
    //элемент select не поддерживает изменение вариантов, поэтому мы полностью заменяем select
    var $1, $2, $3;
    this.$_wContainer.$setContent($Traliva.$createElement('<select traliva="e"></select>', this));
    for ($1 = 0 ; $1 < $p_variants.length ; $1++){
        $2 = document.$createElement('$option');
        $2.value = $p_variants[$1].$id;
        $3 = document.createTextNode($p_variants[$1].$title);
        $2.appendChild($3);
        this.e.appendChild($2);
    }
    this.e.value = $p_current;
    this.e.addEventListener('change', (function($self){return function(){
        $self.$_state.$current = $self.e.value;
        $self.$_current = $self.e.value;
        $self.$_registerStateChanges();
    };})(this));
    this.$_current = $p_current;
    this.$_wContainer.$_onResized = (function(e){return function($w, $h){
        e.style.width = $w + 'px';
        e.style.height = $h + 'px';
    };})(this.e);
};
