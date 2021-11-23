import React, { Suspense, useRef, useState } from "react";
import PropTypes from "prop-types";
import "./MediaLibrary.css";
import Modal from "../modal/Modal";
import SidePane from "./SidePane";
import Upload from "./shared/components/upload/Upload";
const Library = React.lazy(() => import("./shared/components/library/Library"));

function MediaLibrary({ multiple = true }) {
  const [currentTab, setCurrentTab] = useState("upload");
  const [activeImage, setActiveImage] = useState(null);

  const [previews, setPreviews] = useState([]);
  const [files, setFiles] = useState([]);

  const Tabs = [
    {
      headerName: "Upload",
      key: "upload",
      component: (
        <Upload
          previews={previews}
          setPreviews={setPreviews}
          files={files}
          setFiles={setFiles}
          multiple={multiple}
        />
      ),
    },
    {
      headerName: "Library",
      key: "library",
      component: (
        <Suspense fallback={<p>Loading...</p>}>
          <Library getActiveImage={setActiveImage} />
        </Suspense>
      ),
    },
  ];

  const TabComponent = Tabs.find((tab) => tab.key === currentTab)?.component;
  return (
    <React.Fragment>
      <Modal
        showOverlay={false}
        size="lg"
        style={{
          minHeight: 680,
          borderBottomRightRadius: 0,
          borderBottomLeftRadius: 0,
        }}
        className="elevate-5"
      >
        <div style={{ position: "relative", height: "100%" }}>
          {activeImage && <SidePane activeImage={activeImage} />}
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
                      onClick={() => {
                        setCurrentTab(tab.key);
                        setActiveImage(null);
                      }}
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
