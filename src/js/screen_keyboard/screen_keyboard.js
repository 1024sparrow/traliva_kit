#USAGE_BEGIN#traliva_kit_debug##
registerHelp('$ScreenKeyboard', {
    title: 'Экранная клавиатура.',
    descr: 'Тип клавиатуры - classic, name, phone. Раскладки клавиатуры: русская, английская, китайская. Для каждого типа клавиатуры используется свой спрайт... Определите свою экранную клавиатуру, отнаследовавшись от данного класса. Вам поможет генератор спрайтов для экранных клавиатур: https://github.com/1024sparrow/screenKeyboardImageDrawer .',
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
    var
        $state = { // для копирования текста отсюда в окно отладки (состояние). Реально эта переменная здесь не нужна
            $layout: 'ru'
        },
        //$1 = $Traliva.$createElement('<div class="$TralivaKit__ScreenKeyboard">', undefined, '$TralivaKit__ScreenKeyboard__Container')
        $1 = $Traliva.$createElement('<div traliva="$_eLayout">', this, '$TralivaKit__ScreenKeyboard__Container'),
        $2
    ;
	if ('ontouchstart' in window){
        $2 = function($1, $p_eventType){
            return function($2){
                var
                    $3 = $2.changedTouches,
                    $4,
                    $5 = []
                ;
                for ($4 of $3){
                    $5.push({
                        $x: $4.pageX,
                        $y: $4.pageY
                    });
                }
                //$1.$_hitButton($3.pageX, $3.pageY);
                $1.$__processEvent($p_eventType, $5, true);
                $2.preventDefault(); // we block gestures! Ura!
            };
        };
        this.$_eLayout.addEventListener('touchstart', $2(this, 1));
        this.$_eLayout.addEventListener('touchmove', $2(this, 2));
        this.$_eLayout.addEventListener('touchend', $2(this, 3));

        /*this.$_eLayout.addEventListener('touchstart', (function($1){return function($2){
            var
                $3 = $2.changedTouches,
                $4,
                $5 = []
            ;
            for ($4 of $3){
                $5.push({
                    $x: $4.pageX,
                    $y: $4.pageY
                });
            }
            //$1.$_hitButton($3.pageX, $3.pageY);
            $1.$__processEvent(1, $5, true);
            $2.preventDefault(); // we block gestures! Ura!
        };})(this));*/
    }
    else {
        $2 = function($1, $p_eventType){
            return function($2){
                //$1.$_hitButton($2.clientX, $2.clientY);
                $1.$__processEvent(
                    $p_eventType,
                    [
                        {$x:$2.clientX, $y:$2.clientY}
                    ],
                    false
                );
                $2.preventDefault();
            };
        };
        this.$_eLayout.addEventListener('mousedown', $2(this, 1));
        this.$_eLayout.addEventListener('mousemove', $2(this, 2));
        this.$_eLayout.addEventListener('mouseup', $2(this, 3));

        /*this.$_eLayout.addEventListener('mousedown', (function($1){return function($2){
            //$1.$_hitButton($2.clientX, $2.clientY);
            $1.$__processEvent(
                1,
                [
                    {$x:$2.clientX, $y:$2.clientY}
                ],
                false
            );
            $2.preventDefault();
        };})(this));*/
    }
    window.boris = this.$_eLayout;//
    //this.$_options = $options;//$p_options;
    this.$_eLayout.className = '$TralivaKit__ScreenKeyboard';
    //this.$_curLayout = undefined; // '$ru';
    //this.$_curType = undefined; // '$classic';
    //this.$_schema = undefined; // pointer to current variant of current type

    $p_wContainer.$_onResized = (function($1, $2){return function($p_width, $p_height){
        $1.$_width = $p_width;
        $1.$_height = $p_height;
        if ($1.$_curType)
            $1.$_updateType($1.$_curType);
    };})(this, $p_options.$layouts);
    $p_wContainer.$setContent($1);
    this.$_catchEvents = false;
};
$ScreenKeyboard.prototype = Object.create($Traliva.$WidgetStateSubscriber.prototype);
$ScreenKeyboard.prototype.constructor = $ScreenKeyboard;
$ScreenKeyboard.prototype.$processStateChanges = function(s){
    if (!s){
        console.error('epic fail');
        return;
    }
    var $needUpdate = false;
    if (this.$_curType !== s.$type || this.$_curLayout !== s.$layout){
        this.$_curType = s.$type;
        this.$_curLayout = s.$layout;
        this.$_updateType(s.$type);
    }
};
$ScreenKeyboard.prototype.$_types = function(){
    console.error('it is virtual method. You have to reimplement this.');
    return {%% layouts.js %%};
};
$ScreenKeyboard.prototype.$_updateType = function($p_type){
    console.log('==== $ScreenKeyboard.prototype.$_updateType(', $p_type, ') ====');//
    if (!this.$_width || !this.$_height)
        return;

    var
        $ratio = this.$_width / this.$_height,
        $0,
        $1,
        $2,
        $3,
        $4,
        $5,
        $6, // current type variant (object)
        $7 = 0,
        $width,
        $height
    ;

    var $types = this.$_types();
    if (!$p_type || !$types.hasOwnProperty($p_type)){
        console.log('oops...', $p_type, JSON.stringify($types, undefined, 4));
        this.$_eLayout.className = '$TralivaKit__ScreenKeyboard';
        return;
    }

    this.$_eLayout.className = '$TralivaKit__ScreenKeyboard ' + $p_type;
    this.$_curTypeVariant = 0; // если ни один вариант не подходит, то первый вариант
    $3 = 0;
    for ($1 of $types[$p_type]){
        $2 = this.$_width * $1.$height / $1.$width;
        if (this.$_height >= $2){
        //if ($3 === 1){//boris stub
            $height = $2;
            this.$_curTypeVariant = $3;
        }
        $7 += $1.$width; // boris e: учитывать $orient ещё надо . Boris here: масштабирование и применение полученного $7.
        ++$3;
    }
    console.log('current type variant: ', this.$_curTypeVariant);

    if ($height < this.$_height){
        //this.$_eLayout.style.background = 'green';
        $1 = parseInt(this.$_height - $height);
        if ($1 = $types[this.$_curType]){
            $0 = 0; // type variant index
            $2 = 0; // total width
            $4 = 0; // total height (already scaled)
            $5 = 0; // horizontal shift
            $7 = 0; // vertical shift (layout)
            for ($1 of $1){
                if ($1.$orient === '$v'){
                    //
                    $2 += $1.$width;
                    $3 = 1;//$1.$layouts.length; // какую часть занимает по высоте одна раскладка
                }
                else if ($1.$orient === '$h'){
                    $2 += $1.$width * $1.layouts.length;
                    $3 = 1;
                }
                else{
                    console.log('ScreenKeyboard: unexpected orient value: ', $1[$0].$orient);
                }
                if ($3 > $4)
                    $4 = $3;
                if ($0 < this.$_curTypeVariant){
                    $5 += $2;
                }
                else if ($0 === this.$_curTypeVariant){
                    $6 = $1;
                    $height = $1.$height;
                    if ($1.$orient === '$v'){
                        $7 = $1.$layouts.indexOf(this.$_curLayout) * $1.$height;
                    }
                    else{
                        console.error('boris not realized!!');
                    }
                }
                ++$0;
            }
            $6 = $4 * this.$_width / $6.$width;
            $5 = parseInt($5 * $6);
            $2 = parseInt($2 * $6);
            $7 = parseInt($7 * $6);
            $width = this.$_width;
            $height = parseInt($height * $6);
            $6 = this.$_eLayout.style;
            $6.minHeight=$6.maxHeight=$6.height = $height + 'px';
            $6.backgroundSize = $2 + 'px';
            $6.backgroundPosition = -$5 + 'px -' + $7 + 'px';
            $6.width = '100%';
            $6.marginTop = (this.$_height - $height) + 'px';
        }

        // boris notes:
        // прозрачности пока нет, как и поддержки жестов.
        // через объект состояния подмены изображений клавиш тоже нет. Как и переопределения поведения.
        // Пока клавиатура тупая: если может, отображается. Отображается исключительно предзаданные раскладки клавиатуры.
        //
        // Нажатия клавиш пишутся в объект состояния. Флаг в опциях: при каждом нажатии писать в объект состояния, или по нажатии на Enter.
    }
    else{ // real width is too much
        if ($1 = $types[this.$_curType]){
            $0 = 0; // type variant index
            $2 = 0; // total width
            $4 = 0; // total height (already scaled)
            $5 = 0; // horizontal shift
            for ($1 of $1){
                if ($1.$orient === '$v'){
                    //
                    $2 += $1.$width;
                    $3 = 1;//$1.$layouts.length; // какую часть занимает по высоте одна раскладка
                }
                else if ($1.$orient === '$h'){
                    $2 += $1.$width * $1.layouts.length;
                    $3 = 1;
                }
                else{
                    console.log('ScreenKeyboard: unexpected orient value: ', $1[$0].$orient);
                }
                if ($3 > $4)
                    $4 = $3;
                if ($0 < this.$_curTypeVariant){
                    $5 = -$2;
                }
                else if ($0 === this.$_curTypeVariant){
                    $6 = $1;
                    $width = $1.$width;
                }
                ++$0;
            }
            $6 = $4 * this.$_height / $6.$height;
            $5 = parseInt($5 * $6);
            $2 = parseInt($2 * $6);
            $width = parseInt($width * $6);
            $height = this.$_height;
            $6 = this.$_eLayout.style;
            $6.minHeight=$6.maxHeight=$6.height = this.$_height + 'px';
            $6.backgroundSize = $2 + 'px';
            $6.backgroundPositionX = $5 + 'px';
            $6.width = $width + 'px';
        }
    }
    this.$_schema = $1 = $types[this.$_curType][this.$_curTypeVariant];
    $1.$realWidth = $width;
    $1.$realHeight = $height;
    $1 = $1.$buttons;
    $4 = 0;
    for ($2 of $1.$rows){
        $4 += ($2.$height * $height / $1.$height);
        $2.$realY = parseInt($4);
        $5 = 0;
        for ($3 of $2.$buttons){
            $5 += ($3.$width * $width / $1.$width);
            $3.$realX = parseInt($5);
        }
    }
};
$ScreenKeyboard.prototype.$_hitButton = function($p_x, $p_y){
    var
        $1,
        $2 = '',
        $rcViewport = this.$_eLayout.getBoundingClientRect()
    ;
    for ($1 of this.$_schema.$buttons.$rows){
        if ($p_y < ($1.$realY + $rcViewport.top)){
            for ($1 of $1.$buttons){
                if ($p_x < ($1.$realX + $rcViewport.left)){
                    $2 = $1.$id;
                    break;
                }
            }
            break;
        }
    }
    return $2;
};
$ScreenKeyboard.prototype.$__processEvent = function($p_eventType, $p, $p_takenFromSensorScreen){
    // eventType: 1 - down, 2 - move, 3 - up
    // p: list of {x:3, y:4}
    // takenFromSensorScreen - boolean

    var $1;
    for ($1 of $p){
        $1.$buttonId = this.$_hitButton($1.$x, $1.$y);
    }
    this.$_processEvent($p_eventType, $p, $p_takenFromSensorScreen);
};
$ScreenKeyboard.prototype.$_processEvent = function($p_eventType, $p, $p_takenFromSensorScreen){
    if ($p_eventType !== 2)
        console.error('it is virtual method. You have to reimplement this.'); // boris stub commented

    // boris here
    if ($p_eventType === 2){
    }
    else{
        console.log('debug b11014.1: ', $p_eventType, JSON.stringify($p, undefined, 4), $p_takenFromSensorScreen);
    }
};
//$ScreenKeyboard.$widgetsFields = [];
