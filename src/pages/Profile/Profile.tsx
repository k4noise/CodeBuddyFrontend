import TextArea from '../../components/TextArea/TextArea';
import './Profile.css';
import { Link, useNavigate } from 'react-router-dom';

enum ProfileType {
  STUDENT = 'Студент',
  MENTOR = 'Ментор',
}

const possibleTagColors = ['#FFA800', '#1168A7', '#470E8F', '#FF0000'];

const getRandomItem = (arr: string[]) =>
  arr[Math.floor(Math.random() * arr.length)];

interface ProfileProps {
  type: ProfileType;
  isMine: boolean;
  isEdit?: boolean;
  login: string;
  username: string;
  avatar: string;
  email: string;
  tgId: string;
  tags?: string[];
}

const Profile = (props: ProfileProps) => {
  const navigate = useNavigate();

  return (
    <section className="profile">
      <div className="profile__avatar-wrapper">
        <img src={props.avatar} alt="avatar" className="profile__avatar" />
      </div>
      <div className="profile__form-wrapper">
        <form className="profile__form">
          <div className="profile__form-common">
            <span className="profile__username">{props.username}</span>
            {props.isMine && !props?.isEdit && (
              <Link
                to="edit"
                className="profile__form-edit"
                type="button"
              ></Link>
            )}
            {props.isMine && props?.isEdit && (
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="profile__form-save"
              >
                Сохранить
              </button>
            )}
          </div>
          <div className="profile__form-section">
            <label className="profile__form-label">
              Роль :
              <input
                type="text"
                readOnly
                value={props.type}
                className="profile__form-input"
              />
            </label>
            <label
              className={`profile__form-label${
                props.isMine && props?.isEdit
                  ? ' profile__form-label-active'
                  : ''
              }`}
            >
              Почта :
              <input
                type="text"
                readOnly
                value={props.email}
                className="profile__form-input"
              />
              {props.isMine && props?.isEdit && (
                <button
                  type="button"
                  className="profile__form-input-edit"
                ></button>
              )}
            </label>
            <label
              className={`profile__form-label${
                props.isMine && props?.isEdit
                  ? ' profile__form-label-active'
                  : ''
              }`}
            >
              Телеграмм :
              <input
                type="text"
                readOnly
                value={props.tgId}
                className="profile__form-input"
              />
              {props.isMine && props?.isEdit && (
                <button
                  type="button"
                  className="profile__form-input-edit"
                ></button>
              )}
            </label>
          </div>
          {props.isMine && (
            <div className="profile__form-section">
              <h3>Безопасность :</h3>
              <label
                className={`profile__form-label${
                  props.isMine && props?.isEdit
                    ? ' profile__form-label-active'
                    : ''
                }`}
              >
                Логин :
                <input
                  type="text"
                  readOnly
                  value={props.login}
                  className="profile__form-input"
                />
                {props.isMine && props?.isEdit && (
                  <button
                    type="button"
                    className="profile__form-input-edit"
                  ></button>
                )}
              </label>
              {props.isMine && props?.isEdit && (
                <>
                  <label
                    className={`profile__form-label  profile__form-label-active`}
                  >
                    Пароль :
                    <input
                      type="password"
                      readOnly
                      className="profile__form-input"
                    />
                    {props.isMine && props?.isEdit && (
                      <button
                        type="button"
                        className="profile__form-input-view"
                      ></button>
                    )}
                  </label>
                  <label
                    className={`profile__form-label  profile__form-label-active`}
                  >
                    Новый пароль :
                    <input
                      type="password"
                      readOnly
                      className="profile__form-input"
                    />
                    {props.isMine && props?.isEdit && (
                      <button
                        type="button"
                        className="profile__form-input-view"
                      ></button>
                    )}
                  </label>
                </>
              )}
            </div>
          )}
          <div className="profile__form-section">
            <h3>О себе :</h3>
            <TextArea
              className="profile__form-textarea"
              placeholder={props.isMine && props?.isEdit ? 'Введите текст' : ''}
              readonly={!props.isMine || !props?.isEdit}
              value="Я учусь на втором курсе, делаю проекты для университета"
            />
          </div>
          {props.type === ProfileType.MENTOR && props?.tags && (
            <div className="profile__form-section">
              <h3>Ключевые слова :</h3>
              <div className="profile__form-tags">
                {props?.tags?.map((tag) => {
                  const color = getRandomItem(possibleTagColors);
                  return (
                    <span
                      key={tag}
                      className="profile__form-tag"
                      style={{
                        borderColor: color,
                        backgroundColor: `${color}15`,
                      }}
                    >
                      {tag}
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

export default Profile;
export { ProfileType };
