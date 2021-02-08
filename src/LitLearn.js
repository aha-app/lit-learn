import { LitElement, html } from 'lit-element';

import "./1-rendering-approach/1-RenderingApproach.js"
import "./1-rendering-approach/2-MorePractical.js"
import "./2-minimizing-expressions/1-StockManager.js";
import "./3-other-cool-things/1-FunctionalComponents.js";
import "./3-other-cool-things/2-DeclarativeBehavior.js";
import "./3-other-cool-things/3-DependencyInjection.js";
import "./3-other-cool-things/4-ModelViewerExample.js";
import "./3-other-cool-things/5-StateChartDriven.js";
import "./3-other-cool-things/6-MoveAround.js";

export class LitLearn extends LitElement {
  static get properties() {
    return {
      page: { type: String }
    };
  }

  constructor() {
    super();
    this.page = new URLSearchParams(window.location.search).get("page")
  }
  
  handleClick() {
    this.page = "stocks"
  }

  render() {
    switch (this.page) {
      case "11":
        return html`<rendering-approach></rendering-approach>`
      case "12":
        return html`<more-practical></more-practical>`
      case "21":
        return html`<stock-manager></stock-manager>`
      case "31":
        return html`<functional-components></functional-components>`
      case "32":
        return html`<declarative-behavior></declarative-behavior>`
      case "33":
        return html`<dependency-injection></dependency-injection>`
      case "34":
        return html`<model-viewer-example></model-viewer-example>`
      case "35":
        return html`<state-chart-driven></state-chart-driven>`
      case "36":
        return html`<move-around></move-around>`
      default:
        return html`<rendering-approach></rendering-approach>`
    }
  }
}

customElements.define('lit-learn', LitLearn);
