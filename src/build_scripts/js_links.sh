#!/bin/bash

#echo js_links
#echo "\$0 - $0"
#echo "\$1 - $1"
#echo "\$2 - $2"

#echo '----------------------------'
a=0
cand='\n'
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
        cand="${cand}\n#USAGE_BEGIN#TralivaKit__${classname}##\n{%% ${filename} %%}\n\$p_namespace.\$${classname} = \$${classname}\n#USAGE_END#TralivaKit__${classname}##"
    fi
    a=$[ ! a ]
done
#echo '----------------------------'

#echo "%%%%%%%%%%%%%%%%%%%%%%%%%%%%%"
#echo -e "$cand"
#echo "============================="
echo -e "$cand" > $1

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
#  
#  
#  #USAGE_BEGIN#TralivaKit__Label##
#  {%% label.js %%}
#  $p_namespace.$Label = $Label;
#  #USAGE_END#TralivaKit__Label##
#  
#  #USAGE_BEGIN#TralivaKit__Button##
#  {%% button.js %%}
#  $p_namespace.$Button = $Button;
#  #USAGE_END#TralivaKit__Button##
#  
#  #USAGE_BEGIN#TralivaKit__LineEdit##
#  {%% line_edit.js %%}
#  $p_namespace.$LineEdit = $LineEdit;
#  #USAGE_END#TralivaKit__LineEdit##
#  
#  #USAGE_BEGIN#TralivaKit__FileSelect##
#  {%% file_select.js %%}
#  $p_namespace.$FileSelect = $FileSelect;
#  #USAGE_END#TralivaKit__FileSelect##
#  
#  #USAGE_BEGIN#TralivaKit__SimpleList##
#  {%% simple_list.js %%}
#  $p_namespace.$SimpleList = $SimpleList;
#  #USAGE_END#TralivaKit__SimpleList##
#  
#  #USAGE_BEGIN#TralivaKit__TreeList##
#  {%% tree_list.js %%}
#  $p_namespace.$TreeList = $TreeList;
#  #USAGE_END#TralivaKit__TreeList##
#  
#  #USAGE_BEGIN#TralivaKit__TextEdit##
#  {%% text_edit.js %%}
#  $p_namespace.$TextEdit = $TextEdit;
#  #USAGE_END#TralivaKit__TextEdit##
#  
#  #USAGE_BEGIN#TralivaKit__ComboBox##
#  {%% combo_box.js %%}
#  $p_namespace.$ComboBox = $ComboBox;
#  #USAGE_END#TralivaKit__ComboBox##
#  
#  #USAGE_BEGIN#TralivaKit__LargeText##
#  {%% large_text_edit.js %%}
#  $p_namespace.$LargeTextEdit = $LargeTextEdit;
#  #USAGE_END#TralivaKit__LargeText##
#  
#  #USAGE_BEGIN#TralivaKit__StaticHtml##
#  {%% static_html.js %%}
#  $p_namespace.$StaticHtml = $StaticHtml;
#  #USAGE_END#TralivaKit__StaticHtml##
#  
#  #USAGE_BEGIN#TralivaKit__Catalogue##
#  {%% catalogue.js %%}
#  $p_namespace.$Catalogue = $Catalogue;
#  #USAGE_END#TralivaKit__Catalogue##
#  
#  #USAGE_BEGIN#TralivaKit__CatalogueBrezentItem##
#  {%% catalogue_brezent_item.js %%}
#  $p_namespace.$CatalogueBrezentItem = $CatalogueBrezentItem;
#  #USAGE_END#TralivaKit__CatalogueBrezentItem##
#  
#  #USAGE_BEGIN#TralivaKit__Strip##
#  {%% strip.js %%}
#  $p_namespace.$Strip = $Strip;
#  #USAGE_END#TralivaKit__Strip##
#  
#  #USAGE_BEGIN#TralivaKit__Stack##
#  {%% stack.js %%}
#  $p_namespace.$Stack = $Stack;
#  #USAGE_END#TralivaKit__Stack##
#  
#  #USAGE_BEGIN#TralivaKit__RollIn##
#  {%% roll_in.js %%}
#  $p_namespace.$RollIn = $RollIn;
#  #USAGE_END#TralivaKit__RollIn##
#  
#  #USAGE_BEGIN#TralivaKit__90223NavBar##
#  {%% 90223_nav_bar.js %%}
#  $p_namespace.$90223NavBar = $90223NavBar;
#  #USAGE_END#TralivaKit__90223NavBar##
#  
#  #USAGE_BEGIN#TralivaKit__Bedsheet##
#  {%% bedsheet.js %%}
#  $p_namespace.$Bedsheet = $Bedsheet;
#  #USAGE_END#TralivaKit__Bedsheet##
#  
#  #USAGE_BEGIN#TralivaKit__Contacts##
#  {%% contacts.js %%}
#  $p_namespace.$Contacts = $Contacts;
#  #USAGE_END#TralivaKit__Contacts##
