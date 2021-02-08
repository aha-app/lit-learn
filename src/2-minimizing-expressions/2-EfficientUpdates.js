import { LitElement, html, css} from "lit-element";

class EfficientUpdates extends LitElement {
  static get styles() {
    return css`
      :host {
        min-height: 100vh;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        font-size: calc(10px + 2vmin);
        color: #1a2b42;
        max-width: 960px;
        margin: 0 auto;
        text-align: center;
        background-color: var(--lit-learn-background-color);
      }

      main {
        flex-grow: 1;
      }
    `;
  }
  
  static get properties() {
    return {
      width: { type: Number },
      lazy: { type: Boolean }
    }
  }
  
  constructor() {
    super();
    this.width = 10;
    this.goingUp = true;
    setInterval(() => {
      this.incrementWidth();
    }, 20);
  }
  
  incrementWidth() {
    if (this.goingUp) {
      if (this.width === 50) {
        this.goingUp = false;
      }
      this.width = this.width + 1;
    } else {
      if (this.width === 5) {
        this.goingUp = true;
      }
      this.width = this.width - 1;
    }
  }
  
  get tree() {
    if (this.lazy) {
      return html`
        <lazy-morphing-tree
          .totalDepth=${11}
          .width=${this.width}
          .currentDepth="${1}"
        ></lazy-morphing-tree>
     ` 
    } else {
      return html`
        <morphing-tree
          .totalDepth=${11}
          .width=${this.width}
          .currentDepth="${1}"
        ></morphing-tree>
      `
    }
  }

  render() {
    return html`
      <main>
        <div>
          <label @click="${() => this.lazy = !this.lazy}" for="lazy">Lazy: <input type="checkbox" ?checked=${this.lazy}></label>

        </div>
        ${this.tree}
      </main>
    `
  }
}
window.customElements.define("efficient-updates", EfficientUpdates);

class MorphingTree extends LitElement {
  static get styles() {
    return css`
      .cell {
        background-color: blue;
        border: 1px solid white;
        height: 50px;
        margin-top: 4px;
        margin-left: 40px;
      }
      .cell:hover {
        background-color: orange;
      }
    `
  }

  static get properties() {
    return {
      width: { type: Number },
      totalDepth: { type: Number },
      currentDepth: {type: Number }
    }
  }
  
  get children() {
    if (this.currentDepth < this.totalDepth) {
      return html`
        <morphing-tree
          .width=${this.width}
          .totalDepth="${this.totalDepth}"
          .currentDepth="${this.currentDepth + 1}"
        ></morphing-tree>
        <morphing-tree
          .width=${this.width}
          .totalDepth="${this.totalDepth}"
          .currentDepth="${this.currentDepth + 1}"
        ></morphing-tree>
      `
    }
  }

  render() {
    return html`
      <style>
        .cell {
          margin-left: 20px;
          color: grey;
        }
      </style>
      <div class="cell" style="width: ${this.width}px">
        ${this.width}
        ${this.children}
      </div>
    `
  }
}
window.customElements.define("morphing-tree", MorphingTree);

class LazyLitElement extends LitElement {
  async scheduleUpdate() {
    await new Promise(res => setTimeout(res));
    this._validate();
  }
}

class LazyMorphingTree extends LazyLitElement {
  static get styles() {
    return css`
      .cell {
        background-color: blue;
        border: 1px solid white;
        height: 50px;
        margin-top: 4px;
        margin-left: 40px;
      }
      .cell:hover {
        background-color: orange;
      }
    `
  }

  static get properties() {
    return {
      width: { type: Number },
      totalDepth: { type: Number },
      currentDepth: {type: Number }
    }
  }
  
  get children() {
    if (this.currentDepth < this.totalDepth) {
      return html`
        <morphing-tree
          .width=${this.width}
          .totalDepth="${this.totalDepth}"
          .currentDepth="${this.currentDepth + 1}"
        ></morphing-tree>
        <morphing-tree
          .width=${this.width}
          .totalDepth="${this.totalDepth}"
          .currentDepth="${this.currentDepth + 1}"
        ></morphing-tree>
      `
    }
  }

  render() {
    return html`
      <style>
        .cell {
          width: ${this.width}px;
          margin-left: 20px;
          color: grey;
        }
      </style>
      <div class="cell" style="width: ${this.width}">
        ${this.width}
        ${this.children}
      </div>
    `
  }
}

window.customElements.define("lazy-morphing-tree", LazyMorphingTree);