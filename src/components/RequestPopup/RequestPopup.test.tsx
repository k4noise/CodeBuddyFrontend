import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RequestPopup from './RequestPopup';
import { RequestPopupType } from '../../types';
import { afterEach, describe, expect, it, vi } from 'vitest';

describe('Test request popup', () => {
  const closeHandler = vi.fn();

  afterEach(() => {
    closeHandler.mockClear();
  });

  it('Headers exists', () => {
    render(
      <RequestPopup
        header="Test Header"
        popupType={RequestPopupType.CREATE_VIEW}
        close={closeHandler}
      />
    );

    expect(screen.getByText('Test Header')).toBeInTheDocument();
    expect(screen.getByText('Описание проблемы')).toBeInTheDocument();
  });

  it('Textarea exists', () => {
    render(
      <RequestPopup
        header="Test Header"
        popupType={RequestPopupType.CREATE_VIEW}
        close={closeHandler}
      />
    );

    const textarea = screen.getByPlaceholderText('Введите текст');
    expect(textarea).toBeInTheDocument();
    expect(textarea).not.toHaveAttribute('readonly');

    render(
      <RequestPopup
        header="Test Header"
        popupType={RequestPopupType.MENTOR_VIEW}
        about="Test Description"
        close={closeHandler}
      />
    );

    const readonlyTextarea = screen.getByDisplayValue('Test Description');
    expect(readonlyTextarea).toBeInTheDocument();
    expect(readonlyTextarea).toHaveAttribute('readonly');
  });

  it('Button in CREATE_VIEW exists', () => {
    render(
      <RequestPopup
        header="Test Header"
        popupType={RequestPopupType.CREATE_VIEW}
        close={closeHandler}
      />
    );

    expect(screen.getByText('Отправить')).toBeInTheDocument();
  });

  it('Buttons in MENTOR_VIEW exists', () => {
    render(
      <RequestPopup
        header="Test Header"
        popupType={RequestPopupType.MENTOR_VIEW}
        close={closeHandler}
      />
    );

    expect(screen.getByText('Отклонить')).toBeInTheDocument();
    expect(screen.getByText('Принять')).toBeInTheDocument();
  });

  it('Closes modal on click by backdrop', () => {
    render(
      <RequestPopup
        header="Test Header"
        popupType={RequestPopupType.CREATE_VIEW}
        close={closeHandler}
      />
    );

    const dialog = screen.getByTestId('dialog');
    fireEvent.click(dialog);
    expect(closeHandler).toHaveBeenCalledTimes(1);
  });
});
