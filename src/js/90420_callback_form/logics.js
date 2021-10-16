function $Logics(){
    $Traliva.$StateSubscriber.call(this);
};
$Logics.prototype = Object.create($Traliva.$StateSubscriber.prototype);
$Logics.prototype.constructor = $Logics;
$Logics.prototype.$processStateChanges = function(s){
    if (s && s.$clicked){
        (function($1, $2){
            var $cand = s.$phoneNumber, $3, $4 = '';
            for ($3 = 0 ; $3 < $cand.length ; ++$3){
                if ($cand[$3] === '+' && $cand[$3 + 1] === '7'){
                    $4 += '8';
                    ++$3;
                    continue;
                }
                else if (!isNaN(parseInt($cand[$3])))
                    $4 += $cand[$3];
            }
            if ($4.length !== 11 || $4[0] !== '8'){
                $2.$error = '<div class="$90420CallbackForm_fail">Введён некорректный номер. Примеры корректных номеров: <nobr>+7 123 456 7890,</nobr> <nobr>8(123)456-78-90,</nobr> <nobr>81234567890.</div>';
                $2.$clicked = false;
                $1.$_registerStateChanges();
            }
            else{
                $2.$error = '<div class="$90420CallbackForm_ok">Подождите. Производится запрос...</div>';
                $1.$_registerStateChanges();
                $Traliva.$ajax({
                    //$sourcePath: '/api/order-callback/7/1234567890/',
                    $sourcePath: '/api/order-callback/' + $4 + '/',
                    $readyFunc: function(){
                        $2.$error = '<div class="$90420CallbackForm_ok">Заказ на звонок принят. В ближайшее время наш специалист свяжется с вами.</div>';
                        $2.$clicked = false;
                        $1.$_registerStateChanges();
                    },
                    $errorFunc: function(){
                        $2.$error = '<div class="$90420CallbackForm_fail">Оповестить менеджера не удалось. Повторите попытку заказать звонок позже.</div>';
                        $2.$clicked = false;
                        $1.$_registerStateChanges();
                    }
                });
            }
        })(this, s);
    }
};
