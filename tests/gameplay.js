function Logics(p_wWidget){
    Traliva.StateSubscriber.call(this);
    this._wWidget = p_wWidget;
}
Logics.prototype = Object.create(Traliva.StateSubscriber.prototype);
Logics.prototype.constructor = Logics;
Logics.prototype.processStateChanges = function(s){
    if (s.bnCreate){
        if (s.selectComponent.current != -1){
            var state = JSON.parse(s.teState);
            this._oWidget = new TralivaKit[s.selectComponent.current](this._wWidget, JSON.parse(s.teOptions));
            this._oWidget._state = state;
            this._oWidget.processStateChanges(state);
        }

        s.bnCreate = false;
        this._registerStateChanges();
    }
}

var wRoot = new Traliva.Strip(Traliva.Strip__Orient__hor);

var wH1 = new Traliva.Strip(Traliva.Strip__Orient__vert, wRoot);
    var wSelectComponent = new Traliva.Widget(wH1);
    wH1.addItem(wSelectComponent, '48px');
    var wOptions = new Traliva.Widget(wH1);
    wH1.addItem(wOptions);
wRoot.addItem(wH1);

var wH2 = new Traliva.Strip(Traliva.Strip__Orient__vert, wRoot);
    var wButtons = new Traliva.Strip(Traliva.Strip__Orient__hor, wH2);
        var wBnCreate = new Traliva.Widget(wButtons);
        wButtons.addItem(wBnCreate);
        var wBnApplyState = new Traliva.Widget(wButtons);
        wButtons.addItem(wBnApplyState);
    wH2.addItem(wButtons, '48px');
    var wState = new Traliva.Widget(wH2);
    wH2.addItem(wState);
wRoot.addItem(wH2);

var wH3 = new Traliva.Widget(wRoot);
wRoot.addItem(wH3);

//var 
wSelectComponent.setContent(undefined, '#f00');
wOptions.setContent(undefined, '#ff0');
//wBnCreate.setContent(undefined, '#0ff');#
//wBnApplyState.setContent(undefined, '#00f');#
wH3.setContent(undefined, '#f0f');
//wState.setContent(undefined, '#fa0');

var state = {
    bnCreate: false,
    bnApply: false,
    selectComponent:{
        variants:[
            {
                id: 'Label',
                title: 'Label'
            },
            {
                id: 'Button',
                title: 'Button'
            },
            {
                id: 'LineEdit',
                title: 'LineEdit'
            },
        ],
        variants_changed: true,
        current: -1
    },
    teOptions:'{}',
    teState:'{}'
};
var publisher = new Traliva.StatePublisher();
publisher.setState(state);
publisher.registerSubscriber(new TralivaKit.Button(wBnCreate, {
    title: 'Создать',
    activeVarName: 'bnCreate'
}));
publisher.registerSubscriber(new TralivaKit.Button(wBnApplyState, {
    title: 'Применить',
    activeVarName: 'bnApply'
}));
publisher.registerSubscriber(new TralivaKit.TextEdit(wOptions, {
    bg: '#444',
    color: '#fff',
    textVarName: 'teOptions'
}));
publisher.registerSubscriber(new TralivaKit.TextEdit(wState, {
    bg: '#048',
    color: '#fff',
    textVarName: 'teState'
}));
publisher.registerSubscriber(new TralivaKit.ComboBox(wSelectComponent, {}).useSubstate('selectComponent'));
publisher.registerSubscriber(new Logics(wH3));
