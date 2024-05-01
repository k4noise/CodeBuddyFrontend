import MentorCard from '../../components/MentorCard/MentorCard';
import MentorAvatar from '../../assets/mentor.png';
import Footer from '../../components/Footer/Footer';
import Tags from '../../components/Tags/Tags';
import HeartManImage from '../../assets/heart-man.png';
import './Mentors.css';

const MENTOR_DATA = {
  username: 'Петр Петров',
  avatarUrl: MentorAvatar,
  about: 'Я ментор уже на протяжении 5 лет, помогаю в решении любых вопросов',
  tags: ['ментор', 'опыт 5 лет', 'джава', 'языки'],
};

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
            <Tags className="about-mentors__tags" tags={SERACH_TAGS} />
          </div>
          <div className="about-mentors__image">
            <img src={HeartManImage} alt="heart man" />
          </div>
        </section>
        <section className="mentors">
          <div className="mentors__cards">
            <MentorCard {...MENTOR_DATA} />
            <MentorCard {...MENTOR_DATA} />
            <MentorCard {...MENTOR_DATA} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Mentors;
