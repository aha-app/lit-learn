import { LitElement, html, css } from "lit-element";

class DeclarativeBehavior extends LitElement {
  render() {
    return html`
      <div @click="${this.handleDismiss}">
        <dialog-window>
          <div>
            Hi, I'm a dialog window <a dialog-dismiss href="#"> <span>x</span> </a>
            <p>I've got a lot of content</p>
            <p>But I won't know what I'm made of ahead of time!!</p>
            <p>so... you can dismiss me by clicking <span dialog-dismiss>!here!</span> too</p>
          <div>
          <dialog-window>
            Hi, I'm a nested dialog window <a dialog-dismiss href="#"> <span>x</span> </a>
            <dialog-window>
              Hi, I'm a triple-nested dialog window <a dialog-dismiss href="#"> <span>x</span> </a>
            </dialog-window>
          </dialog-window>
        </dialog-window>
      </div>
    `
  }
}

class DialogWindow extends LitElement {
  static get styles() {
    return css`
      :host {
        padding: 1em;
      }
    `
  }
  
  static get properties() {
    return {
      visible: { type: Boolean }
    }
  }
  
  constructor() {
    super();
    this.visible = true;
    this.addEventListener("click", this.handleDismiss)
  }
  
  close() {
    this.visible = false;
  }
  
  handleDismiss(e) {
    const path = e.composedPath();
    console.log(path);
    for (let i = 0, l = path.indexOf(this); i < l; i++) {
      let target = path[i];
      if (target.hasAttribute && (target.hasAttribute('dialog-dismiss'))) {
        e.preventDefault();
        e.stopPropagation();
        this.close();
        break;
      }
    }
  }
  
  render() {
    if (this.visible) {
      return html`
        <slot></slot>
      `
    }
  }
}

customElements.define('dialog-window', DialogWindow);
customElements.define('declarative-behavior', DeclarativeBehavior);
