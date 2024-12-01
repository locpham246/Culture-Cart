import Items from "../components/ItemsList/ItemsList";
import SmallHeader from "../components/SmallHeader/SmallHeader";
import Menu from "../components/Menu/Menu";

export default function Home() {
    return (
      <div className="Home">
          <SmallHeader />
          <Menu />
      </div>
    );
  }