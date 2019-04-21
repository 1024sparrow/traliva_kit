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
                {
                    $_widget:{
                        $type: $TralivaKit.$StaticHtml,
                        $html:`
<div style="margin:10px">
<h2>По какому номеру вам позвонить?</h2>
<p>Наш специалист свяжется с вами в ближайшее время с 8:00 до 20:00</p>
</div>
                        `
                    }
                },
                {
                    $_widget:{
                        $type: $TralivaKit.$LineEdit,
                        $placeholder: 'На какой номер перезвонить',
                        $textVarName: '$phoneNumber'
                    }
                },
                {
                    $_widget:{
                        $type: $TralivaKit.$Button,
                        $title: 'Заказать звонок'
                    }
                }
            ]
        }},
        //{$_widget:{
        //}}
    ]

}
