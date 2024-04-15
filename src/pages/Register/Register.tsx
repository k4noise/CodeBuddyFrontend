import LeaningManImage from '../../assets/leaning-man.png';
import './Register.css';

const Register = () => {
  return (
    <div className="register">
      <div className="register__wrapper">
        <img src={LeaningManImage} alt="leaning man" />
        <form action="post" className="register__form">
          <h2 className="register__form-header">Регистрация</h2>
          <fieldset className="register__form-fieldset">
            <label>
              <input type="radio" name="type" />Я студент
            </label>
            <label>
              <input type="radio" name="type" />Я ментор
            </label>
          </fieldset>
          <input
            type="text"
            placeholder="Имя"
            className="register__form-field"
          />
          <input
            type="text"
            placeholder="Фамилия"
            className="register__form-field"
          />
          <input
            type="email"
            placeholder="Почта"
            className="register__form-field"
          />
          <input
            type="password"
            placeholder="Пароль"
            className="register__form-field"
          />
          <input
            type="password"
            placeholder="Пароль еще раз"
            className="register__form-field"
          />
          <label className="register__form-policy">
            <input type="checkbox" />Я согласен с условиями политики
            конфиденциальности
          </label>
          <button className="register__form-send">Зарегестрироваться</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
