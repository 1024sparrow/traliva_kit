#USAGE_BEGIN#traliva_kit_debug##
registerHelp('$90412MapView', {
    title: 'Виджет карты (yandex maps)',
    //descr: '',
    options:{
        dataVarName: 'имя переменной, в которой хранятся данные'
    },
    stateObj:{
        data: 'список объектов.\n[{\n  pos:{\n    lat: широта в градусах,\n    lon: долгота в градусах\n  },\n  ...\n}]'
    }
});
#USAGE_END#traliva_kit_debug##
#u#YANDEX_MAPS_API##
function $90412MapView($p_wContainer, $p_options, $p_widgets){
    $Traliva.$WidgetStateSubscriber.call(this, $p_wContainer, $p_options, $p_widgets);
    this.$dataVarName = $p_options.$dataVarName || '$data';
    //this.$lat;
    //this.$lon;

    var $content, $1 = {};
    $content = $Traliva.$createElement(`
        <!--<script src="http://api-maps.yandex.ru/2.0/?load=package.full&lang=ru-RU"></script>-->
        <div traliva="$eMap" style="width: 100%; height: 100%; background: #888;">
    `, $1);

    $p_wContainer.$_onResized = function($w, $h){
        $1.$eMap.style.width = '' + $w + 'px';
        $1.$eMap.style.height = '' + $h + 'px';
    };

    ymaps.ready((function($1){return function(){
        var myMap = new ymaps.Map($1, {center: [57.873608,39.535165],zoom: 16, type: "yandex#map", behaviors: ["default", "scrollZoom"]});
        // Создаем метку и задаем изображение для ее иконки
        var myPlacemark = new ymaps.Placemark(
            [57.873608,39.535165],
            {
                balloonContent: ""
            },
            {   
                iconImageHref: "/data/template/images/pointer.png", // картинка иконки
                iconImageSize: [128, 73], // размеры картинки
                iconImageOffset: [ -51,-63] // смещение картинки
            }
        );
        myMap.controls.add("zoomControl").add("mapTools").add(new ymaps.control.TypeSelector(["yandex#map", "yandex#satellite", "yandex#hybrid", "yandex#publicMap"]));

        // Добавление метки на карту
        myMap.geoObjects.add(myPlacemark);
    };})($1.$eMap));
    $p_wContainer.$setContent($content);
};
$90412MapView.prototype = Object.create($Traliva.$WidgetStateSubscriber.prototype);
$90412MapView.prototype.constructor = $90412MapView;
$90412MapView.prototype.$processStateChanges = function(s){
    #USAGE_BEGIN#debug##
    if (!s){
        console.error('epic fail');
        return;
    }
    #USAGE_END#debug##
    var $1;
    if (s)
        $1 = s[this.$dataVarName];
    if ($1){
        if ($1.length === 1){
            $1 = $1[0];
            if ($1.$lat !== this.$lat || $1.$lon !== this.$lon){
                // update
                // ...
                this.$lat = $1.$lat;
                this.$lon = $1.$lon;
            }
        }
        else{
            // ... not implemented: this place reserved for multiple bubbles case
        }
    }
    // ...
};
//$90412MapView.$widgetsFields = [];
