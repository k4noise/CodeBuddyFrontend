import { useEffect, useRef } from 'react';
import { RequestPopupType } from '../../types';
import TextArea from '../TextArea/TextArea';
import './RequestPopup.css';

interface RequestPopupProps {
  /* main popup header */
  header: string;
  /* look at interface */
  popupType: RequestPopupType;
  /* text if exists */
  about?: string;
  /* parent callback to close popup */
  close: React.MouseEventHandler;
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
}: RequestPopupProps) => {
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

  return (
    <dialog
      ref={dialogRef}
      onCancel={onClose}
      onClick={onOutsideClick}
      data-testid="dialog"
    >
      <div className="request-popup">
        <h3 className="request-popup__header">{header}</h3>
        <br />
        <p className="request-popup__subheader">Описание проблемы</p>
        <TextArea
          placeholder="Введите текст"
          className="request-popup__textarea"
          readonly={popupType !== RequestPopupType.CREATE_VIEW}
          value={about}
        />
        {popupType === RequestPopupType.CREATE_VIEW && (
          <button className="request-popup__send">Отправить</button>
        )}
        {popupType === RequestPopupType.MENTOR_VIEW && (
          <div className="request-popup__buttons-wrapper">
            <button>Отклонить</button>
            <button>Принять</button>
          </div>
        )}
      </div>
    </dialog>
  );
};

export default RequestPopup;