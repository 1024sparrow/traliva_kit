$Stack.prototype.$processStateChanges = function(s){
    $Traliva.$WidgetStateSubscriber.prototype.$processStateChanges.call(this, s);
    if (!s){
        console.error('epic fail');
        return;
    }
    console.log('BORIS HERE');
    // ...
};
