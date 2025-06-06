import Lines from "../components/ScreenLines/Lines.jsx";
import MenuFeature from "../components/Menu/Menu.jsx";
import ForgotFeature from "../components/SignIn/ForgotPassword.jsx";


export default function ForgotPassword() {
    return (
      <div className="ForgotPassword">
          <Lines/>
          <MenuFeature/>
          <ForgotFeature/>
      </div>
    );
}