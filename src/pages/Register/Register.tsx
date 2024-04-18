import LeaningManImage from '../../assets/leaning-man.png';
import './Register.css';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';

const RegisterSchema = zod
  .object({
    type: zod.union([zod.literal('student'), zod.literal('mentor')]),
    name: zod.string().min(2, 'Не менее 2 символов'),
    surname: zod.string().min(2, 'Не менее 2 символов'),
    email: zod.string().email('Некорректный email'),
    password: zod.string().min(8, 'Не менее 8 символов'),
    passwordRepeat: zod.string(),
    isAgree: zod.boolean(),
  })
  .refine((data) => data.password === data.passwordRepeat, {
    message: 'Пароли не совпадают',
    path: ['passwordRepeat'],
  })
  .refine((data) => !data.isAgree, {
    message: 'Необходимо согласиться с условиями политики конфиденциальности',
    path: ['isAgree'],
  });

/**
 * Register component
 * Register form with validation, fields look at `RegisterSchema` object
 * @returns {JSX.Element} Register form
 */
const Register = () => {
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
            className="register__form-field"
            {...register('name')}
          />
          {errors.name?.message && (
            <p className="zod-error">{errors.name?.message}</p>
          )}
          <input
            type="text"
            placeholder="Фамилия"
            className="register__form-field"
            {...register('surname')}
          />
          {errors.surname?.message && (
            <p className="zod-error">{errors.surname?.message}</p>
          )}
          <input
            type="text"
            inputMode="email"
            placeholder="Почта"
            className="register__form-field"
            {...register('email')}
          />
          {errors.email?.message && (
            <p className="zod-error">{errors.email?.message}</p>
          )}
          <input
            type="password"
            placeholder="Пароль"
            className="register__form-field"
            {...register('password')}
          />
          {errors.password?.message && (
            <p className="zod-error">{errors.password?.message}</p>
          )}
          <input
            type="password"
            placeholder="Пароль еще раз"
            className="register__form-field"
            {...register('passwordRepeat')}
          />
          {errors.passwordRepeat?.message && (
            <p className="zod-error">{errors.passwordRepeat?.message}</p>
          )}
          <label className="register__form-policy">
            <input type="checkbox" {...register('isAgree')} />Я согласен с
            условиями политики конфиденциальности
          </label>
          {errors.isAgree?.message && (
            <p className="zod-error">{errors.isAgree?.message}</p>
          )}
          <button className="register__form-send">Зарегестрироваться</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
