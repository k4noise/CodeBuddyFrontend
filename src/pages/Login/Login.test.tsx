import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';
import { beforeEach, describe, expect, test } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

describe('Test login', () => {
  beforeEach(() =>
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    )
  );

  test('renders login form', () => {
    expect(screen.getByPlaceholderText('Почта')).to.exist;
    expect(screen.getByPlaceholderText('Пароль')).to.exist;
  });

  test('wrong email input', async () => {
    const emailInput = screen.getByPlaceholderText('Почта');
    const submitButton = screen.getByText('Войти');
    userEvent.type(emailInput, 'invalid email');
    userEvent.click(submitButton);
    expect(await screen.findByText('Некорректный email')).to.exist;
  });

  test('wrong password input', async () => {
    const passwordInput = screen.getByPlaceholderText('Пароль');
    const submitButton = screen.getByText('Войти');
    userEvent.type(passwordInput, 'short');
    userEvent.click(submitButton);
    expect(await screen.findByText('Не менее 8 символов')).to.exist;
  });
});
