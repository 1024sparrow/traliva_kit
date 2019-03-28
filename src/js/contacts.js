#USAGE_BEGIN#traliva_kit_debug##
registerHelp('$Contacts', {
    title: 'Вкладка с контактами предприятия: телефон, адрес и пр.',
    //descr: '',
    //options:{},
    //stateObj:{}
});
#USAGE_END#traliva_kit_debug##
function $Contacts($p_wContainer, $p_options, $p_widgets){
    $Traliva.$WidgetStateSubscriber.call(this, $p_wContainer, $p_options, $p_widgets);
    // ...
};
$Contacts.prototype = Object.create($Traliva.$WidgetStateSubscriber.prototype);
$Contacts.prototype.constructor = $Contacts;
$Contacts.prototype.$processStateChanges = function(s){
    if (!s){
        console.error('epic fail');
        return;
    }
    // ...
};
//$Contacts.$widgetsFields = [];
