import { LitElement, html, css } from 'lit-element';

export class RenderingApproach extends LitElement {
  static get styles() {
    return css`
      :host {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
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
      page: { type: String },
    };
  }
  
  constructor() {
    super();
    this.page = '123hello'
  }
  
  handleClick() {
    console.log("clicked!!")
  }
  
  render() {
    return html`
      <main title=${this.page + '123'}>
        <h1 @click="${this.handleClick}">This Page Left Intentionally Blank</h1>

        ${this.page}
        
        <ul>
          <li>Better</li>
          <li>Faster</li>
          <li>Stronger</li>
        </ul>
      </main>
    `
  }
}

customElements.define('rendering-approach', RenderingApproach);
