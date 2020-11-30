"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Terminal = void 0;
const BaseElement_1 = require("./BaseElement");
const TerminalCSSSelector_1 = require("./TerminalCSSSelector");
const TerminalHeader_1 = require("./TerminalHeader");
class Terminal extends BaseElement_1.BaseElement {
    constructor(config) {
        super();
        this.addClass(TerminalCSSSelector_1.TerminalCSSSelector.TERMINAL);
        this.setProperty('header', new TerminalHeader_1.TerminalHeader(config));
        this.appendNode(this.getProperty('header').getElement());
    }
}
exports.Terminal = Terminal;
