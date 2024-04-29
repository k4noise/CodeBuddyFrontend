import { render, screen } from '@testing-library/react';
import { test, expect, describe } from 'vitest';
import Questions from './Questions';

describe('Test questions', () => {
  test('Submit form exists', () => {
    const { container } = render(<Questions />);
    expect(container.querySelector('.questions__form')).toBeInTheDocument();
    expect(container.querySelector('.questions__form-question')).to.exist;
    expect(screen.getByText('Отправить')).toBeInTheDocument();
  });

  test('Questions exists', () => {
    render(<Questions />);
    const questions = screen.getAllByTestId('question');
    expect(questions.length).toEqual(2);
  });
});
