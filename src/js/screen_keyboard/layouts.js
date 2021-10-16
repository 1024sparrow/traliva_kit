{
        $classic: [
            // в порядке убывания соотношения сторон width/height
            // при отрисовке прижимаем к нижнему краю, background не выставляем
            {
                $orient: '$v',
                $layouts: ['$en','$ru'],
                $width: 541,
                $height: 143
            },
            {
                $orient: '$v',
                $layouts: ['$en', '$ru'],
                $width: 159,
                $height: 143
            }
        ],
        $phone: [
            {
                $orient: '$v',
                $layouts: ['$ru'],
                $width: 331,
                $height: 241,
                // а также могут быть переопределения клавиш
                $buttons:{
                    $width: 3,
                    $height: 4,
                    $rows: [
                        {
                            $height: 1,
                            $buttons:[
                                {
                                    $id: 'BN-1',
                                    $width: 1
                                },
                                {
                                    $id: 'BN-2',
                                    $width: 1
                                },
                                {
                                    $id: 'BN-3',
                                    $width: 1
                                }
                            ]
                        },
                        {
                            $height: 1,
                            $buttons:[
                                {
                                    $id: 'BN-4',
                                    $width: 1
                                },
                                {
                                    $id: 'BN-5',
                                    $width: 1
                                },
                                {
                                    $id: 'BN-6',
                                    $width: 1
                                }
                            ]
                        },
                        {
                            $height: 1,
                            $buttons:[
                                {
                                    $id: 'BN-7',
                                    $width: 1
                                },
                                {
                                    $id: 'BN-8',
                                    $width: 1
                                },
                                {
                                    $id: 'BN-9',
                                    $width: 1
                                }
                            ]
                        },
                        {
                            $height: 1,
                            $buttons:[
                                {
                                    $id: 'BN-CLEAR',
                                    $width: 1
                                },
                                {
                                    $id: 'BN-0',
                                    $width: 1
                                },
                                {
                                    $id: 'BN-ENTER',
                                    $width: 1
                                }
                            ]
                        }
                    ]
                }
            }
        ]
}
/* Process:
1.) Description of buttons positioning. Builds (internal intermediate project file) skeleton-sprite (spriteId + '-skeleton'). spriteId in case of above: classic and phone
2.) Copy skeleton sprite without '-skeleton' and draw buttons
*/

/* In state object 
*/
