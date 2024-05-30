import Request from './Request';
import Footer from '../../components/Footer/Footer';
import AvatarImage from '../../assets/mentor.png';
import { ProfileType, RequestPopupType, RequestType } from '../../types';
import './Request.css';
import RequestPopup from '../../components/RequestPopup/RequestPopup';
import { useEffect, useState } from 'react';
import { Request as RequestDto } from '../../actions/dto/request';
import { getRequests } from '../../actions/request';
import { handleError } from '../../actions/sendRequest';
import { useNavigate } from 'react-router-dom';
import { getProfileData } from '../../actions/profile';

const REQUEST_MENTOR_DATA = {
  profileType: ProfileType.MENTOR,
  username: 'Петр Петров',
  avatarUrl: AvatarImage,
  status: RequestType.NEW,
  about: 'У меня проблема такая',
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
  const [requests, setRequests] = useState<RequestDto[]>([]);
  const [isShowingRequest, setShowingRequest] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState({});
  const navigate = useNavigate();

  const handleCardClick = (card: any) => {
    setSelectedRequest(card);
    setShowingRequest(true);
  };

  const getData = async () => {
    const { data, error } = await getRequests(profileType);

    if (error) handleError(error, navigate);
    if (data) {
      const requestsWithUserData = [];
      for (let request of data) {
        const { data: userData } = await getProfileData(
          false,
          ProfileType.MENTOR,
          request.mentorId
        );
        requestsWithUserData.push({
          requestState: request.requestState,
          description: request.description,
          firstName: userData?.firstName,
          lastName: userData?.lastName,
          photoUrl: userData?.photoUrl,
        });
      }
      setRequests(requestsWithUserData);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="requests">
        <h2 className="requests__header">Мои заявки</h2>
        {profileType == ProfileType.STUDENT ? (
          <div className="requests__wrapper">
            {requests?.map((req) => (
              <Request
                {...req}
                onClick={() => handleCardClick(req)}
                profileType={ProfileType.STUDENT}
              />
            ))}
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
            profileType == ProfileType.STUDENT
              ? 'Моя заявка'
              : `Заявка от ${selectedRequest?.username}`
          }
          popupType={
            profileType == ProfileType.STUDENT
              ? RequestPopupType.STUDENT_VIEW
              : RequestPopupType.MENTOR_VIEW
          }
          about={selectedRequest?.description}
          close={() => setShowingRequest(false)}
        />
      )}
      <Footer />
    </>
  );
};

export default Requests;
