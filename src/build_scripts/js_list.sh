#!/bin/bash

#echo js_list
#echo "\$1 - $1"
#echo "\$2 - $2"

a=0
cand='#USAGE#traliva_kit_debug'
first=1
for i in `cat $1`
do
    if [[ $a -eq 0 ]]
    then
        classname=$i
        #echo "classname: $classname"
    else
        filename=$i
        #echo "filename: $filename"
        #echo "==================="
        if [[ $first -eq 1 ]]
        then
            cand="${cand}:"
            first=0
        else
            cand="${cand},"
        fi
        cand="${cand}TralivaKit__${classname}"
    fi
    a=$[ ! a ]
done
cand="${cand}##"

echo -e "$cand" > $1

#echo "%%%%%%%%%%%%%%%%%%%%%%%%%%%%%"
#echo -e "$cand"
#echo "============================="

#  in:
#  Label label.js
#  Button button.js
#  LineEdit line_edit.js
#  FileSelect file_select.js
#  SimpleList simple_list.js
#  TreeList tree_list.js
#  TextEdit text_edit.js
#  ComboBox combo_box.js
#  LargeText large_text.js
#  StaticHtml static_html.js
#  Catalogue catalogue.js
#  CatalogueBrezentItem catalogue_brezent_item.js
#  Strip strip.js
#  Stack stack.js
#  RollIn roll_in.js
#  90223NavBar 90223_nav_bar.js
#  Bedsheet bedsheet.js
#  Contacts contacts.js
#  
#  out:
#  #USAGE#traliva_kit_debug:TralivaKit__Label,TralivaKit__Button,TralivaKit__LineEdit,TralivaKit__FileSelect,TralivaKit__SimpleList,TralivaKit__TreeList,TralivaKit__TextEdit,TralivaKit__ComboBox,TralivaKit__LargeText,TralivaKit__StaticHtml,TralivaKit__Catalogue,TralivaKit__CatalogueBrezentItem,TralivaKit__Strip,TralivaKit__Stack,TralivaKit__RollIn,TralivaKit__90223NavBar,TralivaKit__Bedsheet,TralivaKit__Contacts,traliva_kit_debug##
