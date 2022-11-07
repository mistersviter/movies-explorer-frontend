import AboutProject from '../AboutProject/AboutProject';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Promo from '../Promo/Promo';
import Techs from '../Techs/Techs';

const Main = (props) => {
  return (
    <>
      <Header />
      <Promo />
      <AboutProject />
      <Techs />
      <Footer />
    </>
  );
};

export default Main;
