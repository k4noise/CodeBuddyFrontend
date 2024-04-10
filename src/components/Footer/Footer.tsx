import LogoIcon from '../../assets/Logo.svg';
import SocialIcons from '../SocialIcons/SocialIcons';
import './Footer.css';

const Footer = () => {
  return (
    <footer>
      <img src={LogoIcon} alt="logo" />
      <a href="#" className="footer__link">
        Политика конфиденциальности
      </a>
      <a href="#" className="footer__link">
        Соглашение на обработку персональных данных
      </a>
      <SocialIcons />
    </footer>
  );
};

export default Footer;
