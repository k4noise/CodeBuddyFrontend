import Logo from '../../assets/Logo.svg';
import ManInFloor from '../../assets/man-in-floor.png';
import Nav, { NavLink } from '../../components/Nav/Nav';
import HowTo from './HowTo';
import Questions from './Questions.tsx';
import Footer from '../../components/Footer/Footer';
import SocialIcons from '../../components/SocialIcons/SocialIcons';
import './Home.css';

const NAV_LINKS: NavLink[] = [
  { text: 'Все менторы', href: '#' },
  { text: 'Мой профиль', href: '#' },
];

const Home = () => {
  return (
    <>
      <main>
        <section className="main">
          <Nav logoSrc={Logo} links={NAV_LINKS} hasAuthButtons={true} />
          <div className="main__intro-wrapper">
            <div>
              <h1>Найди своего наставника с помощью одного клика</h1>
              <h2 className="main__intro-subheader">
                Найди ответы на все вопросы с помощью опытных менторов
              </h2>
              <div className="main__social">
                <p>Подписывайтесь в соцсетях</p>
                <SocialIcons />
              </div>
            </div>
            <img
              src={ManInFloor}
              alt="man in floor"
              className="main__man-image"
            />
          </div>
        </section>
        <HowTo />
        <Questions />
      </main>
      <Footer />
    </>
  );
};

export default Home;
