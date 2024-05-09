import LeaningManImage from '../../assets/leaning-man.png';
import './Register.css';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { useState } from 'react';
import PasswordField from '../../components/PasswordField/PasswordField';

const RegisterSchema = zod
  .object({
    type: zod.union([zod.literal('student'), zod.literal('mentor')]),
    name: zod.string().min(2, 'Не менее 2 символов'),
    surname: zod.string().min(2, 'Не менее 2 символов'),
    email: zod.string().email('Некорректный email'),
    password: zod.string().min(8, 'Не менее 8 символов'),
    passwordRepeat: zod.string(),
  })
  .refine((data) => data.password === data.passwordRepeat, {
    message: 'Пароли не совпадают',
    path: ['passwordRepeat'],
  });

/**
 * Register component
 * Register form with validation, fields look at `RegisterSchema` object
 * @returns {JSX.Element} Register form
 */
const Register = () => {
  const [isAgree, setIsAgree] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(RegisterSchema),
  });

  return (
    <div className="register">
      <div className="register__wrapper">
        <img src={LeaningManImage} alt="leaning man" />
        <form
          className="register__form"
          onSubmit={handleSubmit((d) => console.log(d))}
        >
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
            {...register('name')}
          />
          {errors.name?.message && (
            <p className="zod-error">{errors.name?.message}</p>
          )}
          <input
            type="text"
            placeholder="Фамилия"
            className="form__field register__form-field"
            {...register('surname')}
          />
          {errors.surname?.message && (
            <p className="zod-error">{errors.surname?.message}</p>
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
            validationOptions={register('passwordRepeat')}
            placeholder="Пароль еще раз"
          />
          {errors.passwordRepeat?.message && (
            <p className="zod-error">{errors.passwordRepeat?.message}</p>
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
