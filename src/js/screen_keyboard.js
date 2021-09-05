#USAGE_BEGIN#traliva_kit_debug##
registerHelp('$ScreenKeyboard', {
    title: 'краткого описания нет',
    //descr: '',
    //options:{},
    //stateObj:{}
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
        $layouts = {
            $qwerty: [
                // в порядке убывания соотношения сторон width/height
                // при отрисовке прижимаем к нижнему краю, background не выставляем
                {
                    $orient: '$v',
                    $width: 541,
                    $height: 143
                }
            ]
        },
        $1 = $Traliva.$createElement('<div class="$TralivaKit__ScreenKeyboard">', undefined, '$TralivaKit__ScreenKeyboard__Container')
    ;

    $p_wContainer.$setContent();
};
$ScreenKeyboard.prototype = Object.create($Traliva.$WidgetStateSubscriber.prototype);
$ScreenKeyboard.prototype.constructor = $ScreenKeyboard;
$ScreenKeyboard.prototype.$processStateChanges = function(s){
    if (!s){
        console.error('epic fail');
        return;
    }
    // ...
};
//$ScreenKeyboard.$widgetsFields = [];
