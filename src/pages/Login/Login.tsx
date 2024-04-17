import './Login.css';
import ManWithLaptopImage from '../../assets/man-with-laptop.png';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';

const LoginSchema = zod.object({
  type: zod.union([zod.literal('student'), zod.literal('mentor')]),
  email: zod.string().email('Некорректный email'),
  password: zod.string().min(8, 'Не менее 8 символов'),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });

  return (
    <div className="login">
      <div className="login__wrapper">
        <img src={ManWithLaptopImage} alt="man with laptop" />
        <form
          className="login__form"
          onSubmit={handleSubmit((d) => console.log(d))}
        >
          <fieldset className="login__form-fieldset form__fieldset">
            <label>
              <input
                type="radio"
                value="student"
                defaultChecked
                {...register('type')}
              />
              Я студент
            </label>
            <label>
              <input type="radio" value="mentor" {...register('type')} />Я
              ментор
            </label>
          </fieldset>
          <input
            type="text"
            inputMode="email"
            placeholder="Почта"
            className="login__form-field form__field"
            {...register('email')}
          />
          {errors.email?.message && (
            <p className="zod-error">{errors.email?.message}</p>
          )}
          <input
            type="password"
            placeholder="Пароль"
            className="login__form-field form__field"
            {...register('password')}
          />
          {errors.password?.message && (
            <p className="zod-error">{errors.password?.message}</p>
          )}
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
