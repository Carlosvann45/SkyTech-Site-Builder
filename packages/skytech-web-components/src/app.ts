import { SkyTechHeading } from './components/heading/SkyTechHeading';
import { SkyTechText } from './components/text/SkyTechText';
import { SkyTechOneColumn } from './components/one-column/SkyTechOneColumn';
import { SkyTechTwoColumn } from './components/two-column/SkyTechTwoColumn';
import './components/text/SkyTechText';
import './components/heading/SkyTechHeading';
import './components/one-column/SkyTechOneColumn';
import './components/two-column/SkyTechTwoColumn';

declare global {
  interface HTMLElementTagNameMap {
    'skytech-text': SkyTechText,
    'skytech-heading': SkyTechHeading,
    'skytech-one-column': SkyTechOneColumn,
    'skytech-Two-column': SkyTechTwoColumn
  }
}