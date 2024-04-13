import SocialIcons from '../SocialIcons/SocialIcons';
import Logo from '../Logo/Logo';
import './Footer.css';

/**
 * Footer component
 * Shows footer with logo, links and social icons
 * @component
 * @example
 * ```
 * <Footer />
 * ```
 * @returns {JSX.Element} Footer
 */
const Footer = (): JSX.Element => {
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
