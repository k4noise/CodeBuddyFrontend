import MentorCard from '../../components/MentorCard/MentorCard';
import MentorAvatar from '../../assets/mentor.png';
import Footer from '../../components/Footer/Footer';
import Tags from '../../components/Tags/Tags';
import HeartManImage from '../../assets/heart-man.png';
import './Mentors.css';
import RequestPopup from '../../components/RequestPopup/RequestPopup';
import { useEffect, useState } from 'react';
import { RequestPopupType } from '../../types';
import { MentorData } from '../../actions/dto/user';
import { getMentors } from '../../actions/mentors';
import { Link, useNavigate } from 'react-router-dom';
import { handleError } from '../../actions/sendRequest';
import { getImageFromGoogleDrive } from '../../actions/profile';
import { spawn } from 'child_process';

const SERACH_TAGS = [
  'ментор',
  'опыт 5 лет',
  'джава',
  'дизайн',
  'языки',
  'фронт',
  'онлайн',
];

const Mentors = () => {
  const navigate = useNavigate();
  const [mentors, setMentors] = useState<MentorData[]>([]);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [isShowingRequest, setIsShowingRequest] = useState(false);

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
            <label className="about-mentors__search">
              <button className="about-mentors__search-button"></button>
              <input
                type="search"
                className="about-mentors__search-input"
                placeholder="Поиск по ключевому слову"
              />
            </label>
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
                  onClick={() => handleCardClick()}
                  key={mentor.id}
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
        />
      )}
      <Footer />
    </>
  );
};

export default Mentors;
