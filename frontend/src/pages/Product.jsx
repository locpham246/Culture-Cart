import SmallHeader from "../components/SmallHeader/SmallHeader";
import Menu from "../components/Menu/Menu";
import Lines from "../components/ScreenLines/Lines";
import ItemDetails from "../components/ItemDetails/ItemDetails";

export default function Product() {
    return (
      <div className="Product">
          <SmallHeader />
          <Menu />
          <Lines />
          <ItemDetails />
      </div>
    );
  }