import './Questions.css';
import Avatar1Image from '../../../assets/avatar1.png';
import Question, { QuestionProps } from '../../../components/Question/Question';
import TextArea from '../../../components/TextArea/TextArea';
import { useEffect, useState } from 'react';
import ImageGallery from '../ImageGallery/ImageGallery';
import { useAuth } from '../../../AuthProvider';
import { toast } from 'react-toastify';
import { ProfileType } from '../../../types';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { createPost, getPostById, getPosts } from '../../../actions/post';
import { Post } from '../../../actions/dto/post';

const MAX_IMAGE_COUNT = 3;

// const QUESTIONS: QuestionProps[] = [
//   {
//     avatar: Avatar2Image,
//     authorName: 'Мария Иванова',
//     question: `У меня возник вопрос, как выполнить такую задачу
// не могу решить такую проблему, подскажите пути решения?`,
//     images: [Pic1Image, Pic2Image, Pic3Image],
//     likes: 2,
//     comments: [
//       {
//         avatar: Avatar3Image,
//         username: 'Сергей Иванов',
//         date: '23.03.24',
//         comment: 'Это задача решается таким образом ',
//       },
//       {
//         avatar: Avatar1Image,
//         username: 'Иван Иванов',
//         date: '23.03.24',
//         comment: 'Это задача решается таким образом ',
//         isMine: true,
//       },
//     ],
//   },
//   {
//     avatar: Avatar2Image,
//     authorName: 'Мария Иванова',
//     question: `У меня возник вопрос, как выполнить такую задачу
// не могу решить такую проблему, подскажите пути решения?`,
//     images: [Pic4Image, Pic1Image, Pic3Image],
//     likes: 2,
//     comments: [
//       {
//         avatar: Avatar3Image,
//         username: 'Сергей Иванов',
//         date: '23.03.24',
//         comment: 'Это задача решается таким образом ',
//       },
//       {
//         avatar: Avatar1Image,
//         username: 'Иван Иванов',
//         date: '23.03.24',
//         comment: 'Это задача решается таким образом ',
//         isMine: true,
//       },
//     ],
//   },
// ];

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
  const { avatar, auth } = useAuth();
  const [images, setImages] = useState([]);
  const [files, setFiles] = useState([]);
  const [questions, setQuestions] = useState([]);
  const { handleSubmit, register, reset } = useForm();
  let userAvatar = avatar;
  userAvatar =
    userAvatar !== null && userAvatar !== 'null' ? userAvatar : Avatar1Image;
  const profileType: ProfileType = sessionStorage.getItem(
    'profileType'
  ) as ProfileType;

  const getQuestions = async () => {
    const { error, data } = await getPosts();
    if (error) toast('Произошла ошибка при загрузке данных', { type: 'error' });
    setQuestions(data.content.reverse());
  };

  useEffect(() => {
    getQuestions();
  }, []);

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const inputFile: File = event.target.files[0];
    setFiles((prev) => [...prev, inputFile]);
    if (files.length === MAX_IMAGE_COUNT)
      toast('Загружено максимальное количество файлов', { type: 'warning' });

    const reader = new FileReader();
    reader.onload = () => {
      setImages((prevImages) => [...prevImages, reader.result as string]);
      event.target.value = '';
    };
    reader.readAsDataURL(inputFile);
  };

  const handleFormSubmit = async (d) => {
    const { data } = await createPost(d.description, files);
    const { data: postData } = await getPostById(data.postId);
    setQuestions((prev) => [postData, ...prev]);
    setFiles([]);
    setImages([]);
    reset();
    toast('Вопрос опубликован', { type: 'success' });
  };

  const handleDeleteImage = (imageId: number) => {
    setImages((prevImages) =>
      prevImages.filter((_, index) => index !== imageId)
    );
    setFiles((prevFiles) => prevFiles.filter((_, index) => index !== imageId));
  };

  return (
    <section className="questions">
      <h2 className="questions__header">Напиши свой вопрос и получи ответ</h2>
      {(profileType == ProfileType.STUDENT || !auth) && (
        <form
          className="questions__form"
          encType="multipart/form-data"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          {!auth && (
            <div className="questions__form-anonym">
              Вопрос могут задать только{' '}
              <Link to="/register">зарегестрированные</Link> студенты
            </div>
          )}
          <div className="questions__form-wrapper">
            <img
              src={userAvatar}
              alt="user avatar"
              className="questions__form-avatar"
            />
            <TextArea
              placeholder="Какой у вас вопрос? (не более 255 символов)"
              className="questions__form-question"
              max={255}
              validationOptions={register('description')}
            />
          </div>
          <ImageGallery
            images={images}
            editMode={true}
            onDeleteClick={handleDeleteImage}
          />

          <div className="questions__form-buttons">
            <button
              type="button"
              className="questions__form-buttons-upload"
              disabled={images.length === MAX_IMAGE_COUNT}
            >
              <input
                type="file"
                accept="image/png, image/jpg, image/jpeg"
                className="questions__form-images"
                onChange={handleUpload}
                disabled={images.length === MAX_IMAGE_COUNT}
              />
            </button>
            <button type="submit" className="questions__form-submit">
              Отправить
            </button>
          </div>
        </form>
      )}
      <div className="questions__wrapper">
        {questions &&
          questions.map((question) => (
            <Question {...question} key={question.postId} />
          ))}
      </div>
    </section>
  );
};

export default Questions;
