import YoutubeIcon from '../../assets/youtube.svg';
import FacebookIcon from '../../assets/facebook.svg';
import TwitterIcon from '../../assets/twitter.svg';
import './SocialIcons.css';

interface SocialIcon {
  src: string;
  alt: string;
  url: string;
}

const SOCIAL_ICONS: SocialIcon[] = [
  { src: YoutubeIcon, alt: 'Youtube', url: 'https://youtube.com' },
  { src: FacebookIcon, alt: 'Facebook', url: 'https://facebook.com' },
  { src: TwitterIcon, alt: 'Twitter', url: 'https://twitter.com' },
] as const;

const SocialIcons = () => {
  return (
    <div className="social-icons">
      {SOCIAL_ICONS.map((icon) => (
        <a href={icon.url} key={icon.url}>
          <img src={icon.src} alt={icon.alt} />
        </a>
      ))}
    </div>
  );
};

export default SocialIcons;
