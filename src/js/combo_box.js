registerHelp('ComboBox', {
    title: 'выпадающий список',
    //descr: '',
    options:{
        variants: 'список вариантов. Если задано, то это фиксированный список вариантов, и из объекта состояния набор вариантов мониториться не будет'
    },
    stateObj:{
        variants: 'список вариантов. Каждый должен быть представлен объектом с полями id и title',
        current: 'id текущего элемента'
    }
});
function ComboBox(p_wContainer, p_options){
    var i, t, tt;
    Traliva.WidgetStateSubscriber.call(this, p_wContainer, p_options);
    p_wContainer.setContent(Traliva.createElement('<select traliva="e"></select>', this));
    if (p_options.hasOwnProperty('variants')){
        for (i = 0 ; i < p_options.variants.length ; i++){
            t = document.createElement('option');
            t.value = p_options.variants[i].id;
            tt = document.createTextNode(p_options.variants[i].title);
            t.appendChild(tt);
            this.e.appendChild(t);
        }
    }
    p_wContainer._onResized = (function(e){return function(w, h){
        e.style.width = w + 'px';
        e.style.height = h + 'px';
    };})(this.e);
    this.e.value = '-1';
}
ComboBox.prototype = Object.create(Traliva.WidgetStateSubscriber.prototype);
ComboBox.prototype.constructor = ComboBox;
ComboBox.prototype.processStateChanges = function(s){
    if (!s)
        console.error('epic fail');
    // ...
}
