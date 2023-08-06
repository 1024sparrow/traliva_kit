{
    $type: $TralivaKit.$Stack,
    $items:[
        {$_widget:{
            $type: $TralivaKit.$Strip,
            $orient: #e#$TralivaKit__Strip__orient:v##,
            $bg: '#fff',
            $items:[
                {
                    $_widget:{
                        $id: '$wValidTimeNote',
                        $type: $TralivaKit.$Label,
                        $text: 'Наш специалист свяжется с вами в ближайшее время с 8:00 до 20:00.'
                    },
                    $size: '80px'
                },
                {
                    $_widget:{
                        $type: $TralivaKit.$LineEdit,
                        $placeholder: 'На какой номер перезвонить',
                        $textVarName: '$phoneNumber',
                        $datatype: 'tel'
                    },
                    $size: '64px'
                },
                {
                    $_widget:{
                        $id: '$callbackButton',
                        $type: $TralivaKit.$Button,
                        $title: 'Заказать звонок',
                        $activeVarName: '$clicked'
                    },
                    $size: '86px'
                },
                {
                    $_widget:{
                        $type: $TralivaKit.$StaticHtml,
                        $htmlVarName: '$error',
                        //$_visibleSubstate: '$error'
                    },
                    //$size: '80px'
                }
            ]
        }},
    ]

}
