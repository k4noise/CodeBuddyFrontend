import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import './Nav.css';

/**
 * Nav component
 * Shows logo, links and buttons for auth if is required
 *
 * @component
 * @example
 * ```
 * <Nav links={[{ text: 'Главная', href: '/' }, { text: 'Вопросы', href: '/questions' }]} hasAuthButtons={true} />
 * ```
 * @param {NavLink[]} links navigate links
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
  /** links array */
  links: NavLink[];
  /** flag is need show auth buttons */
  hasAuthButtons: boolean;
}

const Nav = ({ links, hasAuthButtons }: NavProps) => {
  return (
    <nav>
      <Logo />
      <div className="nav__items-wrapper">
        {links.map((link) => (
          <Link to={link.href} key={link.text} className="nav__items-link">
            {link.text}
          </Link>
        ))}
      </div>
      {hasAuthButtons && (
        <div className="nav__register-wrapper">
          <Link to="register" className="nav__items-link">
            Регистрация
          </Link>
          <Link to="login">
            <button className="nav__button">Вход</button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Nav;
export type { NavLink };
