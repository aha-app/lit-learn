import { LitElement, html, css } from "lit-element";

class MoveAround extends LitElement {
  
  static get styles() {
    return css`
      .container: {
        display: grid;
        border: 1px solid #ccc;
        border-width: 1px 0 0 1px;
      }
      .item {
        border: 1px solid #ccc;
        border-width: 0 1px 1px 0;
        float: left;
        min-width: 100px;
        min-height: 100px;
      }
    `;
  }
  static get properties() {
    return { 
      cells: { type: Array },
      text: { type: String }
    }
  }
  
  constructor() {
    super();
    this.index = 5;
    this.cells = [];
    for (let i = 0; i < 100; i++) {
      this.cells.push(i)
    }
    
    this.text = "Data"
  }
  
  handleInput(e) {
    this.text = e.target.value;
  }
  
  reparent() {
    const newId = `#n${(Math.random() * 100).toFixed(0)}`;

    const nodeToMove = this.shadowRoot.querySelector("moved-around");
    this.shadowRoot.querySelector(newId).appendChild(nodeToMove);
  }
  
  render() {
    return html`
      <input value="${this.text}" @input="${this.handleInput}">
      <button @click="${this.reparent}">Move Around</button>
      <div class="container">
        ${this.cells.map(i => {
          return html`
            <div id="n${i}" class="item">
            <h4>${i}</h4>
            ${i === 5
               ? html`<moved-around .text="${this.text}"></moved-around>`
               : ``}
            </div>
          `
        })}
      </div>
    `;
  }
}

class MovedAround extends LitElement {
  static get styles() {
    return css`
      span {
        color: blue;
      }
    `
  }

  static get properties() {
    return {
      text: { type: String }
    }
  }
  
  render() {
    return html`
      <span>${this.text}</span>
    `
  }
}

window.customElements.define("move-around", MoveAround);
window.customElements.define("moved-around", MovedAround);
