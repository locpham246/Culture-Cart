import React from "react";

const Lines = () => {
  const lines = [
    { top: "10%" },
    { top: "13%" },
  ];

  return (
    <div
      className="lines"
      style={{
        position: "absolute", 
        top: 0,
        left: 0,
        width: "100%",
        height: "100%", 
        pointerEvents: "none", 
        zIndex: 10, 
      }}
    >
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