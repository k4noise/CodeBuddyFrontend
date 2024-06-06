import { useEffect, useState } from 'react';
import { useAuth } from '../../AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from '../Logo/Logo';
import './Nav.css';
import { logoutUser } from '../../actions/auth';
import { ProfileType } from '../../types';
import { getAvatar } from '../../actions/util';
import Cookies from 'js-cookie';


/**
 * Nav component
 * Shows logo, links and buttons for auth if is required
 *
 * @component
 * @example
 * ```
 * <Nav links={[{ text: 'Главная', href: '/' }, { text: 'Вопросы', href: '/questions' }]} hasAuthButtons={true} />
 * ```
 * @param {NavLink[]} links visible navigate links
 * @param {NavLink[]} sublinks hidden navigate links
 * @param {boolean} hasAuthButtons flag is required show auth buttons
 * @returns {JSX.Element} Nav
 */
interface NavLink {
  /* link text */
  text: string;
  /* link url */
  href: string;
}

interface NavProps {
  /* visible links array */
  links: NavLink[];
  /* hidden links array */
  sublinks: NavLink[];
}

const Nav = ({ links, sublinks }: NavProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const inHomePage = location.pathname === '/';
  const [isOpenSubnav, setIsOpenSubnav] = useState(false);
  const { auth, logout, avatar, changeAvatar } = useAuth();

  useEffect(() => {
    if (!avatar) changeAvatar(Cookies.get('avatarUrl') as string);
  }, [avatar]);

  return (
    <nav className="nav">
      <Logo />
      {inHomePage && (
        <div className="nav__items-wrapper">
          {links.map((link) => (
            <Link to={link.href} key={link.text} className="nav__items-link">
              {link.text}
            </Link>
          ))}
        </div>
      )}
      {!auth && inHomePage && (
        <div className="nav__register-wrapper">
          <Link to="register" className="nav__items-link">
            Регистрация
          </Link>
          <Link to="login">
            <button className="nav__button">Вход</button>
          </Link>
        </div>
      )}
      {auth && (
        <div className="subnav-wrapper">
          <Link to="profile" className="subnav__avatar-wrapper">
            <img
              src={getAvatar(
                avatar,
                Cookies.get('profileType') as ProfileType
              )}
              alt="Avatar"
              className="subnav__avatar"
            />
          </Link>
          <button
            className="subnav__button"
            onClick={() => setIsOpenSubnav((prev) => !prev)}
          >
            ≡
          </button>
        </div>
      )}
      <nav
        className={`subnav${isOpenSubnav ? '' : ' unvisible'}`}
        onClick={() => setIsOpenSubnav((prev) => !prev)}
      >
        {sublinks.map((sublink) =>
          sublink.href === 'logout' ? (
            <span
              key={sublink.text}
              onClick={() => {
                logoutUser();
                logout();
                navigate('/');
              }}
            >
              {sublink.text}
            </span>
          ) : (
            <Link to={sublink.href} key={sublink.text}>
              {sublink.text}
            </Link>
          )
        )}
      </nav>
    </nav>
  );
};

export default Nav;
export type { NavLink };
