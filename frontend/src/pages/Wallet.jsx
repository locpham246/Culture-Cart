import Lines from "../components/ScreenLines/Lines";
import MenuFeature from "../components/Menu/Menu";
import WalletFeature from "../components/ProfileInfo/Wallet";

export default function Wallet() {
    return (
      <div className="Wallet">
          <Lines/>
          <MenuFeature/>
          <WalletFeature/>
      </div>
    );
  }