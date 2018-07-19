var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const validateSelector = (selector) => {
    if (selector.indexOf('-') <= 0) {
        throw new Error('You need at least 1 dash in the custom element name!');
    }
};
const CustomElement = (config) => (cls) => {
    validateSelector(config.selector);
    if (!config.template) {
        throw new Error('You need to pass a template for the element');
    }
    const template = document.createElement('template');
    if (config.style) {
        config.template = `<style>${config.style}</style> ${config.template}`;
    }
    template.innerHTML = config.template;
    const connectedCallback = cls.prototype.connectedCallback || function () { };
    cls.prototype.connectedCallback = function () {
        const clone = document.importNode(template.content, true);
        if (config.useShadow) {
            this.attachShadow({ mode: 'open' }).appendChild(clone);
        }
        else {
            this.appendChild(clone);
        }
        connectedCallback.call(this);
    };
    window.customElements.define(config.selector, cls);
};
let MyName = class MyName extends HTMLElement {
    connectedCallback() {
        const elm = document.createElement('h3');
        elm.textContent = 'Boo!';
        this.shadowRoot.appendChild(elm);
    }
};
MyName = __decorate([
    CustomElement({
        selector: 'ce-my-name',
        template: `<div>My name is Inigo Montoya</div>
               <div>You killed my father</div>
               <div>Prepare to die!</div>`,
        style: `:host {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: #009cff;     
      padding: 16px;         
      border-top: 1px solid black;
      font-size: 24px;
    }`,
        useShadow: true
    })
], MyName);
//# sourceMappingURL=main.js.map