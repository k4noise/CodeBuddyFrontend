import SocialIcons from '../SocialIcons/SocialIcons';
import Logo from '../Logo/Logo';
import './Footer.css';

const Footer = () => {
  return (
    <footer>
      <div className="footer__wrapper">
        <Logo />
        <a href="/" className="footer__link">
          Политика конфиденциальности
        </a>
        <a href="/" className="footer__link">
          Соглашение на обработку персональных данных
        </a>
        <SocialIcons />
      </div>
    </footer>
  );
};

export default Footer;
