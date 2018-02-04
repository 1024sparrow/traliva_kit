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
    echo -n "Введите название компонента (имя класса): "
    read name
    file_name=`echo $name | sed -e 's/\([A-Z]\)/_\L\1/g' -e 's/^_//'` # snake_case to camel_case.

    echo >> js/template/links
    echo "{%% $file_name.js %%}" >> js/template/links
    echo "p_namespace.$name = $name;" >> js/template/links

    node -e "var a = JSON.parse(fs.readFileSync('js/__meta__', 'utf8'));a.files[0].source.list.push('$file_name.js');fs.writeFileSync('js/__meta__', JSON.stringify(a, undefined, 4));"
    node -e "var a = JSON.parse(fs.readFileSync('css/__meta__', 'utf8'));a.files[0].source.list.push('$file_name.css');fs.writeFileSync('js/__meta__', JSON.stringify(a, undefined, 4));"
    touch css/$file_name.css

    echo "registerHelp('$name', {" > js/$file_name.js
    echo "    title: 'краткого описания нет'," >> js/$file_name.js
    echo "    //descr: ''," >> js/$file_name.js
    echo "    //options:{}," >> js/$file_name.js
    echo "    //stateObj:{}" >> js/$file_name.js
    echo "});" >> js/$file_name.js
    echo "function $name(p_wContainer, p_options){" >> js/$file_name.js
    echo "    Traliva.WidgetStateSubscriber.call(this, p_wContainer, p_options);" >> js/$file_name.js
    echo "    // ..." >> js/$file_name.js
    echo "}" >> js/$file_name.js
    echo "$name.prototype = Object.create(Traliva.WidgetStateSubscriber.prototype);" >> js/$file_name.js
    echo "$name.prototype.constructor = $name;" >> js/$file_name.js
    echo "$name.prototype.processStateChanges = function(s){" >> js/$file_name.js
    echo "    if (!s)" >> js/$file_name.js
    echo "        console.error('epic fail');" >> js/$file_name.js
    echo "    // ..." >> js/$file_name.js
    echo "}" >> js/$file_name.js
}

list(){
    list=`cat js/template/links | grep "{%%" | sed -s 's/{%% //g' | sed -s 's/.js %%}'//g`
    for i in $list;do echo $i | sed -e 's/_\([a-z]\)/\U\1/g' -e 's/^\([a-z]\)/\U\1/g';done # camel_case to snake_case used.
}

remove(){
    echo not implemented
    PS3="Выберите компонент, который хотите удалить:"
    list=cat js/template/links | grep "{%%" | sed -s 's/{%% //g' | sed -s 's/.js %%}'//g | sed -e 's/_\([a-z]\)/\U\1/g' -e 's/^\([a-z]\)/\U\1/g'
    echo ${list[@]}
    select opt in $list "я передумал - ничего удалять не надо"; do
        case "$REPLY" in
            #$(( ${#list[@]}+1 )) ) echo "Goodbye!"; break;;
            $(( ${#list[@]}+1 )) ) echo "Goodbye!"; break;;
            *) echo "Некорректная опция. Попробуйте ещё раз." ;;
        esac
    done
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
