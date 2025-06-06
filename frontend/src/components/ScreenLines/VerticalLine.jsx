import React from 'react';
import './VerticalLine.scss'; 

const VerticalLine = ({ customStyles }) => {
  return (
    <div className="vertical-sidebar-line" style={customStyles}></div>
  );
};

export default VerticalLine;