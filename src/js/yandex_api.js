#USAGE_BEGIN#traliva_kit_debug##
registerHelp('$YandexApi', {
    title: 'API Яндекса. Автоподшивка подгружаемых сторонних скриптов.',
    //descr: '',
    //options:{},
    //stateObj:{}
});
#USAGE_END#traliva_kit_debug##

#USAGE_BEGIN#YANDEX_MAPS_API##
(function(){
    if (typeof window !== 'undefined'){ // Проверка на NodeJS
        var $1 = document.createElement('script');
        $1.src = 'http://api-maps.yandex.ru/2.1/?load=package.full&lang=ru-RU';
        document.head.appendChild($1);
    }
    else{
        //
    }
})();
#USAGE_END#YANDEX_MAPS_API##

function $YandexApi($p_wContainer, $p_options, $p_widgets){
    $Traliva.$WidgetStateSubscriber.call(this, $p_wContainer, $p_options, $p_widgets);
    // ...
};
$YandexApi.prototype = Object.create($Traliva.$WidgetStateSubscriber.prototype);
$YandexApi.prototype.constructor = $YandexApi;
/*$YandexApi.prototype.$processStateChanges = function(s){
    if (!s){
        console.error('epic fail');
        return;
    }
    // ...
};*/
//$YandexApi.$widgetsFields = [];
