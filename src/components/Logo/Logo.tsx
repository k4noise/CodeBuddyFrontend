import { Link } from 'react-router-dom';
import LogoIcon from '../../assets/Logo.svg';

/**
 * Logo component
 * Shows link to maiin page with logo
 * @component
 * @example
 * ```
 * <Logo />
 * ```
 * @returns {JSX.Element} Logo with link to homepage
 */
const Logo = (): JSX.Element => {
  return (
    <div className="logo__wrapper">
      <Link to="/" className="logo" data-testid="logo">
        <img src={LogoIcon} alt="logo" />
      </Link>
    </div>
  );
};

export default Logo;
