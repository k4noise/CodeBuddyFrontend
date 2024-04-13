import { render, screen } from '@testing-library/react';
import { test, expect, describe } from 'vitest';
import HowTo, { STEPS } from './HowTo';

describe('Test how to', () => {
  test('Image with text exists', () => {
    render(<HowTo />);
    STEPS.forEach(({ title }) => {
      const imageElement = screen.findByAltText(title);
      expect(imageElement).to.exist;

      const textElement = screen.findAllByText(title);
      expect(textElement).to.exist;
    });
  });
});
