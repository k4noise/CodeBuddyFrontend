import './Login.css';
import ManWithLaptopImage from '../../assets/man-with-laptop.png';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="login">
      <div className="login__wrapper">
        <img src={ManWithLaptopImage} alt="man with laptop" />
        <form className="login__form">
          <fieldset className="login__form-fieldset form__fieldset">
            <label>
              <input type="radio" name="type" />Я студент
            </label>
            <label>
              <input type="radio" name="type" />Я ментор
            </label>
          </fieldset>
          <input
            type="email"
            placeholder="Почта"
            className="login__form-field form__field"
          />
          <input
            type="password"
            placeholder="Пароль"
            className="login__form-field form__field"
          />
          <div className="login__form-actions">
            <button className="login__form-button">Войти</button>
            <Link to="/register" className="login__form-link">
              Нет аккаунта?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
