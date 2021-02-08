/** creating an enum which will be Object.frozen later. */
let LoadingScreenState = {
    "ERROR": 0,
    "IDLE": 1,
    "LOADING": 2,
    "LOADED": 3
}

/** creating the loading screen object */
class LoadingScreen {
    constructor() {
        this.state = LoadingScreenState.IDLE;
        this.node = document.createElement('div');
        this.addClass('loadingScreen');
    }
    getNode() {
        return this.node;
    }
    getState() {
        return this.state;
    }
    setState(state) {
        this.state = state;
    }
    hasState(state) {
        return this.getState() == state;
    }
    appendNode(node) {
        this.getNode().appendChild(node);
    }
    appendNodes(...nodes) {
        nodes.forEach(node => this.appendNode(node));
    }
    getClassList() { 
        return this.getNode().classList; 
    }
    addClass(className) {
        this.getClassList().add(className);
    }
    addClasses(...classes) {
        classes.forEach(className => this.addClass(className));
    }
    removeClass(className) {
        this.getClassList().remove(className);
    }
    removeClasses(...classes) {
        classes.forEach(className => this.removeClass(className));
    }
    containsClass(className) {
        return this.getClassList().contains(className);
    }
    show() {
        if(this.containsClass('hidden')) {
            this.removeClass('hidden');
        }
        this.addClass('show');
    }
    hide() {
        if(this.containsClass('show')) {
            this.removeClass('show');
        }
        this.addClass('hidden');
    }
}

Object.freeze(LoadingScreenState, LoadingScreen);