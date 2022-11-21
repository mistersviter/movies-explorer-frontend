import AboutProject from '../AboutProject/AboutProject';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Promo from '../Promo/Promo';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';

const Main = () => {
  return (
    <>
      <Header activeLink='main' />
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Footer />
    </>
  );
};

export default Main;
