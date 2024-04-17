import { Outlet, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home/Home.tsx';
import Register from './pages/Register/Register.tsx';
import Login from './pages/Login/Login.tsx';
import Nav, { NavLink } from './components/Nav/Nav.tsx';

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
    ],
  },
]);

export default router;
