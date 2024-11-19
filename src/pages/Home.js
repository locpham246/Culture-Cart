import Footer from "../components/Footer/Footer";
import AccContainer from "../components/AccContainer/AccContainer";
import Collection from "../components/Collections/Collection";
import Card from "../components/Card/Card";
import Header from "../components/Header/Header";
import Menu from "../components/Menu/Menu";

export default function Home() {
    return (
      <div className="Home">
          <Header />
          <Menu />
          <Card />
          <Collection />
          <AccContainer />
          <Footer />
      </div>
    );
  }