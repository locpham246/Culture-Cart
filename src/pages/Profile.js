import Lines from "../components/ScreenLines/Lines";
import MenuFeature from "../components/Menu/Menu";
import ProfileFeature from "../components/ProfileInfo/ProfileInfo";

export default function Profile() {
    return (
      <div className="SignIn">
          <Lines/>
          <MenuFeature/>
          <ProfileFeature/>
      </div>
    );
  }