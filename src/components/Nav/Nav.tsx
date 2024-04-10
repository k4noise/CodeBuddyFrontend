import { ReactNode } from 'react';
import './Nav.css';

interface NavLink {
  text: string;
  href: string;
}

interface NavProps {
  logoSrc: string;
  links: NavLink[];
  hasAuthButtons: boolean;
}

const Nav = (props: NavProps) => {
  return (
    <nav>
      <img src={props.logoSrc} alt="logo" />
      <div className="nav__items-wrapper">
        {props.links.map((link) => (
          <a href={link.href} key={link.text} className="nav__items-link">
            {link.text}
          </a>
        ))}
      </div>
      {props.hasAuthButtons && (
        <div className="nav__register-wrapper">
          <a className="nav__items-link" href="#">
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
