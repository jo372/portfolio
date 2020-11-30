"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TerminalHeader = void 0;
const BaseElement_1 = require("./BaseElement");
const TerminalCSSSelector_1 = require("./TerminalCSSSelector");
class TerminalHeader extends BaseElement_1.BaseElement {
    constructor(config) {
        super();
        this.setProperty('title', (config === null || config === void 0 ? void 0 : config.title) || '');
        this.setProperty('canClose', (config === null || config === void 0 ? void 0 : config.canClose) || false);
        this.setProperty('canMaximize', (config === null || config === void 0 ? void 0 : config.canMaximize) || false);
        this.setProperty('canMinimize', (config === null || config === void 0 ? void 0 : config.canMinimize) || false);
        //this.setProperty('title', config?.title);
        this.addClass(TerminalCSSSelector_1.TerminalCSSSelector.TERMINAL_HEADER);
    }
}
exports.TerminalHeader = TerminalHeader;
