import {BaseElement} from "./BaseElement";
import {TerminalCSSSelector} from "./TerminalCSSSelector";

export interface TerminalHeaderConfig {
    title?: string;
    canClose?: boolean;
    canMaximize?: boolean;
    canMinimize?: boolean;
}

export class TerminalHeader extends BaseElement {
    constructor(config?: TerminalHeaderConfig) {
        super();

        this.setProperty('title', config?.title || '');
        this.setProperty('canClose', config?.canClose || false);
        this.setProperty('canMaximize', config?.canMaximize || false);
        this.setProperty('canMinimize', config?.canMinimize || false);

        //this.setProperty('title', config?.title);
        this.addClass(TerminalCSSSelector.TERMINAL_HEADER);
    }
}
