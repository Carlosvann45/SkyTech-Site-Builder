import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js'


@customElement('skytech-heading')
export class SkyTechHeading extends LitElement {
  @property({ type: Number, attribute: true })
  heading = 1;
  @property({ type: String, attribute: true })
  color = 'black';
  @property({ type: String, attribute: true })
  size = '';
  @property({ type: String, attribute: true })
  content = '';

  render() {
    let filler;
    const style = `
    color: ${this.color};
    font-size: ${this.size};`;

    switch (this.heading) {
      case 1:
        filler = html`<h1 style="${style}">${this.content}</h1>`
        break;
      case 2:
        filler = html`<h2 style="${style}">${this.content}</h2>`
        break;
      case 3:
        filler = html`<h3 style="${style}">${this.content}</h3>`
        break;
      case 4:
        filler = html`<h4 style="${style}">${this.content}</h4>`
        break;
      case 5:
        filler = html`<h5 style="${style}">${this.content}</h5>`
        break;
      case 6:
      default:
        filler = html`<h6 style="${style}">${this.content}</h6>`
        break;
    }

    return filler;
  }
}
