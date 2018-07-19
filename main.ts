interface CustomElementConfig {
    selector:string;
    template: string;
    style?: string;
    useShadow?: boolean;
}

const validateSelector = (selector: string) => {
    if (selector.indexOf('-') <= 0) {
        throw new Error('You need at least 1 dash in the custom element name!');
    }
};

const CustomElement = (config: CustomElementConfig) => (cls) => {
    validateSelector(config.selector);
    if (!config.template) {
        throw new Error('You need to pass a template for the element');
    }
    const template = document.createElement('template');
    if (config.style) {
        config.template = `<style>${config.style}</style> ${config.template}`;
    }
    template.innerHTML = config.template;

    const connectedCallback = cls.prototype.connectedCallback || function () {};
    cls.prototype.connectedCallback = function() {
        const clone = document.importNode(template.content, true);
        if (config.useShadow) {
            this.attachShadow({mode: 'open'}).appendChild(clone);
        } else {
            this.appendChild(clone);
        }
        connectedCallback.call(this);
    };

    window.customElements.define(config.selector, cls);
};

@CustomElement({
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
class MyName extends HTMLElement {
    connectedCallback() {
        const elm = document.createElement('h3');
        elm.textContent = 'Boo!';
        this.shadowRoot.appendChild(elm);
    }
}