import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import PasswordField from './PasswordField';

describe('Test password field', () => {
  const props = {
    label: 'Password',
    labelClassName: 'label',
    inputClassName: 'input',
    placeholder: 'Enter password',
  };

  beforeEach(() => {
    render(<PasswordField {...props} />);
  });

  it('Label exists', () => {
    const labelElement = screen.getByText(props.label);
    expect(labelElement).toBeInTheDocument();
  });

  it('Input exists', () => {
    const inputElement = screen.getByPlaceholderText(props.placeholder);
    expect(inputElement).toBeInTheDocument();
  });

  it('Toggle input type with button', () => {
    const buttonElement: HTMLButtonElement = screen.getByRole('button');
    const inputElement: HTMLInputElement = screen.getByPlaceholderText(
      props.placeholder
    );

    expect(inputElement).toHaveAttribute('type', 'password');
    expect(buttonElement).toHaveClass(`${props.inputClassName}-view`);

    fireEvent.click(buttonElement);
    expect(inputElement).toHaveAttribute('type', 'text');
    expect(buttonElement).toHaveClass(`${props.inputClassName}-view-active`);

    fireEvent.click(buttonElement);
    expect(inputElement).toHaveAttribute('type', 'password');
    expect(buttonElement).toHaveClass(`${props.inputClassName}-view`);
  });
});
