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
        $tabsPosition = $p_options.$tabsPosition || '$top',
        $fOnBnClicked, $eBns, $eTabs,
        $0, $1
    ;

    var $content;
    if ($target === '$mobile'){
        $content = $Traliva.$createElement(`
        <div style="width:100%;">
            <div traliva="$eBnPhone" m_type="$phone" class="$card_icon_mobile" style="background:url(phone_64.png) #ffa;"></div>
            <div traliva="$eBnAddress" m_type="$address" class="$card_icon_mobile" style="background:url(map_64.png) #ffa;top:20px;"></div>
            <div traliva="$eBnRequisites" m_type="$requisites" class="$card_icon_mobile" style="background:url(requisites_64.png) #ffa;"></div>
            <div traliva="$eBnSocial" m_type="$social" class="$card_icon_mobile" style="background:url(social_64.png) #ffa;"></div>
        </div>
        <div style="position:relative">
            <div traliva="$eTabPhone" class="$traliva_kit__contacts__tab">
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
            <div traliva="$eTabAddress" class="$traliva_kit__contacts__tab">
                <p>Вкладка с адресом</p>
            </div>
            <div traliva="$eTabRequisites" class="$traliva_kit__contacts__tab">
                <p>Вкладка с банковскими реквизитами</p>
            </div>
            <div traliva="$eTabSocial" class="$traliva_kit__contacts__tab">
                <p>Вкладка с соц.сетями</p>
            </div>
        </div>

            `, this, '$traliva_kit__contacts');
        $p_wContainer.$setContent($content);
        $eBns = [this.$eBnPhone, this.$eBnAddress, this.$eBnRequisites, this.$eBnSocial];
        $eTabs = [this.$eTabPhone, this.$eTabAddress, this.$eTabRequisites, this.$eTabSocial];
        $fOnBnClicked = (function($eBns){ return function(){
            var $0, $1, $2, $3, $4, $type;
            $3 = this.attributes;
            for2: for ($2 = 0 ; $2 < $3.length ; ++$2){
                if ($3[$2].nodeName === 'm_type'){
                    $type = $3[$2].nodeValue;
                    break for2;
                }
            }
            for ($1 = 0 ; $1 < $eBns.length ; ++$1){
                $0 = $eBns[$1];
                $3 = $0.attributes;
                for2: for ($2 = 0 ; $2 < $3.length ; ++$2){
                    if ($3[$2].nodeName === 'm_type'){
                        $4 = $3[$2].nodeValue;
                        break for2;
                    }
                }
                if ($4 === $type){
                    $0.style.top = '20px';
                }
                else{
                    $0.style.top = '0';
                }
            }
        };})($eBns);
        for ($1 = 0 ; $1 < $eBns.length ; ++$1){
            $0 = $eBns[$1];
            $0.addEventListener('click', $fOnBnClicked);
        }
        $p_wContainer.$_onResized = (function($1){return function($w, $h){
            var $2,
                $3 = '' + ($h - 76 - 34) + 'px',
                $4 = '' + ($w - 34) + 'px'
            ;
            for ($2 = 0 ; $2 < $1.length ; ++$2){
                $1[$2].style.height = $3;
                $1[$2].style.width = $4;
            }
        };})($eTabs);
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
