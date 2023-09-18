import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js'


@customElement('skytech-text')
export class SkyTechText extends LitElement {
  @property({ type: String, attribute: true })
  color = 'black';
  @property({ type: String, attribute: true })
  size = '15px';
  @property({ type: String, attribute: true })
  content = '';


  render() {
    return html`
    <p style="
      color: ${this.color};
      font-size: ${this.size};
    ">${this.content}</p>
    `
  }
}
