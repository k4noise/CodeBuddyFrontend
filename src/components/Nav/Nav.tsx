import { Link, useLocation } from 'react-router-dom';
import AvatarImage from '../../assets/avatar1.png';
import Logo from '../Logo/Logo';
import './Nav.css';
import { useState } from 'react';

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
  /** link text */
  text: string;
  /** link url */
  href: string;
}

interface NavProps {
  /* visible links array */
  links: NavLink[];
  /* hidden links array */
  sublinks: NavLink[];
  /* flag is need show auth buttons */
  hasAuthButtons: boolean;
}

const Nav = ({ links, sublinks, hasAuthButtons }: NavProps) => {
  const location = useLocation();
  const inHomePage = location.pathname === '/';
  const [isOpenSubnav, setIsOpenSubnav] = useState(false);

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
      {hasAuthButtons && inHomePage && (
        <div className="nav__register-wrapper">
          <Link to="register" className="nav__items-link">
            Регистрация
          </Link>
          <Link to="login">
            <button className="nav__button">Вход</button>
          </Link>
        </div>
      )}
      {!hasAuthButtons && (
        <div className="subnav-wrapper">
          <div className="subnav__avatar-wrapper">
            <img src={AvatarImage} alt="Avatar" className="subnav__avatar" />
          </div>
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
        {sublinks.map((sublink) => (
          <Link to={sublink.href} key={sublink.text}>
            {sublink.text}
          </Link>
        ))}
      </nav>
    </nav>
  );
};

export default Nav;
export type { NavLink };
