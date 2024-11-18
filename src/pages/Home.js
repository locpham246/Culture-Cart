import Footer from "../components/Footer/Footer";
import AccContainer from "../components/AccContainer/AccContainer";
import Collection from "../components/Collections/Collection";
import Card from "../components/Card/Card";
import Header from "../components/Header/Header";

export default function Home() {
    return (
      <div className="Home">
          <Header />
          <Card />
          <Collection />
          <AccContainer />
          <Footer />
      </div>
    );
  }