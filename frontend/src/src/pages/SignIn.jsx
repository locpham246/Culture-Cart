import Lines from "../components/ScreenLines/Lines";
import SignInFeature from "../components/SignIn/SignIn";
import MenuFeature from "../components/Menu/Menu";

export default function SignIn() {
    return (
      <div className="SignIn">
          <Lines/>
          <MenuFeature/>
          <SignInFeature/>
      </div>
    );
  }