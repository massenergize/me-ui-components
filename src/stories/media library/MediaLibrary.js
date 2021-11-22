import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import "./MediaLibrary.css";
import Modal from "../modal/Modal";
import broken from "./../assets/img/img_broken.png";
import loadingGif from "./shared/images/loading-gif.gif";
import SidePane from "./SidePane";
function MediaLibrary(props) {
  return (
    <React.Fragment>
      <Modal
        showOverlay={false}
        size="lg"
        style={{
          height: 600,
          borderBottomRightRadius: 0,
          borderBottomLeftRadius: 0,
        }}
      >
        <div style={{ position: "relative", height: "100%" }}>
          <SidePane />
          <div className="m-inner-container">
            <div className="m-title-bar">
              <h3>Media Library</h3>
              <div className="m-tab-header-area">
                <div className="m-tab-header-item m-tab-header-item-unselected">
                  <p>Upload</p>
                </div>
                <div className="m-tab-header-item m-tab-header-item-selected">
                  <p>Library</p>
                </div>
              </div>
            </div>

            <div className="m-content-area" style={{ padding: 15 }}>
              {[1, 2, 3, 4, 4, 4, 4, 4].map((item, index) => {
                return (
                  <div key={index.toString()}>
                    <ImageThumbnail />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {/* ------- FOOOOOOOOOOOTER ------------- */}
        <div className="ml-footer elevate-1">
          <div style={{ marginLeft: "auto" }}>
            <button
              className="ml-footer-btn"
              style={{ "--btn-color": "white", "--btn-background": "maroon" }}
            >
              CANCEL
            </button>
            <button
              className="ml-footer-btn"
              style={{ "--btn-color": "white", "--btn-background": "green" }}
            >
              INSERT
            </button>
          </div>
        </div>
      </Modal>
    </React.Fragment>
  );
}

MediaLibrary.propTypes = {};

export const ImageThumbnail = (props) => {
  var imageRef = useRef(null);
  const [showImage, setShowImage] = useState(false);
  const [src, setSrc] = useState(null);
  return (
    <div className="m-thumbnail">
      {/*  This is what actually loads the image, but is always invisible */}
      <img
        src="https://i.pravatar.cc/300"
        style={{ width: 0, opacity: 0 }}
        onLoad={(e) => {
          setShowImage(true);
          setSrc(e.target.src);
        }}
      />
      {!showImage && (
        <img
          ref={(el) => (imageRef = el)}
          src={loadingGif}
          style={{ objectFit: "contain", height: 60, width: 60, margin: 20 }}
          onError={(e) => (e.target.src = broken)}
        />
      )}
      {showImage && (
        <img
          src={src}
          className="m-thumb-image"
          onError={(e) => (e.target.src = broken)}
        />
      )}
    </div>
  );
};
export default MediaLibrary;
