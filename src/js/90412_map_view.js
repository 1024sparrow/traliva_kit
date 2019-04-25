//State JSON: {"ss__data":[{"ss__lat":57.873608,"ss__lon":39.535165}]}
//{"ss__data":[{"ss__lat":57.87855,"ss__lon":39.517897}]} -- corrected
#USAGE_BEGIN#traliva_kit_debug##
registerHelp('$90412MapView', {
    title: 'Виджет карты (yandex maps)',
    //descr: '',
    options:{
        dataVarName: 'имя переменной, в которой хранятся данные по объектам',
        //mapVarName: 'имя переменной, в которой хранятся настройки самой карты'
        center: 'объект со свойствами lon, lat (в градусах) и popupHtml (html-код всплывающей подсказки). По умолчанию, координаты Тульмы в г.Тутаев Ярославской области.',
        zoom: 'масштаб. По умолчанию, 16.'
    },
    stateObj:{
        data: 'список объектов.\n[{\n  pos:{\n    lat: широта в градусах,\n    lon: долгота в градусах\n  },\n  ...\n}]',
        map: 'объект {  \n}'
    }
});
#USAGE_END#traliva_kit_debug##
#u#YANDEX_MAPS_API##
function $90412MapView($p_wContainer, $p_options, $p_widgets){
    $Traliva.$WidgetStateSubscriber.call(this, $p_wContainer, $p_options, $p_widgets);
    this.$dataVarName = $p_options.$dataVarName || '$data';
    //this.$lat;
    //this.$lon;
    //$popupHtml

    var $content, $1 = this,
        $zoom = $p_options.$zoom || 8,
        $center = $p_options.$center || {$lat:57.87855,$lon:39.517897};
    $content = $Traliva.$createElement(`
        <!--<script src="http://api-maps.yandex.ru/2.0/?load=package.full&lang=ru-RU"></script>-->
        <div traliva="$eMap" style="width: 100%; height: 100%; background: #888;">
    `, this);

    $p_wContainer.$_onResized = function($w, $h){
        $1.$eMap.style.width = '' + $w + 'px';
        $1.$eMap.style.height = '' + $h + 'px';
    };

    ymaps.ready((function($1){return function(){
        //$1.$myMap = new ymaps.Map($1.$eMap, {center: [57.873608,39.535165],zoom: 16, type: "yandex#map", behaviors: ["default", "scrollZoom"]});
        $1.$myMap = new ymaps.Map($1.$eMap, {center: [$center.$lat,$center.$lon],zoom: $zoom, type: "yandex#map"});
        // Создаем метку и задаем изображение для ее иконки
        /*$1.$myMap.controls.add("zoomControl").add("mapTools").add(new ymaps.control.TypeSelector(["yandex#map", "yandex#satellite", "yandex#hybrid", "yandex#publicMap"]));*/
    };})(this));
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
    var $1, $2;
    if (s)
        $1 = s[this.$dataVarName];
    if ($1){
        if ($1.length === 1){
            $1 = $1[0];
            if ($1.$lat !== this.$lat || $1.$lon !== this.$lon || $1.$popupHtml != this.$popupHtml){
                console.log('update...');
                // update
                // ...
                this.$myMap.geoObjects.removeAll();
                // doc: https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/Placemark-docpage/
                $2 = new ymaps.Placemark(
                    [$1.$lat, $1.$lon],
                    {
                        //hintContent: 'Тульма <img src="http://brezent-tulma.ru/data/template/images/bottomlogo.jpg"/><a href="https://traliva.ru">ss</a>',
                        hintContent: $1.$popupHtml,
                        //balloonContent: $1.$popupHtml // Для мобильной версии - это виджет, отображаемый по клику на бабле
                    },
                    {
                        //iconColor: '#afa'
                    }
                );
                //this.$eMap.addEventListener($2.click, function(){console.log('bubble clicked');});
                // https://yandex.ru/blog/mapsapi/14283 - обработка события клика по бабблу
                this.$myMap.geoObjects.add($2);
                // ...
                this.$lat = $1.$lat;
                this.$lon = $1.$lon;
                this.$popupHtml = $1.$popupHtml;
            }
        }
        else{
            // ... not implemented: this place reserved for multiple bubbles case
        }
    }
    // ...
};
//$90412MapView.$widgetsFields = [];
