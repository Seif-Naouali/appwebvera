import React from "react";
import spinner from "./spinner.gif";

export default () => {
  return (
    <div>
      <img
        src={spinner}
        style={{
          width: "120px",
          marginLeft: "-(X/2)px",
          marginRight: "-(Y/2)px",
          top: "50%",
          left: "50%",
          position: "absolute"
        }}
        alt="Loading..."
      />
    </div>
  );
};
