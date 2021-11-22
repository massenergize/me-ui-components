import React from "react";
import PropTypes from "prop-types";
import "./MediaLibrary.css";
import Modal from "../modal/Modal";
import broken from "./../assets/img/img_broken.png";
function MediaLibrary(props) {
  return (
    <div>
      <Modal showOverlay={false} size="lg" style={{ height: 600 }}>
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
              return <ImageThumbnail />;
            })}
          </div>
        </div>
      </Modal>
    </div>
  );
}

MediaLibrary.propTypes = {};   




const ImageThumbnail = (props) => {
  return (
    <div className="m-thumbnail">
      <img
        src="https://i.pravatar.cc/300"
        className="m-thumb-image"
        onError={(e) => (e.target.src = broken)}
      />
    </div>
  );
};
export default MediaLibrary;
