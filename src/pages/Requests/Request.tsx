import { Link } from 'react-router-dom';
import { ProfileType, RequestType } from '../../types';

interface RequestProps {
  /* student or mentor */
  profileType: ProfileType;
  /* display name */
  username: string;
  /* avatar url */
  avatarUrl: string;
  /* request status */
  status: RequestType;
  /* callback to call when modal closing */
  onClick: React.MouseEventHandler;
}
/**
 * Request component
 * Shows request card - info about student/mentor, status and actions
 * @component
 * @param {ProfileType} profileType look at interface
 * @param {string} username user display name
 * @param {string} avatarUrl avatar url
 * @param {RequestType} status request status
 * @param {React.MouseEventHandler} onClick callback to call when modal closing
 * @returns {JSX.Element} Request component
 */

const Request = ({
  profileType,
  username,
  avatarUrl,
  status,
  onClick,
}: RequestProps) => {
  return (
    <div className="request" onClick={onClick}>
      <img
        src={avatarUrl}
        alt={`${username} avatar`}
        className="request__avatar"
      />
      <div>
        <p className="request__username">{username}</p>
        <p className="request__status">{status}</p>
      </div>
      {profileType === ProfileType.STUDENT ? (
        <div className="request__buttons">
          {status === RequestType.ACCEPTED && (
            <Link
              to="/profile/123"
              className="request__link request__view"
              data-testid="profileLink"
            ></Link>
          )}
          <button
            className="request__button request__cancel"
            data-testid="cancel"
          ></button>
        </div>
      ) : (
        <div className="request__buttons">
          <button
            className="request__button request__accept"
            data-testid="accept"
          ></button>
          <button
            className="request__button request__reject"
            data-testid="reject"
          ></button>
        </div>
      )}
    </div>
  );
};

export default Request;
