import AboutProject from '../AboutProject/AboutProject';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Promo from '../Promo/Promo';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

const Main = (props) => {
  return (
    <>
      <Header />
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Footer />
    </>
  );
};

export default Main;
