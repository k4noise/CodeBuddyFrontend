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
    <Link to="/" className="logo" data-testid="logo">
      <img src={LogoIcon} alt="logo" />
    </Link>
  );
};

export default Logo;
