import { LitElement, html, css } from "lit-element";

const component = (options, value, onInput) => {
  const { name, id, type } = options;

  return html`
    <label for="${id}">${name}</label>
    <input
      id="${id}"
      type="${type}"
      name="${name}"
      value="${value}"
      @input="${onInput}"
    ></input>
    <hr>
  `;
}

class FunctionalComponents extends LitElement {
  
  static get styles() {
    return css`
      .container {
        display: grid;
        grid-template-columns: 4fr 1fr;
      }
    `;
  }

  static get properties() {
    return {
      components: { type: Array },
      dynamicValues: { type: Object },
      inputConfig: { type: Object }
    }
  }
  
  constructor() {
    super();
    this.components = [];
    this.dynamicValues = {};
    this.inputConfig = {
      id: 'sym',
      name: 'symbol',
      type: 'text',
    }
  }
  
  handleInputConfig(e) {
    const key = e.target.getAttribute("name");
    this.inputConfig[key] = e.target.value;
  }
  
  handleDynamicInput(e) {
    const key = e.target.getAttribute("name");
    this.dynamicValues = {
      ...this.dynamicValues,
      [key]: e.target.value,
    }
  }
  
  handleAddInput() {
    const newComponentConfig = { ...this.inputConfig };
    const { name } = newComponentConfig;
    this.dynamicValues[name] = '';
    this.components = [...this.components, newComponentConfig];
  }

  render() {
    return html`
      <div class="container">
        <div class="components">
          <div>
            <label>id<label>
            <input @input="${this.handleInputConfig}" value="${this.inputConfig['id']}" name="id">
            <label>name<label>
            <input @input="${this.handleInputConfig}" value="${this.inputConfig['name']}" name="name">
            <label>type<label>
            <input @input="${this.handleInputConfig}" value="${this.inputConfig['type']}" name="type">
            <button @click="${this.handleAddInput}">Add Input</button>
          </div>
          
          <br>
          <br>
          <br>
          
          ${this.components.map((config) => component(
            config,
            this.dynamicValues[config['name']],
            this.handleDynamicInput)
            )
          }
          </div>

          <div class="state">
            <b>components</b>
            <pre>
${JSON.stringify(this.components, false, 2)}
            </pre>
            <b>values</b>
            <pre>
${JSON.stringify(this.dynamicValues, false, 2)}
            </pre>
          </div>
        </div>
    `
  }
}

customElements.define('functional-components', FunctionalComponents);
