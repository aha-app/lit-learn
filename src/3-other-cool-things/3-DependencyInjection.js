import { LitElement, html, css } from "lit-element";

const swiftAPI = {
  quote: async () => {
    return await (await fetch("https://api.taylor.rest/")).json()
  }
}

function later(delay, value) {
  return new Promise(resolve => setTimeout(resolve, delay, value));
}

const mockAPI = {
  quote: () => {
    return later(100, { quote: "Hi I'm a mocked quote" })
  }
}

class DependencyInjection extends LitElement {
  static get properties() {
    return {
      source: { type: String }
    }
  }

  constructor() {
    super();
    this.source = "mock";
    this.addEventListener("client-request", this.provideClient)
  }
  
  provideClient(e) {
    e.stopPropagation();
    e.provider = this.source === "mock" ? mockAPI : swiftAPI;
  }
  
  render() {
    return html`
      <div>
        <p>Did you know...</p>
        <ol>
          <li>Events bubble up the tree</li>
          <li>Events are cancelable</li>
          <li>Events are <b>synchronous</b></li>
        </ol>
      </div>
      
      <div>
        <p>
          Currently using: ${this.source}
        </p>
        <button @click="${() => this.source = "mock"}">Mock</button>
        <button @click="${() => this.source = "swift"}">SwiftAPI</button>
      </div>
      
      <div>
        <quote-child></quote-child>
      </div>
    `
  }
}

class QuoteChild extends LitElement {
  static get styles() {
    return css`
      .container {
        padding: 2em;
      }
    `;

  }

  static get properties() {
    return {
      quotes: { type: Array },
      hasClient: { type: Boolean }
    }
  }
  
  constructor() {
    super();
    this.quotes = [];
    this.hasClient = false;
  }
  
  setClient() {
    this.client = this.requestClient();
    if (this.client !== null) this.hasClient = true;
  }
  
  requestClient() {
    let event = new CustomEvent("client-request", {
      cancelable: true,
      bubbles: true,
      composed: true
    });
    
    this.dispatchEvent(event)

    return event.provider;
  }
  
  async addQuote() {
    const { quote } = await this.client.quote();
    this.quotes = [...this.quotes, quote]
  }


  render() {
    return html`
      <div class="container">
        <button @click="${this.setClient}">Request Client</button>
        <button ?disabled="${!this.hasClient}" @click="${this.addQuote}">Get Quote</button>
        
        <h3>Quotes</h3>
        <div>
          <ul>
            ${this.quotes.map(quote => html`<li>${quote}</li>`)}
          </ul>
        </div>
      </div>
    `;
  }
}


customElements.define('dependency-injection', DependencyInjection);
customElements.define('quote-child', QuoteChild);
