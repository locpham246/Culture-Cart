import Lines from "../components/ScreenLines/Lines.jsx";
import MenuFeature from "../components/Menu/Menu.jsx";
import OTPFeature from "../components/SignUp/OTPVerify.jsx";


export default function OTPVerify() {
    return (
      <div className="OTPVerify">
          <Lines/>
          <MenuFeature/>
          <OTPFeature/>
      </div>
    );
}