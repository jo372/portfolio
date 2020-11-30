"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseElement = void 0;
class BaseElement {
    constructor() {
        this.element = document.createElement('div');
        this.properties = {};
    }
    /** @returns {HTMLElement} the HTMLElement of this class. */
    getElement() { return this.element; }
    /** @param {HTMLElement[]} domNodes the DOM Nodes you want to remove from the base element. */
    appendAllNodes(...domNodes) {
        domNodes.forEach((domNode) => this.appendNode(domNode));
    }
    /** @param {HTMLElement} domNode the html DOM Node which you want to append to the base element. */
    appendNode(domNode) {
        this.getElement().appendChild(domNode);
    }
    /** @returns DOMTokenList the CSS Class List */
    getClassList() { return this.getElement().classList; }
    /** @param {string} cssSelector the CSS Selector you want to add to the base element. */
    addClass(cssSelector) { if (cssSelector) {
        this.getClassList().add(cssSelector);
    } }
    /** @param {string} cssSelector the CSS Selector you want to remove from the base element. */
    removeClass(cssSelector) {
        if (this.getClassList().contains(cssSelector)) {
            this.getClassList().remove(cssSelector);
        }
    }
    /** @param {string[]} cssSelectors the CSS Selectors you want to remove from the base element. */
    removeClasses(...cssSelectors) {
        cssSelectors.forEach((cssSelector) => {
            this.removeClass(cssSelector);
        });
    }
    ;
    /**
     *  @param {string} prop the property you want to set
     *  @param {any} value the value you want the property to hold.
     */
    setProperty(prop, value) {
        this.properties[prop] = value;
    }
    /**
     * @param {string} prop the property you want to get the value of.
     * @returns {any} the value of the property.
     */
    getProperty(prop) {
        return this.properties[prop];
    }
    /** @param {string} text the text you want to set inside the element. */
    setInnerText(text) { this.getElement().innerText = text; }
}
exports.BaseElement = BaseElement;
