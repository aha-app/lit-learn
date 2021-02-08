import { LitElement, html } from "lit-element";

class ModelViewerExample extends LitElement {
  render() {
    return html`
      <a href="https://modelviewer.dev/">Model Viewer</a>
      <a href="https://github.com/google/model-viewer/blob/master/packages/model-viewer/src/model-viewer-base.ts#L17/">Lit Element Usage</a>
    `
  }
}

customElements.define('model-viewer-example', ModelViewerExample);
