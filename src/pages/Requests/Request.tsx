import { Link } from 'react-router-dom';
import { ProfileType, RequestState } from '../../types';
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
          {RequestState[requestState] == RequestState.SEND &&
          profileType == ProfileType.MENTOR
            ? RequestState.NEW
            : RequestState[requestState]}
        </p>
      </div>
      {profileType == ProfileType.STUDENT ? (
        <div className="request__buttons">
          {RequestState[requestState] == RequestState.ACCEPTED && (
            <Link
              to={`/profile/mentor/${id}`}
              className="request__link request__view"
              data-testid="profileLink"
            ></Link>
          )}
          {/* <button
            className="request__button request__cancel"
            data-testid="cancel"
          ></button> */}
        </div>
      ) : (
        RequestState[requestState] == RequestState.SEND && (
          <div className="request__buttons">
            <button
              className="request__button request__accept"
              data-testid="accept"
              onClick={() => changeRequestState(id, RequestState.ACCEPTED)}
            ></button>
            <button
              className="request__button request__reject"
              data-testid="reject"
              onClick={() => changeRequestState(id, RequestState.REJECTED)}
            ></button>
          </div>
        )
      )}
    </div>
  );
};

export default Request;
