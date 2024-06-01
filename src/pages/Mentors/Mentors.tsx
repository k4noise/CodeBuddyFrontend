import MentorCard from '../../components/MentorCard/MentorCard';
import Footer from '../../components/Footer/Footer';
import Tags from '../../components/Tags/Tags';
import HeartManImage from '../../assets/heart-man.png';
import './Mentors.css';
import RequestPopup from '../../components/RequestPopup/RequestPopup';
import { useEffect, useState } from 'react';
import { ProfileType, RequestPopupType, RequestState } from '../../types';
import { MentorData } from '../../actions/dto/user';
import { getMentors } from '../../actions/mentors';
import { Link, useNavigate } from 'react-router-dom';
import { handleError } from '../../actions/sendRequest';
import { toast } from 'react-toastify';
import { sendRequestToMentor } from '../../actions/request';

const Mentors = () => {
  const navigate = useNavigate();
  const [mentors, setMentors] = useState<MentorData[]>([]);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [isShowingRequest, setIsShowingRequest] = useState(false);

  const profileType: ProfileType = sessionStorage.getItem(
    'profileType'
  ) as ProfileType;

  const changeRequestState = async (
    id: number,
    newState: RequestState,
    description?: string
  ) => {
    if (newState == RequestState.SEND) {
      const { error } = await sendRequestToMentor(selected, { description });
      if (!error) {
        toast('Успешно отправлено', { type: 'success' });
      } else {
        toast('Произошла ошибка при отправке, попробуйте еще раз', {
          type: 'error',
        });
      }
    }
  };

  const handleCardClick = () => setIsShowingRequest(true);
  const getData = async () => {
    const { data, error } = await getMentors();

    if (error) handleError(error, navigate);
    if (data) {
      setMentors(data.mentors);
    }
    if (keywords) setKeywords(data?.keywords);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <main>
        <section className="about-mentors">
          <div className="about-mentors__info">
            <h2 className="about-mentors__header">Наши менторы </h2>
            <form className="about-mentors__search">
              <button className="about-mentors__search-button"></button>
              <input
                type="search"
                className="about-mentors__search-input"
                placeholder="Поиск по ключевому слову"
              />
            </form>
            <Tags className="about-mentors__tags" tags={keywords} />
          </div>
          <div className="about-mentors__image">
            <img src={HeartManImage} alt="heart man" />
          </div>
        </section>
        <section className="mentors">
          <div className="mentors__cards">
            {mentors.length ? (
              mentors?.map((mentor) => (
                <MentorCard
                  {...mentor}
                  onClick={() => {
                    setSelected(mentor.id);
                    handleCardClick();
                  }}
                  key={mentor.id}
                  mentorView={profileType == ProfileType.MENTOR}
                />
              ))
            ) : (
              <span className="message">
                Менторов еще пока нет, но вы <Link to="/register">можете</Link>{' '}
                стать первым!
              </span>
            )}
          </div>
        </section>
      </main>
      {isShowingRequest && (
        <RequestPopup
          header="Оставить заявку на ментора"
          popupType={RequestPopupType.CREATE_VIEW}
          close={() => setIsShowingRequest(false)}
          changeState={changeRequestState}
        />
      )}
      <Footer />
    </>
  );
};

export default Mentors;
