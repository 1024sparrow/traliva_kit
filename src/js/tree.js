registerHelp('Tree', {
    title: 'Дерево. Многоколоночное. С функцией мониторинга состояния (иконка и текст могут меняться). Поддерживается ленивая подгрузка узлов.',
    //descr: '',
    options:{
        selectable: 'boolean. можно ли выбирать элементы(в каждый момент времени может быть выбран только один элемент). По умолчанию - да.',
        get_children: 'function. На вход id родителя (или undefined для корневых элементов). На выход - список дочерних элементов (см. help(\'Tree\', \'item\')). Если задано, get_children_url игнорируется и ленивая подгрузка не используется.',
        get_children_url: 'function. На вход id родителя (или undefined для корневых элементов). На выход - URL, с которого грузить дочерние элементы (см. help(\'Tree\', \'item\')'
    },
    //stateObj:{},
    children:{
        item:{
            'title': 'Формат описания элемента дерева',
            options:{
                id: 'string. Уникальный идентификатор элемента дерева.',
                d: 'array. Массив, в котором задано содержимое ячеек. Для первой колонки задаётся содержимое без учёта иконки "состояния" элемента. См. help(\'Tree\', \'item\', \'content\')',
                hasChildren: 'boolean. Имеет ли этот элемент дочерние элементы, т.е. есть ли смысл запрашивать для этого элемента дочерние элементы',
                state: 'integer. Идентификатор (порядковый номер (от нуля)) "состояния" элемента - какой значок показывать'
            },
            children:{
                content:{
                    title: 'Формат описания содержимого ячейки',
                    options:{
                        e: 'текст'
                    }
                }
            }
        }
    }
});
function Tree(p_wContainer, p_options){
    Traliva.WidgetStateSubscriber.call(this, p_wContainer, p_options);
    // ...
}
Tree.prototype = Object.create(Traliva.WidgetStateSubscriber.prototype);
Tree.prototype.constructor = Tree;
Tree.prototype.processStateChanges = function(s){
    if (!s)
        console.error('epic fail');
    // ...
}
