import Request from './Request';
import Footer from '../../components/Footer/Footer';
import {
  ProfileType,
  RequestPopupType,
  StudentRequestState,
} from '../../types';
import './Request.css';
import RequestPopup from '../../components/RequestPopup/RequestPopup';
import { useEffect, useState } from 'react';
import { Request as RequestDto } from '../../actions/dto/request';
import { getRequests, respondToRequest } from '../../actions/request';
import { handleError } from '../../actions/sendRequest';
import { useNavigate } from 'react-router-dom';
import { getProfileData } from '../../actions/profile';
import Cookies from 'js-cookie';

/**
 * Requests component
 * Shows requests page (student or mentor)
 * @component
 * @returns {JSX.Element}
 */

const Requests = () => {
  let profileType: ProfileType = Cookies.get('profileType') as ProfileType;
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

  const changeRequestState = async (
    id: number,
    newState: StudentRequestState
  ) => {
    switch (newState) {
      case StudentRequestState.ACCEPTED:
        await respondToRequest('ACCEPTED', id);
        updateRequestState(id, 'ACCEPTED');
        break;
      case StudentRequestState.REJECTED:
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
    profileType = Cookies.get('profileType') as ProfileType;
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
          mentorId: request?.mentorId,
          studentId: request?.studentId,
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
          {requests.length ? (
            requests.map((req) => (
              <Request
                key={req.id}
                {...req}
                onClick={() => handleCardClick(req)}
                profileType={profileType}
                changeRequestState={changeRequestState}
                requestState={req.requestState}
              />
            ))
          ) : (
            <div>Нет заявок</div>
          )}
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
              : StudentRequestState[selectedRequest.requestState] ==
                StudentRequestState.SEND
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
