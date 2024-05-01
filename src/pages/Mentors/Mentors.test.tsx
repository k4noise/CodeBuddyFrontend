import { render, screen } from '@testing-library/react';
import { test, expect, describe } from 'vitest';
import Mentors from './Mentors';
import { BrowserRouter } from 'react-router-dom';

describe('Test mentors', () => {
  render(
    <BrowserRouter>
      <Mentors />
    </BrowserRouter>
  );
  test('Mentors exists', () => {
    const mentorsCards = screen.getAllByTestId('mentorCard');
    expect(mentorsCards.length).toBe(3);
  });
});
