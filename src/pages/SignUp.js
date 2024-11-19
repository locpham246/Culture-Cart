import Lines from "../components/ScreenLines/Lines";
import MenuFeature from "../components/Menu/Menu";
import SignUpFeature from "../components/SignUp/SignUp";


export default function SignUp() {
    return (
      <div className="SignUp">
          <Lines/>
          <MenuFeature/>
          <SignUpFeature/>
      </div>
    );
  }