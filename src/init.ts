import {Terminal} from './Terminal';
import {TerminalCSSSelector} from "./TerminalCSSSelector";

(() => {
    let terminal: Terminal;
    terminal = new Terminal({ title: 'Hello world!' });
    console.log(terminal);
    document.appendChild(terminal.getElement());
})();