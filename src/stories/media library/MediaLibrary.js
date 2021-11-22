import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import "./MediaLibrary.css";
import Modal from "../modal/Modal";

import SidePane from "./SidePane";
import Upload from "./shared/components/upload/Upload";
import Library from "./shared/components/library/Library";

function MediaLibrary(props) {
  const Tabs = [
    { headerName: "Upload", key: "upload", component: <Upload /> },
    {
      headerName: "Library",
      key: "library",
      component: <Library />,
    },
  ];

  const [currentTab, setCurrentTab] = useState("upload");

  const TabComponent = Tabs.find((tab) => tab.key === currentTab)?.component;
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
              {/* --------------------- TAB HEADER AREA -------------- */}
              <div className="m-tab-header-area">
                {Tabs.map((tab) => {
                  const isCurrent = currentTab === tab.key;
                  return (
                    <div
                      className={`m-tab-header-item m-tab-header-item-${
                        isCurrent ? "selected" : "unselected"
                      }`}
                      onClick={() => setCurrentTab(tab.key)}
                    >
                      <p>{tab.headerName}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ------------------------ MAIN TAB DISPLAY AREA ------------------- */}
            <div>{TabComponent}</div>
          </div>
          <Footer />
        </div>
      </Modal>
    </React.Fragment>
  );
}

const Footer = (props) => {
  return (
    <div className="ml-footer">
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
  );
};
MediaLibrary.propTypes = {};

export default MediaLibrary;
