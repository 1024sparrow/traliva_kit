#!/bin/bash

help(){
    echo "Утилита для управления компонентами в составе проекта TralivaKit"
    echo "================================================================"
    echo "Доступные команды:"
    echo "  list - вывести список компонентов."
    echo "  add - добавить компонент. Будет запрошено название для будущего компонента, и будет сгенерирована заготовка для его реализации (в отдельных файлах .js и .css, созданных специально под новый компонент)."
    echo "  remove - удалить компонент из библиотеки компонентов. Будьте осторожны - вернуть будет невозможно."
    echo "  rename - переименовать компонент, который уже есть в библиотеке компонентов."
    echo;echo "передавать параметры командам не нужно - утилита сама будет спрашивать"
    echo
}

add(){
    #echo add
    echo -n "Введите название компонента (как будете вызывать): "
    read name
    echo -n "Введите название файла компонента (как будет сохранён код реализации внутри исходного кода TralivaKit): "
    read file_name
    echo "-- $name --- $file_name"
    //
}

list(){
    list=`cat js/template | grep "{%%" | sed -s 's/{%% //g' | sed -s 's/.js %%}'//g`
    for i in $list;do echo $i;done
    #echo $list
}

remove(){
    echo not implemented
}

rename(){
    echo not implemented
}

case "$1" in
    help)
        help
        ;;
    add)
        add
        ;;
    list)
        list
        ;;
    remove)
        remove
        ;;
    rename)
        rename
        ;;
    *)
        echo "incorrect parameter given. Usage: {help|add|list|remove|rename}" >&2
        exit 1
        ;;
esac
exit 0
