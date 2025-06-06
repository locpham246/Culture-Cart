import React from 'react';
import SmallHeader from "../components/SmallHeader/SmallHeader";
import Menu from "../components/Menu/Menu";
import Lines from "../components/ScreenLines/OneLine";
import StoreList from "../components/StoreList/StoreList"; 

export default function StoresPage() {
  return (
    <div className="stores-page-container">
      <SmallHeader />
      <Menu />
      <Lines />
      <StoreList />
    </div>
  );
}