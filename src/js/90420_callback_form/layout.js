{
    $type: $TralivaKit.$Stack,
    $items:[
        {$_widget:{
            $type: $TralivaKit.$Strip,
            $orient: #e#$TralivaKit__Strip__orient:v##,
            $bg: '#fff',
            $items:[
                /*{
                    $_widget:{
                        $type: $TralivaKit.$Strip,
                        $orient: #e#$TralivaKit__Strip__orient:h##,
                        $items:[
                            //'num_title',
                            {$_widget:{
                                $type: $TralivaKit.$Button,
                                $title: 'asdf'
                            }},
                            'num_lineedit'
                        ]
                    }
                },*/
                /*{
                    $_widget:{
                        $id: '$wValidTimeNote',
                        $type: $TralivaKit.$StaticHtml,
                        $html:`
<div style="margin:10px" class="$validTimeNote">
<h2>По какому номеру вам позвонить?</h2>
<p>Наш специалист свяжется с вами в ближайшее время с 8:00 до 20:00</p>
</div>
                        `
                    },
                    $size: '256px'
                },*/
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
        //{$_widget:{
        //}}
    ]

}
