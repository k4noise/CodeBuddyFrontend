import { useEffect, useRef } from 'react';
import { RequestPopupType } from '../../types';
import TextArea from '../TextArea/TextArea';
import './RequestPopup.css';

interface RequestPopupProps {
  header: string;
  popupType: RequestPopupType;
  about?: string;
  close: React.FC;
}

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

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog) {
      dialog.showModal();
    }
  }, [onClose]);

  return (
    <dialog className="request-popup" ref={dialogRef} onCancel={onClose}>
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
    </dialog>
  );
};

export default RequestPopup;
