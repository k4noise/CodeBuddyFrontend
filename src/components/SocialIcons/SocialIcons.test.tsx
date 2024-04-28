import { render, screen } from '@testing-library/react';
import { test, expect, describe } from 'vitest';
import SocialIcons, { SOCIAL_ICONS } from './SocialIcons';

describe('Test social icons', () => {
  render(<SocialIcons />);
  test('All links and icons exists', () => {
    SOCIAL_ICONS.forEach(({ src, alt, url }) => {
      const iconElement: HTMLImageElement = screen.getByAltText(alt);
      expect(iconElement).toBeInTheDocument();

      const trimmedSrc = iconElement.src.replace(/^(?:\/\/|[^/]+)*\//, '/');
      expect(trimmedSrc).toEqual(src);

      const linkElement = iconElement.parentElement;
      expect(linkElement?.href).toEqual(url + '/');
    });
  });
});
