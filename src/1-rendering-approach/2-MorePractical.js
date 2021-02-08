import { LitElement, html, css } from 'lit-element';

export class MorePractical extends LitElement {
  static get styles() {
    return css`
      .position-card {
        border: 1px solid #7b99c1;
        border-radius: .25em;
        padding: 1em;
        width: 250px;
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
  }

  get total() {
    return (this.avgPurchasePrice * this.shares).toFixed(2) 
  }
  
  get positionHealth() {
    if (this.currentPrice < this.avgPurchasePrice) return "red"
    if (this.currentPrice > this.avgPurchasePrice) return "green"
    if (this.currentPrice === this.avgPurchasePrice) return "grey"
  }
  
  handleInput(e) {
    const key = e.target.getAttribute("name");
    this[key] = e.target.value;
  }
  
  render() {
    const result = html`
      <div class="position-card">
        ${this.symbol} - ${this.shares} shares @ $${this.avgPurchasePrice} - 
        <span class="${this.positionHealth}"> $${this.total} </span>
      </div>
    `;
    
    console.log(result.values)
    console.log(result.getHTML());
    
    return html`
      <div>
        <label>Shares:</label>
        <input @input="${this.handleInput}" value="${this.shares}" type="number" name="shares">
        <label>Purchase Price:</label>
        <input @input="${this.handleInput}" value="${this.avgPurchasePrice}" type="number" name="avgPurchasePrice">
        <label>Current Price:</label>
        <input @input="${this.handleInput}" value="${this.currentPrice}" type="number" name="currentPrice">
      </div>
      <br />
      <br />
      <br />
      ${result}
    `
  }
}

customElements.define('more-practical', MorePractical);
