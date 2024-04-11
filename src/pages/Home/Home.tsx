import ManInFloorImage from '../../assets/man-in-floor.png';
import Nav, { NavLink } from '../../components/Nav/Nav';
import HowTo from './HowTo/HowTo';
import Questions from './Questions/Questions';
import Footer from '../../components/Footer/Footer';
import SocialIcons from '../../components/SocialIcons/SocialIcons';
import './Home.css';

const NAV_LINKS: NavLink[] = [
  { text: 'Все менторы', href: '#' },
  { text: 'Мой профиль', href: '#' },
] as const;

const Home = () => {
  return (
    <>
      <Nav links={NAV_LINKS} hasAuthButtons={true} />
      <main>
        <section className="main">
          <div className="main__intro">
            <div>
              <h1>Найди своего наставника с помощью одного клика</h1>
              <h2 className="main__intro-subheader">
                Найди ответы на все вопросы с помощью опытных менторов
              </h2>
              <div className="main__intro-social">
                <p>Подписывайтесь в соцсетях</p>
                <SocialIcons />
              </div>
            </div>
            <img
              src={ManInFloorImage}
              alt="man in floor"
              className="main__intro-man"
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
