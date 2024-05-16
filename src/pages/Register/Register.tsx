import LeaningManImage from '../../assets/leaning-man.png';
import './Register.css';

import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { useState } from 'react';
import PasswordField from '../../components/PasswordField/PasswordField';
import { ProfileType } from '../../types';
import { CreateUser } from '../../actions/dto/user';
import { registerUser } from '../../actions/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthProvider';
import { toast } from 'react-toastify';

const RegisterSchema = zod
  .object({
    type: zod.union([zod.literal('student'), zod.literal('mentor')]),
    firstName: zod.string().min(2, 'Не менее 2 символов'),
    lastName: zod.string().min(2, 'Не менее 2 символов'),
    email: zod.string().email('Некорректный email'),
    password: zod
      .string()
      .min(8, 'Не менее 8 символов')
      .refine(
        (value) =>
          /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,}$/.test(
            value ?? ''
          ),
        'Пароль должен содержать минимум одну цифру, одну большую и маленькую буквы и один спецсимвол'
      ),
    repeatPassword: zod.string(),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: 'Пароли не совпадают',
    path: ['repeatPassword'],
  });

/**
 * Register component
 * Register form with validation, fields look at `RegisterSchema` object
 * @returns {JSX.Element} Register form
 */
const Register = () => {
  const [isAgree, setIsAgree] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUser>({
    resolver: zodResolver(RegisterSchema),
  });

  const onFormSend = async (data: FieldValues) => {
    const profileType: ProfileType =
      data.type === 'mentor' ? ProfileType.MENTOR : ProfileType.STUDENT;
    try {
      await registerUser(data as CreateUser, profileType);
      login();
      toast('Успешная регистрация', { type: 'success' });
      navigate('/');
    } catch (error) {
      toast('Произошла ошибка, попробуйте еще раз', { type: 'error' });
    }
  };

  return (
    <div className="register">
      <div className="register__wrapper">
        <img src={LeaningManImage} alt="leaning man" />
        <form className="register__form" onSubmit={handleSubmit(onFormSend)}>
          <h2 className="register__form-header">Регистрация</h2>
          <fieldset className="register__form-fieldset">
            <label>
              <input
                type="radio"
                defaultChecked
                value="student"
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
            placeholder="Имя"
            className="form__field register__form-field"
            {...register('firstName')}
          />
          {errors.firstName?.message && (
            <p className="zod-error">{errors.firstName?.message}</p>
          )}
          <input
            type="text"
            placeholder="Фамилия"
            className="form__field register__form-field"
            {...register('lastName')}
          />
          {errors.lastName?.message && (
            <p className="zod-error">{errors.lastName?.message}</p>
          )}
          <input
            type="text"
            inputMode="email"
            placeholder="Почта"
            className="form__field register__form-field"
            {...register('email')}
          />
          {errors.email?.message && (
            <p className="zod-error">{errors.email?.message}</p>
          )}
          <PasswordField
            label=""
            labelClassName="register__form-label"
            inputClassName="register__form-password-input form__field"
            validationOptions={register('password')}
            placeholder="Пароль"
          />
          {errors.password?.message && (
            <p className="zod-error">{errors.password?.message}</p>
          )}
          <PasswordField
            label=""
            labelClassName="register__form-label"
            inputClassName="register__form-password-input form__field"
            validationOptions={register('repeatPassword')}
            placeholder="Пароль еще раз"
          />
          {errors.repeatPassword?.message && (
            <p className="zod-error">{errors.repeatPassword?.message}</p>
          )}
          <label className="register__form-policy">
            <input
              type="checkbox"
              onClick={() => setIsAgree((prev) => !prev)}
            />
            Я согласен с условиями политики конфиденциальности
          </label>
          <button className="register__form-send" disabled={!isAgree}>
            Зарегестрироваться
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
