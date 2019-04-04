#USAGE_BEGIN#traliva_kit_debug##
registerHelp('$Contacts', {
    title: 'Виджет отображения контактов организации',
    //descr: '',
    options:{
        target: 'enum TralivaKit__Contacts__Target: mobile_h, mobile_v, desktop.',
        dataVarName: 'по умолчанию \'data\'',
        currentTabVarName: 'имя переменной, в которой хранится идентификатор текущей вкладки. По умолчанию, \'currentTab\'.'
    },
    stateObj:{
        //phone: 'контактный номер телефона. Строка вида \'+71234567890\'. При отображении этот номер будет приведён к форме \'+7 (123) 456-78-90\'.',
        //address: 'объект с адресом',
        currentTab: 'идентификатор текущей вкладки',

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
    this.$dataVarName = $p_options.$dataVarName || '$data';
    this.$curTabVarName = $p_options.$currentTabVarName || '$currentTab';
    this.$prevVal = {};
    this.$idSeq = [
        '$phone',
        '$address',
        '$requisites',
        '$social'
    ];
    //this.$currentTab;

    this.$eTileContainer;
    this.$tiles = {};
    this.$icons = {};
    this.$target = $p_options.$target || '$mobile';
    this.$tabsPosition = $p_options.$tabsPosition || '$top';
    //this.$eBns
    //this.$eTabs,
    var $fOnBnClicked, $0, $1;

    var $content;
    if (this.$target === '$mobile'){
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
        this.$widgets = {
            $phone:{
                $bn: this.$eBnPhone,
                $tab: this.$eTabPhone
            },
            $address:{
                $bn: this.$eBnAddress,
                $tab: this.$eTabAddress
            },
            $requisites:{
                $bn: this.$eBnRequisites,
                $tab: this.$eTabRequisites
            },
            $social:{
                $bn: this.$eBnSocial,
                $tab: this.$eTabSocial
            }
        };
        $fOnBnClicked = this.$fOnBnClicked();
        for ($1 in this.$widgets){
            $0 = this.$widgets[$1].$bn;
            $0.addEventListener('click', $fOnBnClicked);
        }
        $p_wContainer.$_onResized = (function($1){return function($w, $h){
            var $2,
                $3 = '' + ($h - 76 - 34) + 'px',
                $4 = '' + ($w - 34) + 'px'
            ;
            for ($2 in $1){
                $1[$2].$tab.style.height = $3;
                $1[$2].$tab.style.width = $4;
            }
        };})(this.$widgets);
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
    var $changed = false,
        $0 = s[this.$dataVarName] || {},
        $1, $2
    ;
    // Добавление-убирание вкладок
    for ($1 = 0 ; $1 < this.$idSeq.length ; ++$1){
        $2 = this.$idSeq[$1];
        if (!this.$prevVal[$2] !== !$0[$2])
            this.$_correctTabExisten($2, $0[$2]);
    }
    /*if (!this.$phone !== !$0.$phone)
        this.$_correctTabExisten('$phone', $0.$phone);
    else if (!this.$address !== !$0.$address)
        this.$_correctTabExisten('$address', $0.$address);
    else if (!this.$requisites !== !$0.$requisites)
        this.$_correctTabExisten('$requisites', $0.$requisites);
    else if (!this.$social !== !$0.$social)
        this.$_correctTabExisten('$social', $0.$social);*/
    // Обновление данных
    if ($0.$phone){
    }
    if ($0.$address){
    }
    if ($0.$requisites){
    }
    if ($0.$social){
    }
    $0 = s[this.$curTabVarName] || '';
    if ($0 && !this.prevVal[$0]){
        #USAGE_BEGIN#debug##
        console.log('incorrect current tab identifier');
        #USAGE_END#debug##
        $0 = s[this.$curTabVarName] = '';
    }
    if (this.$currentTab !== $0){
        this.$fOnBnClicked()($0);
        this.$currentTab = $0;
    }
};
//$Contacts.$widgetsFields = [];
// p_ifExisten - или undefined, или соответвующее значение (новое)
$Contacts.prototype.$_correctTabExisten = function($p_tabId, $p_ifExisten){
    if ($p_ifExisten){
        if (!this.$prevVal.hasOwnProperty($p_tabId)){
            this.$prevVal[$p_tabId] = JSON.parse(JSON.stringify($p_ifExisten));
        }
    }
    else{
        if (this.$prevVal.hasOwnProperty($p_tabId)){
            delete this.$prevVal[$p_tabId];
        }
    }
};
$Contacts.prototype.$_switchTo = function($p_tab){
};
$Contacts.prototype.$fOnBnClicked = function(){
    var $widgets = this.$widgets,
        $self = this;
    return function($p_id){
        var $0, $1, $2, $3,
            $4 = typeof $p_id === 'string',
            $type;
        if ($4)
            $type = $p_id;
        else{
            $3 = this.attributes;
            for2: for ($2 = 0 ; $2 < $3.length ; ++$2){
                if ($3[$2].nodeName === 'm_type'){
                    $type = $3[$2].nodeValue;
                    break for2;
                }
            }
        }

        for ($1 in $widgets){
            $0 = $widgets[$1];
            if ($1 === $type){
                $0.$bn.style.top = '20px';
                $0.$tab.style.display = 'block';
            }
            else{
                $0.$bn.style.top = '0';
                $0.$tab.style.display = 'none';
            }
        }
        if (!$4){
            $self.$_state[$self.$curTabVarName] = $type;
            $self.$_registerStateChanges();
        }
    };
};
