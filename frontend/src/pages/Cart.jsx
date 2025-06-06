import React from 'react';
import SmallHeader from "../components/SmallHeader/SmallHeader";
import Menu from "../components/Menu/Menu";
import Lines from "../components/ScreenLines/OneLine";
import CartComponent from "../components/Cart/Cart";

export default function Cart() {
  return (
    <div className="CartPage"> 
      <SmallHeader /> 
      <Menu /> 
      <Lines /> 
      <CartComponent /> 
    </div>
  );
}