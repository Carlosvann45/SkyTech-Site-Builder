import { SkyTechHeading } from './components/heading/SkyTechHeading';
import { SkyTechText } from './components/text/SkyTechText';
import './components/text/SkyTechText';
import './components/heading/SkyTechHeading';

declare global {
  interface HTMLElementTagNameMap {
    'skytech-text': SkyTechText,
    'skytech-heading': SkyTechHeading
  }
}