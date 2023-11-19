import { SkyTechHeading } from "./components/heading/SkyTechHeading";
import { SkyTechText } from "./components/text/SkyTechText";
import { SkyTechOneColumn } from "./containers/one-column/SkyTechOneColumn";
import { SkyTechTwoColumn } from "./containers/two-column/SkyTechTwoColumn";
import { SkyTechImage } from "./components/image/SkyTechImage";
import { SkyTechButton } from "./components/button/SkyTechButton";
import "./components/text/SkyTechText";
import "./components/heading/SkyTechHeading";
import "./components/image/SkyTechImage";
import "./containers/one-column/SkyTechOneColumn";
import "./containers/two-column/SkyTechTwoColumn";

/**
 * Global declare for componenets
 */
declare global {
  // eslint-disable-next-line no-unused-vars
  interface HTMLElementTagNameMap {
    "skytech-text": SkyTechText;
    "skytech-heading": SkyTechHeading;
    "skytech-one-column": SkyTechOneColumn;
    "skytech-Two-column": SkyTechTwoColumn;
    "skytech-image": SkyTechImage;
    "skytech-button": SkyTechButton;
  }
}

// eslint-disable-next-line no-undef
export default global;
