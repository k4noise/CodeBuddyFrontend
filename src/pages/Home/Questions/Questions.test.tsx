import { render, screen } from '@testing-library/react';
import { test, expect, describe } from 'vitest';
import Questions from './Questions';

describe('Test questions', () => {
  test('Submit form exists', () => {
    const { container } = render(<Questions />);
    expect(container.getElementsByClassName('questions__form')).to.exist;
    expect(container.getElementsByClassName('questions__form-question')).to
      .exist;
    expect(screen.getByText('Отправить')).to.exist;
  });

  test('Questions exists', () => {
    const { container } = render(<Questions />);
    const questions = container.getElementsByClassName('question');
    expect(questions.length).toEqual(2);
  });
});
