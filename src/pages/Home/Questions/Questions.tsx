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
import { useState } from 'react';
import ImageGallery from '../ImageGallery/ImageGallery';
import { useAuth } from '../../../AuthProvider';

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

/**
 * Questions component
 * Shows questions (Question component) with form to upload new question
 * About form: files can be uploaded again after they have been uploaded
 * @component
 * @example
 * ```
 * <Questions />
 * ```
 * @returns {JSX.Element}
 */
const Questions = (): JSX.Element => {
  const { avatar } = useAuth();
  const [images, setImages] = useState([]);
  let userAvatar = avatar;
  userAvatar =
    userAvatar !== null && userAvatar !== 'null' ? userAvatar : Avatar1Image;

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const inputFiles: FileList = event.target.files;
    const filesArray: File[] = Array.from(inputFiles);

    Promise.all(
      filesArray.map((file: File) => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });
      })
    ).then((imagesArray: string[]) => {
      setImages((oldImages) => [...oldImages, ...imagesArray]);
      event.target.value = '';
    });
  };

  const handleDeleteImage = (imageId: number) => {
    setImages((prevImages) =>
      prevImages.filter((_, index) => index !== imageId)
    );
  };

  return (
    <section className="questions">
      <h2 className="questions__header">Напиши свой вопрос и получи ответ</h2>
      <form className="questions__form" encType="multipart/form-data">
        <div className="questions__form-wrapper">
          <img
            src={userAvatar}
            alt="user avatar"
            className="questions__form-avatar"
          />
          <TextArea
            placeholder="Какой у вас вопрос?"
            className="questions__form-question"
          />
        </div>
        <ImageGallery
          images={images}
          editMode={true}
          onDeleteClick={handleDeleteImage}
        />

        <div className="questions__form-buttons">
          <button type="button" className="questions__form-buttons-upload">
            <input
              type="file"
              multiple
              accept="image/png, image/jpg, image/jpeg"
              className="questions__form-images"
              onChange={handleUpload}
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
