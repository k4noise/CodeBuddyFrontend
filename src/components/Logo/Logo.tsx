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
    <a href="/" className="logo">
      <img src={LogoIcon} alt="logo" />
    </a>
  );
};

export default Logo;
