const OneLine = () => {

    const lines = [
    { top: "11.8%" },       
  ];
  
    return (
      <div className="lines">
  
          {lines.map((style, index) => (
          <div
              key={index}
              className="line"
              style={{
                ...style,
                position: "fixed", 
                width: "100%",
                left: 0,
                height: "2px",
                backgroundColor: "#074522",
              }}
          ></div>
          ))}
      </div>
    );
  };
  
  export default OneLine;
  