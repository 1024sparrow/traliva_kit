#USAGE_BEGIN#traliva_kit_debug##
registerHelp('$Contacts', {
    title: 'Виджет отображения контактов организации',
    //descr: '',
    options:{
        target: 'enum TralivaKit__Contacts__Target: mobile_h, mobile_v, desktop.'
    },
    stateObj:{
        phone: 'контактный номер телефона. Строка вида \'+71234567890\'. При отображении этот номер будет приведён к форме \'+7 (123) 456-78-90\'.',
        address: 'объект с адресом',

        data: `Объект, описывающий контактные данные предприятия:
    phone: <контактный номер телефона (строка)>,
    address:{
        //postIndex: <почтовый индекс (строка)>,
        address: <адрес (строка)>,
        coordinates:{
            lat: <широта (float, градусы)>,
            lon: <долгота (float, градусы)>
        },
        requisites:{ // ОКПО, ИНН/КПП, ОГРН, р/с, к/сч, БИК
            ИНН: <ИНН (строка)>,
            КПП: <КПП (строка)>,
            ОКПО: <ОКПО (строка)>,
            ОГРН: <ОГРН (строка)>

        }
    }
        `
    }
});
#USAGE_END#traliva_kit_debug##
#ENUM#TralivaKit__Contacts__Target:desktop,mobile##
function $Contacts($p_wContainer, $p_options, $p_widgets){
    $Traliva.$WidgetStateSubscriber.call(this, $p_wContainer, $p_options, $p_widgets);
    this.$eTileContainer;
    this.$tiles = {};
    this.$icons = {};
    var $target = $p_options.$target || '$mobile',
        $tabsPosition = $p_options.$tabsPosition || '$top'
    ;

    var $content;
    if ($target === '$mobile'){
        $content = $Traliva.$createElement(`
        <div style="width:100%;">
            <div class="$card_icon_mobile" style="background:url(phone_64.png) #ffa;"></div>
            <div class="$card_icon_mobile" style="background:url(map_64.png) #ffa;top:20px;"></div>
            <div class="$card_icon_mobile" style="background:url(requisites_64.png) #ffa;"></div>
            <div class="$card_icon_mobile" style="background:url(social_64.png) #ffa;"></div>
        </div>
        <div $traliva="$eee1" style="border:2px solid #000;border-radius:32px;padding:16px;background: #ffe;">
            <table>
                <tr>
                    <td colspan="2">
                        <p><strong>Телефон: </strong> +7 (123) 456-78-90</p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div class="$bn">
                            Позвонить
                        </div>
                    </td>
                    <td>
                        <div class="$bn">
                            Заказать звонок
                        </div>
                    </td>
                </tr>
            </table>
        </div>

            `, this, '$traliva_kit__contacts');
        $p_wContainer.$setContent($content);
        $p_wContainer.$_onResized = (function($1){return function($w, $h){
            //console.log('on resized');
            //$1.style.height = (h - 64 - 32) + 'px'; // 64 - below icons height; 32 - paddings
            $1.style.height = (h - 76 - 32) + 'px'; // 64 - below icons height; 32 - paddings
        };})(this.$eee1);
    }
    #USAGE_BEGIN#debug##
    else{
        console.log('not implemented');
    }
    #USAGE_END#debug##
};
$Contacts.prototype = Object.create($Traliva.$WidgetStateSubscriber.prototype);
$Contacts.prototype.constructor = $Contacts;
$Contacts.prototype.$processStateChanges = function(s){
    /*var cand, t1;
    if (!s){
        console.error('epic fail');
        return;
    }
    if (typeof s.phone === 'object'){
    }
    else if (s.phone !== this.currentPhone){
        if (typeof s.phone !== 'string')
            console.log('epic fail');
        if (s.phone){
            t1 = '';
            if (s.phone[0] === '+' && s.phone.length === 12)
                t1 = '+' + s.phone[1] + ' ' + '(' + s.phone.substr(2,3) + ') ' + s.phone.substr(5,3) + '-' + s.phone.substr(8,2) + '-' + s.phone.substr(10,2);
            else
                t1 = s.phone;
            cand = '<div class="traliva_kit__contacts__item traliva_kit__contacts__phone"><h4>Телефон:</h4> <span>' + t1 + '</span><br/><div>';
            cand += '<a href="tel:' + s.phone + '">Позвонить</a>'; // мобильная версия
            t1 = {};
            cand += '<div traliva="eBnOrder">Заказать звонок</div>';
            cand += '</div></div>';
            cand = Traliva.createElement(cand, t1);
            this.wCallbackForm.setContent(cand);
        }
        else
            cand = Traliva.createElement('');
        //cand = Traliva.createElement(s.phone ? ('<div class="traliva_kit__contacts__item traliva_kit__contacts__phone"><h4>Телефон:</h4>' + s.phone + '</div>') : '');
        //this.eContent.replaceChild(cand, this.ePhone);
        //this.ePhone = cand;

        this.currentPhone = s.phone;
    }
    //phone
    //address (info)
    //address (map)
    */
    if (!s){
        console.error('epic fail');
        return;
    }
};
//$Contacts.$widgetsFields = [];
