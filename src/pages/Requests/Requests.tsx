import Request from './Request';
import Footer from '../../components/Footer/Footer';
import AvatarImage from '../../assets/mentor.png';
import { ProfileType, RequestPopupType, RequestType } from '../../types';
import './Request.css';
import RequestPopup from '../../components/RequestPopup/RequestPopup';
import { useState } from 'react';

const REQUEST_STUDENT_DATA = {
  profileType: ProfileType.STUDENT,
  username: 'Петр Петров',
  avatarUrl: AvatarImage,
  about: 'У меня проблема такая',
};

const REQUEST_MENTOR_DATA = {
  profileType: ProfileType.MENTOR,
  username: 'Петр Петров',
  avatarUrl: AvatarImage,
  status: RequestType.NEW,
  about: 'У меня проблема такая',
};

const ACCEPTED_REQUEST = {
  ...REQUEST_STUDENT_DATA,
  status: RequestType.ACCEPTED,
};

const REJECTED_REQUEST = {
  ...REQUEST_STUDENT_DATA,
  status: RequestType.REJECTED,
};

const SUBMITTED_REQUEST = {
  ...REQUEST_STUDENT_DATA,
  status: RequestType.SUBMITTED,
};

interface RequestsProps {
  /* student or mentor */
  profileType: ProfileType;
}
/**
 * Requests component
 * Shows requests page (student or mentor)
 * @param {ProfileType} profileType look at interface
 * @returns {JSX.Element}
 */

const Requests = ({ profileType }: RequestsProps) => {
  const [isShowingRequest, setShowingRequest] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState({});

  const handleCardClick = (card: any) => {
    console.log(card);
    setSelectedRequest(card);
    setShowingRequest(true);
  };

  return (
    <>
      <div className="requests">
        <h2 className="requests__header">Мои заявки</h2>
        {profileType == ProfileType.STUDENT ? (
          <div className="requests__wrapper">
            <Request
              {...ACCEPTED_REQUEST}
              onClick={() => handleCardClick(ACCEPTED_REQUEST)}
            />
            <Request
              {...REJECTED_REQUEST}
              onClick={() => handleCardClick(REJECTED_REQUEST)}
            />
            <Request
              {...SUBMITTED_REQUEST}
              onClick={() => handleCardClick(ACCEPTED_REQUEST)}
            />
            <Request
              {...ACCEPTED_REQUEST}
              onClick={() => handleCardClick(ACCEPTED_REQUEST)}
            />
            <Request
              {...REJECTED_REQUEST}
              onClick={() => handleCardClick(REJECTED_REQUEST)}
            />
            <Request
              {...SUBMITTED_REQUEST}
              onClick={() => handleCardClick(SUBMITTED_REQUEST)}
            />
          </div>
        ) : (
          <div className="requests__wrapper">
            <Request
              {...REQUEST_MENTOR_DATA}
              onClick={() => handleCardClick(REQUEST_MENTOR_DATA)}
            />
            <Request
              {...REQUEST_MENTOR_DATA}
              onClick={() => handleCardClick(REQUEST_MENTOR_DATA)}
            />
            <Request
              {...REQUEST_MENTOR_DATA}
              onClick={() => handleCardClick(REQUEST_MENTOR_DATA)}
            />
            <Request
              {...REQUEST_MENTOR_DATA}
              onClick={() => handleCardClick(REQUEST_MENTOR_DATA)}
            />
            <Request
              {...REQUEST_MENTOR_DATA}
              onClick={() => handleCardClick(REQUEST_MENTOR_DATA)}
            />
            <Request
              {...REQUEST_MENTOR_DATA}
              onClick={() => handleCardClick(REQUEST_MENTOR_DATA)}
            />
          </div>
        )}
      </div>
      {isShowingRequest && (
        <RequestPopup
          header={
            profileType === ProfileType.STUDENT
              ? 'Моя заявка'
              : `Заявка от ${selectedRequest?.username}`
          }
          popupType={
            profileType === ProfileType.STUDENT
              ? RequestPopupType.STUDENT_VIEW
              : RequestPopupType.MENTOR_VIEW
          }
          about={selectedRequest?.about}
          close={() => setShowingRequest(false)}
        />
      )}
      <Footer />
    </>
  );
};

export default Requests;
