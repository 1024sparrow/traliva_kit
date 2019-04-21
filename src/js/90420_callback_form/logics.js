function $Logics(){
    $Traliva.$StateSubscriber.call(this);
};
$Logics.prototype = Object.create($Traliva.$StateSubscriber.prototype);
$Logics.prototype.constructor = $Logics;
$Logics.prototype.$processStateChanges = function(s){
    console.log('999999999');
    console.log(s);
};
