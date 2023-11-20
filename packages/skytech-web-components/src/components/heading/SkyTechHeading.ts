import { LitElement, html, css, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";

/**
 * Class for heading web component
 */
@customElement("skytech-heading")
export class SkyTechHeading extends LitElement {
  @property({ type: Number, attribute: true })
  heading = 1;
  @property({ type: String, attribute: true })
  color = "inherit";
  @property({ type: String, attribute: true })
  fontSize = "inherit";
  @property({ type: String, attribute: true })
  content = "";
  @property({ type: String, attribute: true })
  margin = "inherit";
  @property({ type: String, attribute: true })
  padding = "inherit";
  @property({ type: String, attribute: true })
  textAlign = "inherit";
  @property({ type: String, attribute: true })
  fontWeight = "inherit";
  @property({ type: String, attribute: true })
  width = "inherit";
  @property({ type: String, attribute: true })
  height = "inherit";
  @property({ type: String, attribute: true })
  lineHeight = "inherit";

  /**
   * @name render
   * @description renders html for web component
   * @returns generated web component html
   */
  render() {
    let filler;

    switch (this.heading) {
      case 1:
        filler = html`<h1 class="skytech-heading">${this.content}</h1>`;
        break;
      case 2:
        filler = html`<h2 class="skytech-heading">${this.content}</h2>`;
        break;
      case 3:
        filler = html`<h3 class="skytech-heading">${this.content}</h3>`;
        break;
      case 4:
        filler = html`<h4 class="skytech-heading">${this.content}</h4>`;
        break;
      case 5:
        filler = html`<h5 class="skytech-heading">${this.content}</h5>`;
        break;
      case 6:
      default:
        filler = html`<h6 class="skytech-heading">${this.content}</h6>`;
        break;
    }

    return html`
      <style>
        ${this.generateStyles()}
      </style>
      ${filler}
    `;
  }

  /**
   * @name generateStyles
   * @description handles generating styles for skytech heading
   * @returns user generated styles
   */
  generateStyles() {
    return css`
      h1.skytech-heading,
      h2.skytech-heading,
      h3.skytech-heading,
      h4.skytech-heading,
      h5.skytech-heading,
      h6.skytech-heading {
        color: ${unsafeCSS(this.color)};
        font-size: ${unsafeCSS(this.fontSize)};
        margin: ${unsafeCSS(this.margin)};
        padding: ${unsafeCSS(this.padding)};
        text-align: ${unsafeCSS(this.textAlign)};
        font-weight: ${unsafeCSS(this.fontWeight)};
        width: ${unsafeCSS(this.width)};
        height: ${unsafeCSS(this.height)};
        line-height: ${unsafeCSS(this.height)};
      }
    `;
  }
}
