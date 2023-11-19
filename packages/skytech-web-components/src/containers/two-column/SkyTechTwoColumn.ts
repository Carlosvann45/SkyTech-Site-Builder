import { LitElement, html, css, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";

/**
 * Class for two column container
 */
@customElement("skytech-two-column")
export class SkyTechTwoColumn extends LitElement {
  @property({ type: String, attribute: true })
  color = "inherit";
  @property({ type: String, attribute: true })
  margin = "inherit";
  @property({ type: String, attribute: true })
  padding = "inherit";
  @property({ type: String, attribute: true })
  width = "inherit";
  @property({ type: String, attribute: true })
  height = "inherit";
  @property({ type: String, attribute: true })
  colorOne = "inherit";
  @property({ type: String, attribute: true })
  marginOne = "inherit";
  @property({ type: String, attribute: true })
  paddingOne = "inherit";
  @property({ type: String, attribute: true })
  widthOne = "inherit";
  @property({ type: String, attribute: true })
  heightOne = "inherit";
  @property({ type: String, attribute: true })
  colorTwo = "inherit";
  @property({ type: String, attribute: true })
  marginTwo = "inherit";
  @property({ type: String, attribute: true })
  paddingTwo = "inherit";
  @property({ type: String, attribute: true })
  widthTwo = "inherit";
  @property({ type: String, attribute: true })
  heightTwo = "inherit";

  render() {
    return html`
      <style>
        ${this.generateStyles()}
      </style>
      <div class="skytech-two-column">
        <slot class="skytech-column-one" name="skytech-column-one"></slot>
        <slot class="skytech-column-two" name="skytech-column-two"></slot>
      </div>
    `;
  }

  generateStyles() {
    return css`
      div.skytech-two-column {
        display: flex;
        flex-direction: row;

        background-color: ${unsafeCSS(this.color)};
        margin: ${unsafeCSS(this.margin)};
        padding: ${unsafeCSS(this.padding)};
        width: ${unsafeCSS(this.width)};
        height: ${unsafeCSS(this.height)};
      }

      slot.skytech-column-one {
        display: flex;
        flex-direction: column;

        background-color: ${unsafeCSS(this.colorOne)};
        margin: ${unsafeCSS(this.marginOne)};
        padding: ${unsafeCSS(this.paddingOne)};
        width: ${unsafeCSS(this.widthOne || "50%")};
        height: ${unsafeCSS(this.heightOne || "inherit")};
      }

      slot.skytech-column-two {
        display: flex;
        flex-direction: column;

        background-color: ${unsafeCSS(this.colorTwo)};
        margin: ${unsafeCSS(this.marginTwo)};
        padding: ${unsafeCSS(this.paddingTwo)};
        width: ${unsafeCSS(this.widthTwo || "50%")};
        height: ${unsafeCSS(this.heightTwo || "inherit")};
      }
    `;
  }
}
