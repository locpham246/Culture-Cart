import React from 'react';
import SmallHeader from "../components/SmallHeader/SmallHeader";
import Menu from "../components/Menu/Menu";
import Lines from "../components/ScreenLines/OneLine";
import StoreProductList from "../components/StoreProductList/StoreProductList"; 

export default function StoreProductsPage() {
  return (
    <div className="store-products-page-container"> 
      <SmallHeader />
      <Menu />
      <Lines />
      <StoreProductList /> 
    </div>
  );
}