function $Logics(){
    $Traliva.$StateSubscriber.call(this);
};
$Logics.prototype = Object.create($Traliva.$StateSubscriber.prototype);
$Logics.prototype.constructor = $Logics;
$Logics.prototype.$processStateChanges = function(s){
    if (s && s.$clicked){
        //s.$error = 'Подождите, идёт связь с сервером...';
        //this.$_registerStateChanges();
        (function($1, $2){
            $Traliva.$ajax({
                $sourcePath: '/api/order-callback/7/9859713489/',
                $readyFunc: function(){
                    $2.$error = '<div class="$90420CallbackForm_ok">Заказ на звонок принят. В ближайшее время наш специалист свяжется с вами.</div>';
                    $1.$_registerStateChanges();
                },
                $errorFunc: function(){
                    $2.$error = 'Произошла ошибка.';
                    $2.$error = '<div class="$90420CallbackForm_fail">Оповестить менеджера не удалось. Повторите попытку заказать звонок позже.</div>';
                    $1.$_registerStateChanges();
                }
            });
        })(this, s);
    }
};
