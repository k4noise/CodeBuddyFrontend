import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Register from './Register';
import { beforeEach, describe, expect, test } from 'vitest';

describe('Test login', () => {
  beforeEach(() => render(<Register />));

  test('renders register form', () => {
    expect(screen.getByPlaceholderText('Почта')).to.exist;
    expect(screen.getByPlaceholderText('Пароль')).to.exist;
  });

  test('wrong name input', async () => {
    const nameInput = screen.getByPlaceholderText('Имя');
    const submitButton = screen.getByText('Зарегестрироваться');
    userEvent.type(nameInput, '1');
    userEvent.click(submitButton);
    expect(await screen.findByText('Некорректный email')).to.exist;
  });

  test('wrong surname input', async () => {
    const surnameInput = screen.getByPlaceholderText('Фамилия');
    const submitButton = screen.getByText('Зарегестрироваться');
    userEvent.type(surnameInput, '1');
    userEvent.click(submitButton);
    expect(await screen.findByText('Некорректный email')).to.exist;
  });

  test('wrong email input', async () => {
    const emailInput = screen.getByPlaceholderText('Почта');
    const submitButton = screen.getByText('Зарегестрироваться');
    userEvent.type(emailInput, 'invalid email');
    userEvent.click(submitButton);
    expect(await screen.findByText('Некорректный email')).to.exist;
  });

  test('wrong password input', async () => {
    const passwordInput = screen.getByPlaceholderText('Пароль');
    userEvent.type(passwordInput, 'short');
    const submitButton = screen.getByText('Зарегестрироваться');
    userEvent.click(submitButton);
    expect(await screen.findByText('Не менее 8 символов')).to.exist;
  });
});
