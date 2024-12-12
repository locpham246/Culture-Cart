import React from "react";


const Lines = () => {
  const lines = [
    { top: "10%" },       
    { top: "13%" },     
    { top: "120%" },    
  ];

  return (
    <div className="lines">
      {lines.map((style, index) => (
        <div
          key={index}
          className="line"
          style={{
            ...style,
            position: "absolute",
            width: "100%",
            left: 0,
            height: "2px",
            backgroundColor: "#074522",
          }}
        />
      ))}
    </div>
  );
};

export default Lines;
