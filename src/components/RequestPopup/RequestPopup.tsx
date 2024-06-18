import { useEffect, useRef, useState } from 'react';
import {
  MentorRequestState,
  RequestPopupType,
  RequestState,
  StudentRequestState,
} from '../../types';
import TextArea from '../TextArea/TextArea';
import './RequestPopup.css';
import { useForm } from 'react-hook-form';

interface RequestPopupProps {
  /* request id if present */
  id?: number;
  /* main popup header */
  header: string;
  /* look at interface */
  popupType: RequestPopupType;
  /* text if exists */
  about?: string;
  /* parent callback to close popup */
  close: React.MouseEventHandler;
  /* callback to reply a request */
  changeState: (
    id: number,
    newState: StudentRequestState,
    description?: string
  ) => Promise<void>;
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
  id,
  close,
  header,
  popupType,
  about,
  changeState,
}: RequestPopupProps) => {
  const [newType, setNewType] = useState<null | RequestState>(null);
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
          await changeState(id, newType, d.description);
          onClose();
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
            onClick={() => setNewType(StudentRequestState.SEND)}
          >
            Отправить
          </button>
        )}
        {popupType == RequestPopupType.MENTOR_VIEW && (
          <div className="request-popup__buttons-wrapper">
            <button onClick={() => setNewType(MentorRequestState.REJECTED)}>
              Отклонить
            </button>
            <button onClick={() => setNewType(MentorRequestState.ACCEPTED)}>
              Принять
            </button>
          </div>
        )}
      </form>
    </dialog>
  );
};

export default RequestPopup;
