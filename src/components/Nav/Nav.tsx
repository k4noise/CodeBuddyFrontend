import Logo from '../Logo/Logo';
import './Nav.css';

interface NavLink {
  text: string;
  href: string;
}

interface NavProps {
  links: NavLink[];
  hasAuthButtons: boolean;
}

const Nav = ({ links, hasAuthButtons }: NavProps) => {
  return (
    <nav>
      <Logo />
      <div className="nav__items-wrapper">
        {links.map((link) => (
          <a href={link.href} key={link.text} className="nav__items-link">
            {link.text}
          </a>
        ))}
      </div>
      {hasAuthButtons && (
        <div className="nav__register-wrapper">
          <a className="nav__items-link" href="/">
            Регистрация
          </a>
          <button className="nav__button">Вход</button>
        </div>
      )}
    </nav>
  );
};

export default Nav;
export type { NavLink };
