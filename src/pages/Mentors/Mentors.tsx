import MentorCard from '../../components/MentorCard/MentorCard';
import Footer from '../../components/Footer/Footer';
import Tags from '../../components/Tags/Tags';
import HeartManImage from '../../assets/heart-man.png';
import './Mentors.css';
import RequestPopup from '../../components/RequestPopup/RequestPopup';
import { useEffect, useState } from 'react';
import {
  ProfileType,
  RequestPopupType,
  RequestState,
  StudentRequestState,
} from '../../types';
import { MentorData } from '../../actions/dto/user';
import { getMentors, getMentorsByTags } from '../../actions/mentors';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { handleError } from '../../actions/sendRequest';
import { toast } from 'react-toastify';
import { sendRequestToMentor } from '../../actions/request';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';

/**
 * Mentors page
 * Shows mentors cards with mentors credintals
 * @returns {JSX.Element}
 */
const Mentors = () => {
  const navigate = useNavigate();
  const [mentors, setMentors] = useState<MentorData[]>([]);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [isShowingRequest, setIsShowingRequest] = useState(false);
  const { handleSubmit, register } = useForm();
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');

  const profileType: ProfileType = Cookies.get('profileType') as ProfileType;

  const changeRequestState = async (
    id: number,
    newState: RequestState,
    description?: string
  ) => {
    if (newState == StudentRequestState.SEND) {
      const { error } = await sendRequestToMentor(selected, { description });
      if (!error) {
        toast('Заявка отправлена успешно', { type: 'success' });
      } else {
        toast('Произошла ошибка при отправке заявки, попробуйте еще раз', {
          type: 'error',
        });
      }
    }
  };

  const handleCardClick = () => setIsShowingRequest(true);
  const getData = async () => {
    let mentorsWithKeywords, errors;
    if (keyword) {
      const keywords = keyword.split(' ');
      const { data, error } = await getMentorsByTags(keywords);
      mentorsWithKeywords = data;
      errors = error;
    } else {
      const { data, error } = await getMentors();
      mentorsWithKeywords = data;
      errors = error;
    }

    if (errors) handleError(errors, navigate);
    if (mentorsWithKeywords) {
      setMentors(mentorsWithKeywords.mentors);
    }
    if (keywords) setKeywords(mentorsWithKeywords?.keywords);
  };

  useEffect(() => {
    getData();
  }, [keyword]);

  return (
    <>
      <main>
        <section className="about-mentors">
          <div className="about-mentors__info">
            <h2 className="about-mentors__header">Наши менторы </h2>
            <form
              className="about-mentors__search"
              onSubmit={handleSubmit((data) =>
                navigate(`/mentors?keyword=${data.keyword}`)
              )}
            >
              <button className="about-mentors__search-button"></button>
              <input
                type="search"
                {...register('keyword')}
                className="about-mentors__search-input"
                placeholder="Поиск по ключевому слову"
              />
            </form>
            <Tags
              className="about-mentors__tags"
              tags={keywords.slice(0, 15)}
            />
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
                Менторов по заданным критериям нет
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
