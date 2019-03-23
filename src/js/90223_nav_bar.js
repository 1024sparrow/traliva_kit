#USAGE_BEGIN#traliva_kit_debug##
registerHelp('90223NavBar', {
    title: 'Переключалка между вкладками (панель)',
    //descr: '',
    options:{
        $target: '\'$desktop\'или \'$mobile\' - для десктопной версии или для мобильной, соответственно. Это влияет на ориентацию списка вкладок.',
        $color1: 'основной цвет панели (фоновый). Он же цвет текста для текущей вкладки. По умолчанию - бордовый.',
        $color2: 'дополнительный цвет панели (цвет текста). Он же цвет фона для выбранной вкладки. По умолчанию - жёлтый.',
        $variants: 'список вариантов: {$title: \'...\', $id: \'...\'}',
        $valueVarName: 'имя свойства в объекте состояния, в котором хранится идентификатор выбранной вкладки'
    },
    //stateObj:{}
});
#USAGE_END#traliva_kit_debug##
#USAGE_BEGIN#TralivaKit.90223NavBar##
function $90223NavBar($p_wContainer, $p_options, $p_widgets){
    var $eTable,
        $eRow,
        $0, $1, $2, $3, $4,
        $color1 = $p_options.$color1 || '#420',
        $color2 = $p_options.$color2 || '#ffa',
        $valueVarName = $p_options.$valueVarName || '$value',
        $variants = $p_options.$variants || [#USAGE_BEGIN#traliva_kit_debug##
            {
                $id: 'r1',
                $title: 'первая вкладка'
            },
            {
                $id: 'r2',
                $title: 'Вторая вкладка'
            },
        #USAGE_END#traliva_kit_debug##],
        $target = $p_options.$target || '$mobile';
    ;
    $p_options.$bg = $color1;
    $Traliva.$WidgetStateSubscriber.call(this, $p_wContainer, $p_options);
    this.$_options = $p_options;
    this.$_buttons = {};
    if ($target === '$desktop'){
        $eTable = document.createElement('table');
        $eTable.style.height = '100%';
        $eRow = $eTable.insertRow(-1);
        //this.$_current;
        for ($1 = 0 ; $1 < $variants.length ; ++$1){
            $0 = $variants[$1];
            $2 = $eRow.insertCell(-1);
            this.$_buttons[$0.$id] = {
                $element: $2,
                $enabled: false // не используется
            };
            $2.style.padding = '20px';
            $2.innerHTML = $0.$title;
            $2.style.color = $color2;
            $2.style.cursor = 'pointer';
            $2.addEventListener('click', (function($1, $2){return function(){
                $1.$_onTabClicked($2);
            };})(this, $0.$id));
        }
        $p_wContainer.$_onResized = (function($1, $2){return function($w, $h){
            var $0 = $2.getBoundingClientRect().width;
            $0 = $0 < $w ? ($w - $0)/2 : 0;
            $1.style.paddingLeft = '' + $0 + 'px';
        };})($p_wContainer.$_div, $eTable);
        $p_wContainer.$setContent($eTable);
    }
    else if ($target === '$mobile'){
        $eTable = document.createElement('div');
        $p_wContainer.$_div.style.overflow = 'auto';
        for ($1 = 0 ; $1 < $variants.length ; ++$1){
            $0 = $variants[$1];
            $2 = document.createElement('p');
            this.$_buttons[$0.$id] = {
                $element: $2,
                $enabled: false // не используется
            };
            $2.innerHTML = $0.$title;
            $2.style.padding = '20px';
            $2.style.color = $color2;
            $2.style.cursor = 'pointer';
            $2.addEventListener('click', (function($1, $2){return function(){
                $1.$_onTabClicked($2);
            };})(this, $0.$id));
            $eTable.appendChild($2);
        }
        $p_wContainer.$setContent($eTable);
    }
    #USAGE_BEGIN#traliva_kit_debug##
    else{
        $eTable = document.createElement('p');
        $eTable.style.height = '100%';
        $eTable.style.textAlign='center';
        $eTable.style.color = '#f80';
        $eTable.style.background = '#400';
        $eTable.innerHTML = 'incorrect target';
        $p_wContainer.$setContent($eTable);
    }
    #USAGE_END#traliva_kit_debug##
};
$90223NavBar.prototype = Object.create($Traliva.$WidgetStateSubscriber.prototype);
$90223NavBar.prototype.constructor = $90223NavBar;
$90223NavBar.prototype.$processStateChanges = function(s){
    if (!s){
        console.error('epic fail');
        return;
    }
    var $1;
    if (this.$_options.$target === '$desktop' || this.$_options.$target === '$mobile'){
        $1 = s[this.$_options.$valueVarName || '$value'];
        if ($1 !== this.$_current){
            this.$_setButtonHighlighten(this.$_current, false);
            this.$_setButtonHighlighten($1, true);
            this.$_current = $1;
        }
    }
};
//$90223NavBar.widgetsFields = [];
$90223NavBar.prototype.$_onTabClicked = function($p_id){
    if ($p_id === this.$_current)
        return;
    if (this.$_current)
        this.$_setButtonHighlighten(this.$_current, false);
    this.$_setButtonHighlighten($p_id, true);
    this.$_current = $p_id;
    this.$_state[this.$_options.$valueVarName || '$value'] = $p_id;
    this.$_registerStateChanges();
};
$90223NavBar.prototype.$_setButtonHighlighten = function($p_bnId, $p_if){
    var $0;
    if ($p_bnId)
        $0 = this.$_buttons[$p_bnId || '_'];
    if ($0){
        if ($p_if){
            $0.$element.style.color = this.$_options.$color1 || '#420';
            $0.$element.style.background = this.$_options.$color2 || '#ffa';
        }
        else{
            $0.$element.style.background = this.$_options.$color1 || '#420';
            $0.$element.style.color = this.$_options.$color2 || '#ffa';
        }
    }
};
#USAGE_END#TralivaKit.90223NavBar##
