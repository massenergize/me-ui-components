import React, { useState } from "react";
import PropTypes from "prop-types";
import broken from "./img_broken.png";
import loadingGif from "./loading-gif.gif";

function ImageThumbnail({ onClick, imageSource }) {
  const [showImage, setShowImage] = useState(false);
  const [src, setSrc] = useState(null);

  return (
    <div className="m-thumbnail">
      {/*  This is what actually loads the image, but is always invisible */}
      <img
        src={imageSource}
        style={{ width: 0, opacity: 0 }}
        onLoad={(e) => {
          setShowImage(true);
          setSrc(e.target.src);
        }}
        onError={() => {
          setShowImage(true);
          setSrc(broken);
        }}
      />
      {!showImage && (
        <img
          src={loadingGif}
          style={{ objectFit: "contain", height: 60, width: 60, margin: 20 }}
          onError={(e) => (e.target.src = broken)}
        />
      )}
      {showImage && (
        <img
          onClick={() => onClick && onClick()}
          src={src}
          className="m-thumb-image"
          onError={(e) => (e.target.src = broken)}
        />
      )}
    </div>
  );
}
ImageThumbnail.propTypes = {};

export default ImageThumbnail;