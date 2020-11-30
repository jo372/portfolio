interface IDictionary<TValue> {
  [id: string]: TValue;
}

export abstract class BaseElement {
  readonly element : HTMLElement;
  readonly properties : IDictionary<any>;
  protected constructor() {
    this.element = document.createElement('div');
    this.properties = {};
  }

  /** @returns {HTMLElement} the HTMLElement of this class. */
  getElement() : HTMLElement { return this.element; }

  /** @param {HTMLElement[]} domNodes the DOM Nodes you want to remove from the base element. */
  appendAllNodes(...domNodes : HTMLElement[]) {
    domNodes.forEach((domNode : HTMLElement) => this.appendNode(domNode));
  }

  /** @param {HTMLElement} domNode the html DOM Node which you want to append to the base element. */
  appendNode(domNode : HTMLElement) {
    this.getElement().appendChild(domNode);
  }

  /** @returns DOMTokenList the CSS Class List */
  getClassList() : DOMTokenList { return this.getElement().classList; }

  /** @param {string} cssSelector the CSS Selector you want to add to the base element. */
  addClass(cssSelector : string) { if(cssSelector) { this.getClassList().add(cssSelector); }}

  /** @param {string} cssSelector the CSS Selector you want to remove from the base element. */
  removeClass(cssSelector : string) {
    if(this.getClassList().contains(cssSelector)) {
      this.getClassList().remove(cssSelector);
    }
  }
  /** @param {string[]} cssSelectors the CSS Selectors you want to remove from the base element. */
  removeClasses(...cssSelectors : string[]) {
    cssSelectors.forEach((cssSelector : string) => {
      this.removeClass(cssSelector);
    });
  };
  /**
   *  @param {string} prop the property you want to set
   *  @param {any} value the value you want the property to hold.
   */
  setProperty(prop: string, value: any) {
    this.properties[prop] = value;
  }
  /**
   * @param {string} prop the property you want to get the value of.
   * @returns {any} the value of the property.
   */
  getProperty(prop: string) : any {
    return this.properties[prop];
  }
  /** @param {string} text the text you want to set inside the element. */
  setInnerText(text: string) { this.getElement().innerText = text; }
}
