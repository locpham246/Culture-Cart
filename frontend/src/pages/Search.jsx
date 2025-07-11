import SearchItems from "../components/SearchItemsList/SearchItemsList";
import SmallHeader from "../components/SmallHeader/SmallHeader";
import Menu from "../components/Menu/Menu";
import Lines from "../components/ScreenLines/OneLine";
import SearchMenu from "../components/SearchMenu/SearchMenu";
import VerticalLine from "../components/ScreenLines/VerticalLine";
export default function Search() {

    const SearchStyles = {
      paddingTop: "120px",
    };
    const verticalLineStyles = {
 
  };

    return (
      <div className="Search">
          <SearchMenu />
          <SmallHeader />
          <Menu />
          <VerticalLine customStyles={verticalLineStyles} />
          <Lines />
          <SearchItems
              itemsPerPage={7}
              gridColumns={7}
              title="Recommended Items"
              customStyles={SearchStyles}
              recommended
            />
          <SearchItems
              itemsPerPage={7}
              gridColumns={7}
              title="Discount Items"
              discount
          />
          <SearchItems
              itemsPerPage={7}
              gridColumns={7}
              title="Asian Items"
              showArrows={true}
              category="asian"
          />
          <SearchItems
              itemsPerPage={7}
              gridColumns={7}
              title="African Items"
              showArrows={true}
              category="african"
          />
          <SearchItems
              itemsPerPage={7}
              gridColumns={7}
              title="Hispanic Items"
              showArrows={true}
              category="hispanic"
          />
      </div>
    );
  }