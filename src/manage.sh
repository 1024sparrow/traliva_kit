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

    echo "$name $file_name.js" >> js/template/src/list

    echo >> css/t
    echo "#USAGE_BEGIN#TralivaKit__$name##" >> css/t
    echo "{%% $file_name.css %%}" >> css/t
    echo "#USAGE_END#TralivaKit__$name##" >> css/t

    node -e "var a = JSON.parse(fs.readFileSync('js/__meta__', 'utf8'));a.files[0].source.list.push('$file_name.js');fs.writeFileSync('js/__meta__', JSON.stringify(a, undefined, 4));"
    node -e "var a = JSON.parse(fs.readFileSync('css/__meta__', 'utf8'));a.files[0].source.list.push('$file_name.css');fs.writeFileSync('css/__meta__', JSON.stringify(a, undefined, 4));"
    touch css/$file_name.css

    echo "#USAGE_BEGIN#traliva_kit_debug##" > js/$file_name.js
    echo "registerHelp('\$$name', {" >> js/$file_name.js
    echo "    title: 'краткого описания нет'," >> js/$file_name.js
    echo "    //descr: ''," >> js/$file_name.js
    echo "    //options:{}," >> js/$file_name.js
    echo "    //stateObj:{}" >> js/$file_name.js
    echo "});" >> js/$file_name.js
    echo "#USAGE_END#traliva_kit_debug##" >> js/$file_name.js
    #echo "#USAGE_BEGIN#Traliva.$name##" >> js/$file_name.js
    echo "function \$$name(\$p_wContainer, \$p_options, \$p_widgets){" >> js/$file_name.js
    echo "    \$Traliva.\$WidgetStateSubscriber.call(this, \$p_wContainer, \$p_options, \$p_widgets);" >> js/$file_name.js
    echo "    // ..." >> js/$file_name.js
    echo "};" >> js/$file_name.js
    echo "\$$name.prototype = Object.create(\$Traliva.\$WidgetStateSubscriber.prototype);" >> js/$file_name.js
    echo "\$$name.prototype.constructor = \$$name;" >> js/$file_name.js
    echo "\$$name.prototype.\$processStateChanges = function(s){" >> js/$file_name.js
    echo "    if (!s){" >> js/$file_name.js
    echo "        console.error('epic fail');" >> js/$file_name.js
    echo "        return;" >> js/$file_name.js
    echo "    }" >> js/$file_name.js
    echo "    // ..." >> js/$file_name.js
    echo "};" >> js/$file_name.js
    echo "//\$$name.\$widgetsFields = [];" >> js/$file_name.js
    #echo "#USAGE_END#Traliva.$name##" >> js/$file_name.js
}

list(){
    #list=`cat js/template/links | grep "{%%" | sed -s 's/{%% //g' | sed -s 's/.js %%}'//g`
    #for i in $list;do echo $i | sed -e 's/_\([a-z]\)/\U\1/g' -e 's/^\([a-z]\)/\U\1/g';done # camel_case to snake_case used.

    a=0
    for i in `cat js/template/src/list`
    do
        if [[ $a -eq 0 ]]
        then
            echo -n "$i"
        else
            #echo " ($i)" # вывод имён файлов загромождает - не наглядный список получается. А имена файлов и так очевидные.
            echo
        fi
        a=$[ ! a ]
    done
}

remove_class(){
    if [ -z $1 ];then return 1;fi
    name=$1
    #file_name=`echo $name | sed -e 's/\([A-Z]\)/_\L\1/g' -e 's/^_//'` # snake_case to camel_case.
    rm js/$2.js css/$2.css
    # удаляем из js/template/src/list
    cat js/template/src/list | tr '\n' '\r' | sed "s/\r$1 $2.js//" | tr '\r' '\n' > js/template/src/list.tmp
    mv js/template/src/list.tmp js/template/src/list
    # удаляем из css/t
    cat css/t | tr '\n' '\r' | sed "s/\r\r#USAGE_BEGIN#TralivaKit__$1##\r{%% $2.css %%}\r#USAGE_END#TralivaKit__$1##//" | tr '\r' '\n' > css/t.tmp
    mv css/t.tmp css/t
    # удаляем из js/__meta__
    node -e " var i, a = JSON.parse(fs.readFileSync('js/__meta__', 'utf8')), list = a.files[0].source.list; for (i = 0 ; i < list.length ; i++){ if (list[i] === '$2.js'){ list.splice(i, 1); break; } } fs.writeFileSync('js/__meta__', JSON.stringify(a, undefined, 4)); "
    # удаляем из css/__meta__
    node -e " var i, a = JSON.parse(fs.readFileSync('css/__meta__', 'utf8')), list = a.files[0].source.list; for (i = 0 ; i < list.length ; i++){ if (list[i] === '$2.css'){ list.splice(i, 1); break; } } fs.writeFileSync('css/__meta__', JSON.stringify(a, undefined, 4)); "
    echo Класс $1 успешно удалён
}

remove(){
    #https://askubuntu.com/questions/1705/how-can-i-create-a-select-menu-in-a-shell-script#1716
    PS3="Выберите компонент, который хотите удалить:"
    list=''
    declare -a list_a # classnames
    declare -a list_b # filenames (without extention)
    #list=`cat js/template/links | grep "{%%" | sed -s 's/{%% //g' | sed -s 's/.js %%}'//g | sed -e 's/_\([a-z]\)/\U\1/g' -e 's/^\([a-z]\)/\U\1/g'`

    a=0
    counter=0
    for i in `cat js/template/src/list`
    do
        if [[ $a -eq 0 ]]
        then
            list_a[$counter]=$i
            list="${list} ${i}"
        else
            list_b[$counter]=${i/.js/}
            let "counter = $counter + 1"
        fi
        a=$[ ! a ]
    done
    
    #counter=0
    #for i in $list;do list_a[$counter]=$i;let "counter = $counter + 1";done
    #echo ${list[@]}
    select opt in $list "я передумал - ничего удалять не надо"; do
        case "$REPLY" in
            #$(( ${#list[@]}+1 )) ) echo "Goodbye!"; break;;
            $(( ${#list_a[@]}+1 )) ) echo "Ничего не удалено";break;;
            #*) echo not implemented # boris here
            *) remove_class ${list_a[$REPLY - 1]} ${list_b[$REPLY - 1]} && break;;
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
