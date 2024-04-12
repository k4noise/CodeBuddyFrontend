import './Questions.css';
import Avatar1Image from '../../../assets/avatar1.png';
import Avatar2Image from '../../../assets/avatar2.png';
import Avatar3Image from '../../../assets/avatar3.png';
import Pic1Image from '../../../assets/pic1.png';
import Pic2Image from '../../../assets/pic2.png';
import Pic3Image from '../../../assets/pic3.jpg';
import Pic4Image from '../../../assets/pic4.jpg';
import Question, { QuestionProps } from '../../../components/Question/Question';
import TextArea from '../../../components/TextArea/TextArea';

const QUESTIONS: QuestionProps[] = [
  {
    avatar: Avatar2Image,
    authorName: 'Мария Иванова',
    question: `У меня возник вопрос, как выполнить такую задачу
не могу решить такую проблему, подскажите пути решения?`,
    images: [Pic1Image, Pic2Image, Pic3Image],
    likes: 2,
    comments: [
      {
        avatar: Avatar3Image,
        username: 'Сергей Иванов',
        date: '23.03.24',
        comment: 'Это задача решается таким образом ',
      },
      {
        avatar: Avatar1Image,
        username: 'Иван Иванов',
        date: '23.03.24',
        comment: 'Это задача решается таким образом ',
        isMine: true,
      },
    ],
  },
  {
    avatar: Avatar2Image,
    authorName: 'Мария Иванова',
    question: `У меня возник вопрос, как выполнить такую задачу
не могу решить такую проблему, подскажите пути решения?`,
    images: [Pic4Image, Pic1Image, Pic3Image],
    likes: 2,
    comments: [
      {
        avatar: Avatar3Image,
        username: 'Сергей Иванов',
        date: '23.03.24',
        comment: 'Это задача решается таким образом ',
      },
      {
        avatar: Avatar1Image,
        username: 'Иван Иванов',
        date: '23.03.24',
        comment: 'Это задача решается таким образом ',
        isMine: true,
      },
    ],
  },
];

const Questions = () => {
  return (
    <section className="questions">
      <h2 className="questions__header">Напиши свой вопрос и получи ответ</h2>
      <form className="questions__form" encType="multipart/form-data">
        <div className="questions__form-wrapper">
          <img
            src={Avatar1Image}
            alt="user avatar"
            className="questions__form-avatar"
          />
          <TextArea
            placeholder="Какой у вас вопрос?"
            className="questions__form-question"
          />
        </div>
        <div className="questions__form-buttons">
          <button type="button" className="questions__form-buttons-upload">
            <input
              type="file"
              multiple
              accept="image/png, image/jpg, image/jpeg"
              className="questions__form-images"
            />
          </button>
          <button type="submit" className="questions__form-submit">
            Отправить
          </button>
        </div>
      </form>
      <div className="questions__wrapper">
        <Question {...QUESTIONS[0]} />
        <Question {...QUESTIONS[1]} />
      </div>
    </section>
  );
};

export default Questions;
