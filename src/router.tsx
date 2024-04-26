import { Outlet, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home/Home.tsx';
import Register from './pages/Register/Register.tsx';
import Login from './pages/Login/Login.tsx';
import Nav, { NavLink } from './components/Nav/Nav.tsx';
import Profile from './pages/Profile/Profile.tsx';
import AvatarImage from './assets/avatar1.png';
import MentorAvatarImage from './assets/mentor.png';
import { Mentor, ProfileType } from './types.ts';

const NAV_LINKS: NavLink[] = [
  { text: 'Все менторы', href: '#' },
  { text: 'Мой профиль', href: '#' },
] as const;

const router = createBrowserRouter([
  {
    element: (
      <>
        <Nav links={NAV_LINKS} hasAuthButtons={true} />
        <div>
          <Outlet />
        </div>
      </>
    ),
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/profile',
        element: (
          <Profile
            type={ProfileType.STUDENT}
            isMine={true}
            isEdit={false}
            userInfo={{
              login: 'ivan.ivanov@mail.ru',
              username: 'Иван Иванов',
              avatar: AvatarImage,
              email: 'ivan.ivanov@mail.ru',
              tgId: '@ivan_ivanov',
            }}
          />
        ),
      },
      {
        path: '/profile/edit',
        element: (
          <Profile
            type={ProfileType.STUDENT}
            isMine={true}
            isEdit={true}
            userInfo={{
              login: 'ivan.ivanov@mail.ru',
              username: 'Иван Иванов',
              avatar: AvatarImage,
              email: 'ivan.ivanov@mail.ru',
              tgId: '@ivan_ivanov',
            }}
          />
        ),
      },
      {
        path: '/profile/:id',
        element: (
          <Profile
            type={ProfileType.STUDENT}
            isMine={false}
            isEdit={false}
            userInfo={{
              login: 'ivan.ivanov@mail.ru',
              username: 'Иван Иванов',
              avatar: AvatarImage,
              email: 'ivan.ivanov@mail.ru',
              tgId: '@ivan_ivanov',
            }}
          />
        ),
      },
      {
        path: '/profile/mentor',
        element: (
          <Profile
            type={ProfileType.MENTOR}
            isMine={false}
            isEdit={false}
            userInfo={
              {
                login: 'petr.petrov@mail.ru',
                username: 'Петр Петров',
                avatar: MentorAvatarImage,
                email: 'petr.petrov@mail.ru',
                tgId: '@petttt_',
                tags: ['ментор', 'опыт 5 лет', 'джава', 'языки'],
              } as Mentor
            }
          />
        ),
      },
    ],
  },
]);

export default router;
