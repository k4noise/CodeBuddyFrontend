import Request from './Request';
import Footer from '../../components/Footer/Footer';
import AvatarImage from '../../assets/mentor.png';
import { ProfileType, RequestType } from '../../types';
import './Request.css';

const REQUEST_STUDENT_DATA = {
  profileType: ProfileType.STUDENT,
  username: 'Петр Петров',
  avatarUrl: AvatarImage,
};

const REQUEST_MENTOR_DATA = {
  profileType: ProfileType.MENTOR,
  username: 'Петр Петров',
  avatarUrl: AvatarImage,
  status: RequestType.NEW,
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
  return (
    <>
      <div className="requests">
        <h2 className="requests__header">Мои заявки</h2>
        {profileType == ProfileType.STUDENT ? (
          <div className="requests__wrapper">
            <Request {...ACCEPTED_REQUEST} />
            <Request {...REJECTED_REQUEST} />
            <Request {...SUBMITTED_REQUEST} />
            <Request {...ACCEPTED_REQUEST} />
            <Request {...REJECTED_REQUEST} />
            <Request {...SUBMITTED_REQUEST} />
          </div>
        ) : (
          <div className="requests__wrapper">
            <Request {...REQUEST_MENTOR_DATA} />
            <Request {...REQUEST_MENTOR_DATA} />
            <Request {...REQUEST_MENTOR_DATA} />
            <Request {...REQUEST_MENTOR_DATA} />
            <Request {...REQUEST_MENTOR_DATA} />
            <Request {...REQUEST_MENTOR_DATA} />
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Requests;
