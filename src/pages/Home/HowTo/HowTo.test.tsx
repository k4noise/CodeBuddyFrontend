import { render, screen } from '@testing-library/react';
import { test, expect, describe } from 'vitest';
import HowTo, { STEPS } from './HowTo';

describe('Test how to', () => {
  test('Exists images', () => {
    render(<HowTo />);
    const allImages: HTMLImageElement[] = screen.getAllByRole('img');
    for (let i = 0; i < STEPS.length; i++) {
      expect(allImages[i]).toBeInTheDocument();
      expect(allImages[i].alt).toBe(STEPS[i].title);
    }
  });

  test('Exists titles', () => {
    render(<HowTo />);
    STEPS.forEach((step) => {
      const stepElement = screen.getByText(step.title);
      expect(stepElement).toBeInTheDocument();
    });
  });
});
