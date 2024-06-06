import { Link } from 'react-router-dom';
import {
  MentorRequestState,
  ProfileType,
  StudentRequestState,
  RequestState,
} from '../../types';
import { getAvatar } from '../../actions/util';

interface RequestProps {
  id: number;
  /* student or mentor */
  profileType: ProfileType;
  /* display name */
  firstName: string;
  lastName: string;
  /* avatar url */
  photoUrl: string;
  /* request status */
  requestState: RequestState;
  /* callback to call when modal closing */
  onClick: React.MouseEventHandler;
  changeRequestState: (id: number, newState: RequestState) => void;
  mentorId?: number;
  studentId?: number;
}
/**
 * Request component
 * Shows request card - info about student/mentor, status and actions
 * @component
 * @param {ProfileType} profileType look at interface
 * @param {string} username user display name
 * @param {string} avatarUrl avatar url
 * @param {RequestState} status request status
 * @param {React.MouseEventHandler} onClick callback to call when modal closing
 * @returns {JSX.Element} Request component
 */

const Request = ({
  id,
  profileType,
  firstName,
  lastName,
  photoUrl,
  requestState,
  onClick,
  changeRequestState,
  mentorId,
  studentId,
}: RequestProps) => {
  const handleClick = (event) => {
    if (!event.target.className.includes('request__button')) onClick();
  };

  return (
    <div className="request" onClick={handleClick}>
      <img
        src={getAvatar(
          photoUrl,
          profileType == ProfileType.STUDENT
            ? ProfileType.MENTOR
            : ProfileType.STUDENT
        )}
        alt={`${firstName} avatar`}
        className="request__avatar"
      />
      <div>
        <p className="request__username">{`${firstName} ${lastName}`}</p>
        <p className="request__status">
          {profileType == ProfileType.STUDENT
            ? StudentRequestState[requestState]
            : MentorRequestState[requestState]}
        </p>
      </div>

      <div className="request__buttons">
        {StudentRequestState[requestState] == StudentRequestState.ACCEPTED && (
          <Link
            to={
              profileType == ProfileType.STUDENT
                ? `/profile/request/mentor/${mentorId}`
                : `/profile/request/student/${studentId}`
            }
            className="request__link request__view"
            data-testid="profileLink"
          ></Link>
        )}
        {profileType == ProfileType.MENTOR &&
          MentorRequestState[requestState] == MentorRequestState.SEND && (
            <>
              <button
                className="request__button request__accept"
                data-testid="accept"
                onClick={() =>
                  changeRequestState(id, StudentRequestState.ACCEPTED)
                }
              ></button>
              <button
                className="request__button request__reject"
                data-testid="reject"
                onClick={() =>
                  changeRequestState(id, StudentRequestState.REJECTED)
                }
              ></button>
            </>
          )}
      </div>
    </div>
  );
};

export default Request;
