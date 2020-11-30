"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Terminal_1 = require("./Terminal");
(() => {
    let terminal;
    terminal = new Terminal_1.Terminal({ title: 'Hello world!' });
    console.log(terminal);
    document.appendChild(terminal.getElement());
})();
