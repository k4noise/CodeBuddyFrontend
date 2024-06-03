import Request from './Request';
import Footer from '../../components/Footer/Footer';
import { ProfileType, RequestPopupType, RequestState } from '../../types';
import './Request.css';
import RequestPopup from '../../components/RequestPopup/RequestPopup';
import { useEffect, useState } from 'react';
import { Request as RequestDto } from '../../actions/dto/request';
import { getRequests, respondToRequest } from '../../actions/request';
import { handleError } from '../../actions/sendRequest';
import { useNavigate } from 'react-router-dom';
import { getProfileData } from '../../actions/profile';

/**
 * Requests component
 * Shows requests page (student or mentor)
 * @component
 * @returns {JSX.Element}
 */

const Requests = () => {
  let profileType: ProfileType = sessionStorage.getItem(
    'profileType'
  ) as ProfileType;
  let userDataCache = {};

  const [requests, setRequests] = useState<RequestDto[]>([]);
  const [isShowingRequest, setShowingRequest] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState({});
  const navigate = useNavigate();

  const updateRequestState = (id: number, newState: string) =>
    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id ? { ...request, requestState: newState } : request
      )
    );

  const changeRequestState = async (id: number, newState: RequestState) => {
    switch (newState) {
      case RequestState.ACCEPTED:
        await respondToRequest('ACCEPTED', id);
        updateRequestState(id, 'ACCEPTED');
        break;
      case RequestState.REJECTED:
        await respondToRequest('REJECTED', id);
        updateRequestState(id, 'REJECTED');
        break;
    }
  };

  const handleCardClick = (card: any) => {
    setSelectedRequest(card);
    setShowingRequest(true);
  };

  const getData = async () => {
    profileType = sessionStorage.getItem('profileType') as ProfileType;
    const anotherProfileType =
      profileType == ProfileType.STUDENT
        ? ProfileType.MENTOR
        : ProfileType.STUDENT;
    const { data, error } = await getRequests(profileType);

    if (error) handleError(error, navigate);
    if (data) {
      const requestsWithUserData = [];
      for (let request of data) {
        const userId =
          anotherProfileType == ProfileType.STUDENT
            ? request.studentId
            : request.mentorId;

        if (!userDataCache[userId]) {
          const { data: userData } = await getProfileData(
            false,
            false,
            anotherProfileType,
            userId
          );
          userDataCache[userId] = userData;
        }

        requestsWithUserData.push({
          id: request.id,
          mentorId: userDataCache[userId]?.id,
          requestState: request.requestState,
          description: request.description,
          firstName: userDataCache[userId]?.firstName,
          lastName: userDataCache[userId]?.lastName,
          photoUrl: userDataCache[userId]?.photoUrl,
        });
      }
      setRequests(requestsWithUserData.reverse());
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="requests">
        <h2 className="requests__header">Мои заявки</h2>
        <div className="requests__wrapper">
          {requests?.map((req) => (
            <Request
              key={req.id}
              {...req}
              onClick={() => handleCardClick(req)}
              profileType={profileType}
              changeRequestState={changeRequestState}
              requestState={req.requestState}
            />
          ))}
        </div>
      </div>
      {isShowingRequest && (
        <RequestPopup
          id={selectedRequest?.id}
          header={
            profileType == ProfileType.STUDENT
              ? 'Моя заявка'
              : `Заявка от ${selectedRequest?.firstName ?? ''} ${
                  selectedRequest?.lastName ?? ''
                }`
          }
          popupType={
            profileType == ProfileType.STUDENT
              ? RequestPopupType.STUDENT_VIEW
              : RequestState[selectedRequest.requestState] == RequestState.SEND
              ? RequestPopupType.MENTOR_VIEW
              : RequestPopupType.SHOW_VIEW
          }
          about={selectedRequest?.description}
          close={() => setShowingRequest(false)}
          changeState={changeRequestState}
        />
      )}
      <Footer />
    </>
  );
};

export default Requests;
