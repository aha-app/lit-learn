import { LitElement, html, css } from 'lit-element';

export class StockManager extends LitElement {
 
  static get styles() {
    return css`
      .all-positions {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-gap: .25em;
      }
    `;
  }

  static get properties() {
    return {
      positions: { type: Array },
      currentPrice: { type: Number }
    }
  }

  constructor() {
    super();
    this.positions = [];
    this.currentPrice = 50;
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

  handleInput(e) {
    const key = e.target.getAttribute("name");
    this[key] = e.target.value;
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
  
  render() {
    return html`
      <h1> Robinhood Stock Management Dashboard </h1>
      <div>
        <div>Positions reported: ${this.positions.length}</div>
        <button @click="${this.handleAddPositions}">Add Positions</button>
        <button @click="${this.giveToHedgeFund}">Give to Hedge Fund</button>

        <br>
        <br>
        <label>Current Price:</label>
        <input @input="${this.handleInput}" value="${this.currentPrice}" type="number" name="currentPrice">
      </div>

      <br>
      <br>

      <div class="all-positions">
        ${this.positions.map((position) => html`
          <stock-position
            .symbol=${position.symbol}
            .shares=${position.shares}
            .avgPurchasePrice=${position.price}
            .currentPrice=${this.currentPrice}
          ></stock-position>
        `)}
      </div>
    `
  }
}

customElements.define('stock-manager', StockManager);

export class StockPosition extends LitElement {
  static get styles() {
    return css`
      .position-card {
        border: 1px solid #7b99c1;
        border-radius: .25em;
        padding: 1em;
        width: 350px;
      }
      
      .green {
        color: green;
      }
      
      .red {
        color: red;
      }

      .grey {
        color: grey
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
    `;
  }

  static get properties() {
    return {
      symbol: { type: String },
      shares: { type: Number },
      avgPurchasePrice: { type: Number },
      currentPrice: { type: Number },
    };
  }
  
  constructor() {
    super();
    this.symbol = "GME";
    this.shares = 10;
    this.avgPurchasePrice = 50;
    this.currentPrice = 50;
    this.pulseOnUpdate = true;
  }

  get total() {
    return (this.avgPurchasePrice * this.shares).toFixed(2) 
  }
  
  get positionHealth() {
    if (this.currentPrice < this.avgPurchasePrice) return "red"
    if (this.currentPrice > this.avgPurchasePrice) return "green"
    if (this.currentPrice === this.avgPurchasePrice) return "grey"
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
      <div class="position-card" pulse-on-update>
        ${this.symbol} - ${this.shares} shares @ $${this.avgPurchasePrice} - 
        <span class="${this.positionHealth}"> $${this.total} </span>
      </div>
    `;
  }
}

customElements.define('stock-position', StockPosition)
