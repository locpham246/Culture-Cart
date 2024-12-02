import Lines from "../components/ScreenLines/Lines";
import SmallHeader from "../components/SmallHeader/SmallHeader";
import Menu from "../components/Menu/Menu";
import Order from "../components/DeliveryOrder/DeliveryOrder"

export default function Delivery_Order() {

    return (
        <div className="Delivery_Order">
            <SmallHeader />
            <Lines />
            <Menu />
            <Order />
        </div>
    );
}