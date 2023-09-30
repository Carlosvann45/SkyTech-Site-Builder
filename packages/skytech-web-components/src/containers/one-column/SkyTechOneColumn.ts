import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js'

/**
 * Class for one column container
 */
@customElement('skytech-one-column')
export class SkyTechOneColumn extends LitElement {
  @property({ type: String, attribute: true })
  color = 'inherit';
  @property({ type: String, attribute: true })
  margin = 'inherit';
  @property({ type: String, attribute: true })
  padding = 'inherit';
  @property({ type: String, attribute: true })
  width = 'inherit';
  @property({ type: String, attribute: true })
  height = 'inherit';

  render() {
    return html`
    <style>${this.generateStyles()}</style>
    <slot class="skytech-one-column" name="skytech-column-one"></slot>
    `;
  }

  generateStyles() {
    return css`
    slot.skytech-one-column {
      display: flex;
      flex-direction: column;  
    
      background-color: ${unsafeCSS(this.color)};
      margin: ${unsafeCSS(this.margin)};
      padding: ${unsafeCSS(this.padding)};
      width: ${unsafeCSS(this.width)};
      height: ${unsafeCSS(this.height)};
    }
    `;
  }
}