import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Class for button web component
 */
@customElement('skytech-button')
export class SkyTechButton extends LitElement {
  @property({ type: String, attribute: true })
  color = 'inherit';
  @property({ type: String, attribute: true })
  fontSize = 'inherit';
  @property({ type: String, attribute: true })
  content = '';
  @property({ type: String, attribute: true })
  margin = 'inherit';
  @property({ type: String, attribute: true })
  padding = 'inherit';
  @property({ type: String, attribute: true })
  fontWeight = 'inherit';
  @property({ type: String, attribute: true })
  width = 'inherit';
  @property({ type: String, attribute: true })
  height = 'inherit';


  render() {
    return html`
    <style>${this.generateStyles()}</style>
    <button class="skytech-button">${this.content}</buton>
    `
  }

  generateStyles() {
    return css`
    p.skytech-button {
      color: ${unsafeCSS(this.color)};
      font-size: ${unsafeCSS(this.fontSize)};
      margin: ${unsafeCSS(this.margin)};
      padding: ${unsafeCSS(this.padding)};
      font-weight: ${unsafeCSS(this.fontWeight)};
      width: ${unsafeCSS(this.width)};
      height: ${unsafeCSS(this.height)};
    }
    `;
  }
}