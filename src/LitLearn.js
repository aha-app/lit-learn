import { LitElement, html, css } from 'lit-element';
import "./StockManager";

export class LitLearn extends LitElement {
  static get properties() {
    return {
      page: { type: String }
    };
  }

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

      @keyframes app-logo-spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }

      .app-footer {
        font-size: calc(12px + 0.5vmin);
        align-items: center;
      }

      .app-footer a {
        margin-left: 5px;
      }
    `;
  }

  constructor() {
    super();
    this.page = window.location.pathname
  }
  
  handleClick() {
    this.page = "stocks"
  }

  render() {
    // if (this.page === "stocks") {
      return html`
        <stock-manager></stock-manager>
      `
    // }

    return html`
      <main nice=${this.page + '123'}>
        <h1 @click="${this.handleClick}">This Page Left Intentionally Blank</h1>
        ${this.page}
        
        <ul>
          <li>Better</li>
          <li>Faster</li>
          <li>Stronger</li>
        </ul>
      </main>
    `;
  }
}
