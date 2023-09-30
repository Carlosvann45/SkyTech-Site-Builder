import { SkyTechHeading } from './components/heading/SkyTechHeading';
import { SkyTechText } from './components/text/SkyTechText';
import { SkyTechOneColumn } from './containers/one-column/SkyTechOneColumn';
import { SkyTechTwoColumn } from './containers/two-column/SkyTechTwoColumn';
import { SkyTechImage } from './components/image/SkyTechImage';
import './components/text/SkyTechText';
import './components/heading/SkyTechHeading';
import './components/image/SkyTechImage';
import './containers/one-column/SkyTechOneColumn';
import './containers/two-column/SkyTechTwoColumn';

/**
 * Global declare for componenets
 */
declare global {
  interface HTMLElementTagNameMap {
    'skytech-text': SkyTechText,
    'skytech-heading': SkyTechHeading,
    'skytech-one-column': SkyTechOneColumn,
    'skytech-Two-column': SkyTechTwoColumn,
    'skytech-image': SkyTechImage
  }
}

export default global;