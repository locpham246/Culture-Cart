import Lines from "../components/ScreenLines/Lines";
import MenuFeature from "../components/Menu/Menu";
import ManageAccountFeature from "../components/ProfileInfo/ManageAccount";
import React from 'react';

export default function ManageAccount() {
    return (
      <div className="ManageAccount">
          <Lines/>
          <MenuFeature/>
          <ManageAccountFeature/>
      </div>
    );
  }