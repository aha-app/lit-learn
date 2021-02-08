import { LitElement, html, css } from 'lit-element';

export class StockManager extends LitElement {
  static get properties() {
    return {
      positions: { type: Array },
      currentPrice: { type: Number }
    }
  }

  constructor() {
    super();
    this.positions = []
  }
  
  generatePositions(stream = false) {
    const positions = [];
    for (let i = 0; i < 500; i++) {
      const price = (Math.random() * 450 + 1).toFixed(2)
      const shares = (Math.random() * 1000).toFixed(0)
      const total = (price * shares).toFixed(2)

      const position = {
        symbol: "GME",
        price,
        shares,
        total
      };

      positions.push(position);
    }
    return positions;
  }
  
  handleAddPositions() {
    this.positions = [...this.positions, ...this.generatePositions()];
  }
  
  giveToHedgeFund() {
    for (let i = 0; i < 100; i++) {
      const positionIndex = Math.floor(Math.random() * this.positions.length)
      this.positions = [
        ...this.positions.slice(0, positionIndex - 1),
        {
          ...this.positions[positionIndex],
          shares: 0
        },
        ...this.positions.slice(positionIndex)]
    }
  }
  
  inlinePositions() {
    return html`
      ${this.positions.map((position) => html`
        <div>
          ${position.symbol} - ${position.shares} shares @ ${position.price} - $${position.total}
        </div>
      `)}
    `
  }
  
  componentPositions() {
    return html`
      ${this.positions.map((position) => html`
        <div>
          <stock-position
            .symbol=${position.symbol}
            .shares=${position.shares}
            .price=${position.price}
          ></stock-position>
        </div>
      `)}
    `;
  }
  
  functionalPositions() {
  }
  
  render() {
    return html`
      <h1> Robinhood Stock Management Dashboard </h1>
      <div>
        <div>Positions reported: ${this.positions.length}</div>
        <button @click="${this.handleAddPositions}">Add Positions</button>
        <button @click="${this.giveToHedgeFund}">Give to Hedge Fund</button>
      </div>

      <br>
      <br>

      <div>
        ${this.componentPositions()}
      </div>
    `
  }
}

      // <div>
      //   ${this.inlinePositions()}
      // </div>

customElements.define('stock-manager', StockManager);

class StockPosition extends LitElement {
  static get styles() {
    return [
      css`
      div {
        font-size: 10;
      }
      .position{
        animation: pulse-green 2s once;
      }

      .position {
        box-shadow: 0 0 0 0 rgba(51, 217, 178, 1);
        animation: pulse-green 2s infinite;
      }
      
      @keyframes pulse-green {
        0% {
          box-shadow: 0 0 0 0 rgba(51, 217, 178, 0.7);
        }
        
        70% {
          box-shadow: 0 0 0 10px rgba(51, 217, 178, 0);
        }
        
        100% {
          box-shadow: 0 0 0 0 rgba(51, 217, 178, 0);
        }
      }
    `]
  }

  static get properties() {
    return {
      symbol: { type: String},
      price: { type: Number },
      shares: { type: Number },
    }
  }
  
  constructor() {
    super();
    this.symbol = '';
    this.price = 0;
    this.shares = 0;
    this.pulseOnUpdate = true;
  }
  
  get total() {
    return (this.price * this.shares).toFixed(2) 
  }
  
  updated() {
    if (this.pulseOnUpdate){
      const el = this.shadowRoot.querySelector("[pulse-on-update]");
      el.classList.add("position")
      setTimeout(() => {
        el.classList.remove("position");
      }, 2000);
    }
  }
  
  render() {
    return html`
      <div pulse-on-update>
        ${this.symbol} - ${this.shares} shares @ ${this.price} - $${this.total}
      </div>
    `;
  }

}

customElements.define('stock-position', StockPosition)
