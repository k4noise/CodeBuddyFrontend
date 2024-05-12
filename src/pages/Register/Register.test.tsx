import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Register from './Register';
import { beforeEach, describe, expect, test } from 'vitest';

describe('Test login', () => {
  beforeEach(() => {
    render(<Register />);
  });

  test('renders register form', () => {
    expect(screen.getByPlaceholderText('Почта')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Пароль')).toBeInTheDocument();
  });

  test('wrong name input', async () => {
    const nameInput = screen.getByPlaceholderText('Имя');
    const submitButton = screen.getByText('Зарегестрироваться');
    const isAgreeCheck = screen.getByText(
      'Я согласен с условиями политики конфиденциальности'
    );

    userEvent.type(nameInput, '1');
    userEvent.click(isAgreeCheck);
    userEvent.click(submitButton);

    expect(await screen.findByText('Некорректный email')).toBeInTheDocument();
  });

  test('wrong surname input', async () => {
    const surnameInput = screen.getByPlaceholderText('Фамилия');
    const submitButton = screen.getByText('Зарегестрироваться');
    const isAgreeCheck = screen.getByText(
      'Я согласен с условиями политики конфиденциальности'
    );

    userEvent.type(surnameInput, '1');
    userEvent.click(isAgreeCheck);
    userEvent.click(submitButton);

    expect(await screen.findByText('Некорректный email')).toBeInTheDocument();
  });

  test('wrong email input', async () => {
    const emailInput = screen.getByPlaceholderText('Почта');
    const submitButton = screen.getByText('Зарегестрироваться');
    const isAgreeCheck = screen.getByText(
      'Я согласен с условиями политики конфиденциальности'
    );

    userEvent.type(emailInput, 'invalid email');
    userEvent.click(isAgreeCheck);
    userEvent.click(submitButton);

    expect(await screen.findByText('Некорректный email')).toBeInTheDocument();
  });

  test('wrong password input', async () => {
    const passwordInput = screen.getByPlaceholderText('Пароль');
    const submitButton = screen.getByText('Зарегестрироваться');
    const isAgreeCheck = screen.getByText(
      'Я согласен с условиями политики конфиденциальности'
    );

    userEvent.type(passwordInput, 'short');
    userEvent.click(isAgreeCheck);
    userEvent.click(submitButton);
    expect(await screen.findByText('Не менее 8 символов')).toBeInTheDocument();
  });
});
