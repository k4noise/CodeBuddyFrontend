import { Outlet, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home/Home.tsx';
import Register from './pages/Register/Register.tsx';
import Login from './pages/Login/Login.tsx';
import Nav, { NavLink } from './components/Nav/Nav.tsx';
import Profile from './pages/Profile/Profile.tsx';
import { ProfileType } from './types.ts';
import Mentors from './pages/Mentors/Mentors.tsx';
import Requests from './pages/Requests/Requests.tsx';
import Page404 from './pages/ErrorPages/404.tsx';
import Page401 from './pages/ErrorPages/401.tsx';
import Page403 from './pages/ErrorPages/403.tsx';

const NAV_LINKS: NavLink[] = [
  { text: 'Все менторы', href: 'mentors' },
] as const;

const NAV_SUBLINKS: NavLink[] = [
  { text: 'Мой профиль', href: 'profile' },
  { text: 'Мои заявки', href: 'requests' },
  { text: 'Настройки', href: 'profile/edit' },
  { text: 'Выход', href: 'logout' },
] as const;

const router = createBrowserRouter([
  {
    element: (
      <>
        <Nav links={NAV_LINKS} sublinks={NAV_SUBLINKS} />
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
        path: '/mentors',
        element: <Mentors />,
      },
      {
        path: '/requests',
        element: <Requests />,
      },
      {
        path: '/profile',
        element: <Profile isMine={true} fromRequest={false} />,
      },
      {
        path: '/profile/edit',
        element: <Profile isMine={true} fromRequest={false} />,
      },
      {
        path: '/profile/student/:id',
        element: (
          <Profile
            isMine={false}
            profileType={ProfileType.STUDENT}
            fromRequest={false}
          />
        ),
      },
      {
        path: '/profile/mentor/:id',
        element: (
          <Profile
            isMine={false}
            profileType={ProfileType.MENTOR}
            fromRequest={false}
          />
        ),
      },
      {
        path: '/profile/request/mentor/:id',
        element: (
          <Profile
            isMine={false}
            profileType={ProfileType.MENTOR}
            fromRequest={true}
          />
        ),
      },
      {
        path: '/profile/request/student/:id',
        element: (
          <Profile
            isMine={false}
            profileType={ProfileType.STUDENT}
            fromRequest={true}
          />
        ),
      },
      {
        path: '/401',
        element: <Page401 />,
      },
      {
        path: '/403',
        element: <Page403 />,
      },
      {
        path: '/404',
        element: <Page404 />,
      },
      {
        path: '*',
        element: <Page404 />,
      },
    ],
  },
]);

export default router;
