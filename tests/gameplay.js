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
//wBnCreate.setContent(undefined, '#0ff');
//wBnApplyState.setContent(undefined, '#00f');
wH3.setContent(undefined, '#f0f');
wState.setContent(undefined, '#fa0');

var state = {
};
var publisher = new Traliva.StatePublisher();
publisher.setState(state);
publisher.registerSubscriber(new TralivaKit.Button(wBnCreate, {title: 'Создать'}));
publisher.registerSubscriber(new TralivaKit.Button(wBnApplyState, {title: 'Применить'}));
//publisher.registerSubscriber();
//publisher.registerSubscriber();
//publisher.registerSubscriber();
//publisher.registerSubscriber();
//publisher.registerSubscriber();
