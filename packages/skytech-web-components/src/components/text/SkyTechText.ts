import { LitElement, html, css, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";

/**
 * Class for text web component
 */
@customElement("skytech-text")
export class SkyTechText extends LitElement {
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
    return html`
      <style>
        ${this.generateStyles()}
      </style>
      <p class="skytech-text">${this.content}</p>
    `;
  }

  /**
   * @name generateStyles
   * @description handles generating styles for skytech text
   * @returns user generated styles
   */
  generateStyles() {
    return css`
      p.skytech-text {
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
