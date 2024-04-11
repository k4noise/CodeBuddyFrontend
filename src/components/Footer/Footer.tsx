import SocialIcons from '../SocialIcons/SocialIcons';
import Logo from '../Logo/Logo';
import './Footer.css';

const Footer = () => {
  return (
    <footer>
      <Logo />
      <a href="/" className="footer__link">
        Политика конфиденциальности
      </a>
      <a href="/" className="footer__link">
        Соглашение на обработку персональных данных
      </a>
      <SocialIcons />
    </footer>
  );
};

export default Footer;
