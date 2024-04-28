import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { assert } from 'chai';
import InputField from './InputField';
import '@testing-library/jest-dom';

describe('Test input', () => {
  const props = {
    isEdit: true,
    label: 'Name',
    value: 'John Doe',
    labelClassName: 'label',
    inputClassName: 'input',
  };

  it('Label exists', () => {
    const { container } = render(<InputField {...props} />);
    const labelElement = container.querySelector(props.labelClassName);
    const spanElement = screen.getByText(props.label);

    expect(spanElement).toBeInTheDocument();
    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveClass(props.labelClassName);
  });

  it('Input exists', () => {
    render(<InputField {...props} />);
    const inputElement = screen.getByDisplayValue(props.value);

    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('type', 'text');
    expect(inputElement).toHaveAttribute('readonly');
    expect(inputElement).toHaveClass(props.inputClassName);
  });

  it('Button exists with truthy isEdit', () => {
    render(<InputField {...props} />);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();
  });

  it("Button doesn't exists without truthy isEdit", () => {
    const readonlyProps = { ...props, isEdit: false };
    render(<InputField {...readonlyProps} />);
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('Check input state on button toggle', () => {
    render(<InputField {...props} />);
    const buttonElement = screen.getByRole('button');
    const inputElement = screen.getByDisplayValue(props.value);

    expect(inputElement).toHaveAttribute('readonly');
    expect(buttonElement).not.toHaveClass(
      `${props.inputClassName}-edit-active`
    );

    fireEvent.click(buttonElement);
    expect(inputElement).not.toHaveAttribute('readonly');
    expect(buttonElement).toHaveClass(`${props.inputClassName}-edit-active`);

    fireEvent.click(buttonElement);
    expect(inputElement).toHaveAttribute('readonly');
    expect(buttonElement).not.toHaveClass(
      `${props.inputClassName}-edit-active`
    );
  });
});
