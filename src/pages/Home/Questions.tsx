import './Questions.css';
import Avatar1 from '../../assets/avatar1.png';
import Avatar2 from '../../assets/avatar2.png';
import Avatar3 from '../../assets/avatar3.png';
import Pic1 from '../../assets/pic1.png';
import Pic2 from '../../assets/pic2.png';
import Pic3 from '../../assets/pic3.jpg';
import Pic4 from '../../assets/pic4.jpg';
import Question from '../../components/Question/Question';

const Questions = () => {
  return (
    <section className="questions">
      <h2 className="questions__header">Напиши свой вопрос и получи ответ</h2>
      <form className="questions__form" encType="multipart/form-data">
        <div className="questions__form-wrapper">
          <img
            src={Avatar1}
            alt="user avatar"
            className="questions__form-avatar"
          />
          <textarea
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
        <Question
          avatar={Avatar2}
          authorName="Мария Иванова"
          question="У меня возник вопрос, как выполнить такую задачу
не могу решить такую проблему, подскажите пути решения?"
          images={[Pic1, Pic2, Pic3]}
          likes={2}
          comments={[
            {
              avatar: Avatar3,
              username: 'Сергей Иванов',
              date: '23.03.24',
              comment: 'Это задача решается таким образом ',
            },
            {
              avatar: Avatar1,
              username: 'Иван Иванов',
              date: '23.03.24',
              comment: 'Это задача решается таким образом ',
              isMine: true,
            },
          ]}
        />
        <Question
          avatar={Avatar2}
          authorName="Мария Иванова"
          question="У меня возник вопрос, как выполнить такую задачу
не могу решить такую проблему, подскажите пути решения?"
          images={[Pic4, Pic1, Pic3]}
          likes={2}
          comments={[
            {
              avatar: Avatar3,
              username: 'Сергей Иванов',
              date: '23.03.24',
              comment: 'Это задача решается таким образом ',
            },
            {
              avatar: Avatar1,
              username: 'Иван Иванов',
              date: '23.03.24',
              comment: 'Это задача решается таким образом ',
              isMine: true,
            },
          ]}
        />
      </div>
    </section>
  );
};

export default Questions;
