$Strip.prototype.$processStateChanges = function(s){
    if (!s){
        console.error('epic fail');
        return;
    }
    $Traliva.$WidgetStateSubscriber.call(this, s);
    // ...
};
