const Lines = () => {

  // Lines for the screen
  const lines = [
  { top: "10%" },       
  { top: "12" },     
  { top: "95%" },    
];

  return (
    <div className="lines">

        {lines.map((style, index) => (
        // Lines for the screen
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
        ></div>
        ))}
    </div>
  );
};

export default Lines;
