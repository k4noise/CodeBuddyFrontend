import { useEffect, useRef, useState } from 'react';
import { RequestPopupType } from '../../types';
import TextArea from '../TextArea/TextArea';
import './RequestPopup.css';
import { useForm } from 'react-hook-form';
import { sendRequestToMentor } from '../../actions/request';
import { toast } from 'react-toastify';

enum PopupButtonType {
  SEND,
  REJECT,
  ACCEPT,
}

interface RequestPopupProps {
  /* main popup header */
  header: string;
  /* look at interface */
  popupType: RequestPopupType;
  /* text if exists */
  about?: string;
  /* parent callback to close popup */
  close: React.MouseEventHandler;
  userId: number;
}

/**
 * Request popup component
 * Shows popup with credintals of request
 * @param {React.MouseEventHandler} close parent callback to close popup
 * @param {string} header main popup header
 * @param {RequestPopupType} popupType look at interface
 * @param {string?} about text if exists
 * @returns {JSX.Element}
 */
const RequestPopup = ({
  close,
  header,
  popupType,
  about,
  userId,
}: RequestPopupProps) => {
  const [button, setButton] = useState<null | PopupButtonType>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const onClose = () => {
    close();
  };

  const onOutsideClick = (event: MouseEvent) => {
    if (event.target === dialogRef.current) close();
  };

  useEffect(() => {
    if (process.env.NODE_ENV === 'test') {
      return;
    }
    const dialog = dialogRef.current;
    dialog?.showModal();
  }, [onClose]);

  const { register, handleSubmit } = useForm();

  return (
    <dialog
      ref={dialogRef}
      onCancel={onClose}
      onClick={onOutsideClick}
      data-testid="dialog"
    >
      <form
        className="request-popup"
        onSubmit={handleSubmit(async (d) => {
          switch (button) {
            case PopupButtonType.SEND:
              const { error } = await sendRequestToMentor(userId, d);
              if (!error) {
                toast('Успешно отправлено', { type: 'success' });
                onClose();
              } else {
                toast('Произошла ошибка при отправке, попробуйте еще раз', {
                  type: 'error',
                });
              }
              break;
          }
        })}
      >
        <h3 className="request-popup__header">{header}</h3>
        <br />
        <p className="request-popup__subheader">Описание проблемы</p>
        <TextArea
          placeholder="Введите текст"
          className="request-popup__textarea"
          readonly={popupType !== RequestPopupType.CREATE_VIEW}
          value={about}
          validationOptions={register('description')}
        />
        {popupType === RequestPopupType.CREATE_VIEW && (
          <button
            className="request-popup__send"
            onClick={() => setButton(PopupButtonType.SEND)}
          >
            Отправить
          </button>
        )}
        {popupType === RequestPopupType.MENTOR_VIEW && (
          <div className="request-popup__buttons-wrapper">
            <button onClick={() => setButton(PopupButtonType.REJECT)}>
              Отклонить
            </button>
            <button onClick={() => setButton(PopupButtonType.ACCEPT)}>
              Принять
            </button>
          </div>
        )}
      </form>
    </dialog>
  );
};

export default RequestPopup;
