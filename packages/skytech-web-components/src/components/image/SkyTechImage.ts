import { LitElement, html, css, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";

/**
 * Class for image web component
 */
@customElement("skytech-image")
export class SkyTechImage extends LitElement {
  @property({ type: String, attribute: true })
  source = "";
  @property({ type: String, attribute: true })
  alt = "";
  @property({ type: String, attribute: true })
  margin = "inherit";
  @property({ type: String, attribute: true })
  padding = "inherit";
  @property({ type: String, attribute: true })
  width = "inherit";
  @property({ type: String, attribute: true })
  height = "inherit";
  @property({ type: String, attribute: true })
  imgWidth = "fit-content";
  @property({ type: String, attribute: true })
  imgHeight = "fit-content";

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
      <div class="skytech-image">
        <img
          alt="${this.alt}"
          src="${this.source}"
          width="${this.imgWidth}"
          height="${this.imgHeight}"
        />
      </div>
    `;
  }

  /**
   * @name generateStyles
   * @description handles generating styles for skytech image
   * @returns user generated styles
   */
  generateStyles() {
    return css`
      div.skytech-image {
        margin: ${unsafeCSS(this.margin)};
        padding: ${unsafeCSS(this.padding)};
        width: ${unsafeCSS(this.width)};
        height: ${unsafeCSS(this.height)};
      }
    `;
  }
}
