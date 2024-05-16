import './Login.css';
import ManWithLaptopImage from '../../assets/man-with-laptop.png';
import { Link, useNavigate } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import PasswordField from '../../components/PasswordField/PasswordField';
import { loginUser } from '../../actions/auth';
import { LoginUser } from '../../actions/dto/user';
import { ProfileType } from '../../types';
import { useAuth } from '../../AuthProvider';
import { toast } from 'react-toastify';

const LoginSchema = zod.object({
  type: zod.union([zod.literal('student'), zod.literal('mentor')]),
  login: zod.string().email('Некорректный email'),
  password: zod.string().min(8, 'Не менее 8 символов'),
});

/**
 * Login component
 * Login form with validation, fields look at `LoginSchema` object
 * @returns {JSX.Element} Login form
 */
const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });

  const onFormSend = async (data: FieldValues) => {
    const profileType: ProfileType =
      data.type === 'mentor' ? ProfileType.MENTOR : ProfileType.STUDENT;
    try {
      await loginUser(data as LoginUser, profileType);
      login();
      toast('Успешный вход', { type: 'success' });
      navigate('/');
    } catch (error) {
      toast(error.message, {
        type: 'error',
      });
    }
  };

  return (
    <div className="login">
      <div className="login__wrapper">
        <img src={ManWithLaptopImage} alt="man with laptop" />
        <form className="login__form" onSubmit={handleSubmit(onFormSend)}>
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
            {...register('login')}
          />
          {errors.login?.message && (
            <p className="zod-error">{errors.login?.message}</p>
          )}
          <PasswordField
            label=""
            labelClassName="login__form-label"
            inputClassName="login__form-password-input form__field"
            validationOptions={register('password')}
            placeholder="Пароль"
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
