import React, { useRef } from "react";
import PropTypes from "prop-types";
import "./Upload.css";
import uploadDummy from "./up_img.png";
function Upload(props) {
  const dragBoxRef = useRef(null);
  const handleDroppedFile = (e) => {
    e.preventDefault();
    const files = e?.dataTransfer?.items;
    console.log("I am teh items bud", files);
  };
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 40,
      }}
    >
      <div
        ref={dragBoxRef}
        className="ml-drag-box"
        onDragLeave={(e) => (dragBoxRef.current.style.background = "white")}
        onDragOver={(e) => {
          e.preventDefault();
          dragBoxRef.current.style.background = "red";
        }}
        onDrop={(e) => handleDroppedFile(e)}
      >
        <img src={uploadDummy} style={{ width: 110, height: 66 }} />
        <p>
          Drag and drop image here or <a href="#void">browse</a>
        </p>
      </div>
    </div>
  );
}

Upload.propTypes = {};

export default Upload;
