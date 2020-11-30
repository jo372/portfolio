import {BaseElement} from './BaseElement';
import {TerminalCSSSelector} from "./TerminalCSSSelector";
import {TerminalHeader} from "./TerminalHeader";

export class Terminal extends BaseElement {
    constructor(config?: TerminalCSSSelector) {
        super();
        this.addClass(TerminalCSSSelector.TERMINAL);
        this.setProperty('header', new TerminalHeader(config));
        this.appendNode(this.getProperty('header').getElement());
    }
}