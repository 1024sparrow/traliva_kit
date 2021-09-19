#USAGE_BEGIN#traliva_kit_debug##
registerHelp('$ScreenKeyboard', {
    title: 'Экранная клавиатура.',
    descr: 'Тип клавиатуры - classic, name, phone. Раскладки клавиатуры: русская, английская, китайская. Для каждого типа клавиатуры используется свой спрайт.',
    options:{
        $layouts: 'объект со списками описателей раскладок, сгруппированными по идентификатору типа клавиатуры. Описатель раскладки - объект со следующими свойствами: $orient($v,$h), список раскладок $layouts ($ru,$en,$ch), $width, $height(размеры в спрайте, используются также при подборе оптимального варианта для того или иного соотношения сторон экрана у пользователя)'
    },
    stateObj:{
        $type: 'тип клавиатуры ($classic, $name, $phone)',
        $layout: 'раскладув клавиатуры ($ru,$en,$ch)'
    }
});
#USAGE_END#traliva_kit_debug##
function $ScreenKeyboard($p_wContainer, $p_options, $p_widgets){
    $Traliva.$WidgetStateSubscriber.call(this, $p_wContainer, $p_options, $p_widgets);
    // ...
    //var
    //    $1 = document.createElement('div')
    //;
    //$1.className = '$TralivaKit__ScreenKeyboard';
    //$p_wContainer.$setContent($1);

    /*
        Спрайт: по вертикали раскладки клавиатуры ru-en-ch
        ┌───────┬─────┬─────┐ * https://en.wikipedia.org/wiki/Box-drawing_character
        │ 1-ru  │     │     │
        ├───────┤ 2-ru│ 2-en│
        │ 1-en  │     │     │
        └───────┴─────┴─────┘
        ┌───────┬─────┬─────┐ * https://en.wikipedia.org/wiki/Box-drawing_character
        │       │     │     │
        ├───────┼─────┼─────┤
        │       │     │     │
        └───────┴─────┴─────┘
        
    */
    this.$_types = { // для копирования текста отсюда в окно отладки (опции). Реально эта переменная здесь не нужна.
        $classic: [
            // в порядке убывания соотношения сторон width/height
            // при отрисовке прижимаем к нижнему краю, background не выставляем
            {
                $orient: '$v',
                $layouts: ['$en','$ru'],
                $width: 541,
                $height: 143
                // а также могут быть переопределения клавиш
            },
            {
                $orient: '$v',
                $layouts: ['$en', '$ru'],
                $width: 159,
                $height: 143
            }
        ],
        $phone: [
            {
                $orient: '$v',
                $layouts: ['$ru'],
                $width: 331,
                $height: 241
            }
        ]
    };

    var
        $state = { // для копирования текста отсюда в окно отладки (состояние). Реально эта переменная здесь не нужна
            $layout: 'ru'
        },
        //$1 = $Traliva.$createElement('<div class="$TralivaKit__ScreenKeyboard">', undefined, '$TralivaKit__ScreenKeyboard__Container')
        $1 = $Traliva.$createElement('<div traliva="$_eLayout">', this, '$TralivaKit__ScreenKeyboard__Container')
    ;
    window.boris = this.$_eLayout;//
    //this.$_options = $options;//$p_options;
    this.$_eLayout.className = '$TralivaKit__ScreenKeyboard';
    //this.$_curLayout = undefined; // '$ru';
    //this.$_curType = undefined; // '$classic';

    $p_wContainer.$_onResized = (function($1, $2){return function($p_width, $p_height){
        $1.$_width = $p_width;
        $1.$_height = $p_height;
        if ($1.$_curType)
            $1.$_updateType($1.$_curType);
    };})(this, $p_options.$layouts);
    $p_wContainer.$setContent($1);
};
$ScreenKeyboard.prototype = Object.create($Traliva.$WidgetStateSubscriber.prototype);
$ScreenKeyboard.prototype.constructor = $ScreenKeyboard;
$ScreenKeyboard.prototype.$processStateChanges = function(s){
    if (!s){
        console.error('epic fail');
        return;
    }
    if (this.$_curType !== s.$type){
        this.$_curType = s.$type;
        this.$_updateType(s.$type);
    }
    else if (this.$_curLayout !== s.$layout){
        this.$_curLayout = s.$layout;
        this.$_updateLayout(s.$layout);
    }
};
$ScreenKeyboard.prototype.$_updateType = function($p_type){
    if (!this.$_width || !this.$_height)
        return;

    //console.log(JSON.stringify($p_type, undefined, '\t'));

    //console.log(this.$_width, '--', this.$_height);

    var
        $ratio = this.$_width / this.$_height,
        $1,
        $2,
        $3,
        $height
    ;

    if (!$p_type || !this.$_types.hasOwnProperty($p_type)){
        console.log('oops...', $p_type, JSON.stringify(this.$_types, undefined, 4));
        this.$_eLayout.className = '$TralivaKit__ScreenKeyboard';
        return;
    }

    this.$_eLayout.className = '$TralivaKit__ScreenKeyboard ' + $p_type;
    this.$_curTypeVariant = undefined;
    $3 = 0;
    for ($1 of this.$_types[$p_type]){
        $2 = this.$_width * $1.$height / $1.$width;
        console.log('boris debug 10912.1: ', $2, 'boris here: почему не выбирается второй вариант?!'); // boris here: почему не выбирается второй вариант?!
        //console.log($2, this.$_height);
        if (this.$_height > $2){
            $height = $2;
            this.$_curTypeVariant = $3;
            //console.log('**', $height);
        }
        ++$3;
    }
    console.log('current type variant: ', this.$_curTypeVariant);

    if ($height){
        this.$_eLayout.style.height = $height + 'px';
        this.$_eLayout.style.width = '100%';
        this.$_eLayout.style.backgroundSize=this.$_width + 'px';
        //this.$_eLayout.style.background = 'green';
        $1 = parseInt(this.$_height - $height);
        this.$_eLayout.style.marginTop = $1 + 'px';

        this.$_updateLayout(this.$_curLayout);

        // boris here 1: сделать переключение между раскладками
        // boris here 2: сделать реакцию на нажатие клавиш

        // boris notes:
        // прозрачности пока нет, как и поддержки жестов.
        // через объект состояния подмены изображений клавиш тоже нет. Как и переопределения поведения.
        // Пока клавиатура тупая: если может, отображается. Отображается исключительно предзаданные раскладки клавиатуры.
        //
        // Нажатия клавиш пишутся в объект состояния. Флаг в опциях: при каждом нажатии писать в объект состояния, или по нажатии на Enter.
    }
};
$ScreenKeyboard.prototype.$_updateLayout = function($p_layout){
};
//$ScreenKeyboard.$widgetsFields = [];
