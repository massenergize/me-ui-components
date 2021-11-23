import React, { Suspense, useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./MediaLibrary.css";
import Modal from "../modal/Modal";
import SidePane from "./SidePane";
import Upload from "./shared/components/upload/Upload";
const Library = React.lazy(() => import("./shared/components/library/Library"));

function MediaLibrary({
  multiple = true,
  onInsert,
  onCancel,
  onUpload,
  images,
}) {
  const [currentTab, setCurrentTab] = useState("upload");
  const [showSidePane, setShowSidePane] = useState(false);

  const [previews, setPreviews] = useState([]);
  const [files, setFiles] = useState([]);
  const [content, setSelectedContent] = useState(null);

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
          <Library
            setSelectedContent={setSelectedContent}
            content={content}
            setShowSidePane={setShowSidePane}
            multiple={multiple}
          />
        </Suspense>
      ),
    },
  ];

  const TabComponent = Tabs.find((tab) => tab.key === currentTab)?.component;
  const last = content?.length - 1;
  const activeImage = multiple ? (content || [])[last] : content; // if multiple selection is active, just show the last selected item in the side pane
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
          {showSidePane && (
            <SidePane
              activeImage={activeImage}
              setShowSidePane={setShowSidePane}
            />
          )}
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
                        setShowSidePane(false);
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
          <Footer files={files} content={content} multiple={multiple} />
        </div>
      </Modal>
    </React.Fragment>
  );
}

const Footer = ({ files, content, multiple }) => {
  var len = content && 1;
  if (multiple) len = content?.length;

  return (
    <div className="ml-footer">
      <h3 style={{ margin: 0, marginLeft: 10, color: "#ffebd2", fontSize: 12 }}>
        @massenergize
      </h3>
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
          INSERT {len > 0 ? `(${len})` : ""}
        </button>
      </div>
    </div>
  );
};
MediaLibrary.propTypes = {
  /**
   * @param images
   * Functions that retrieves all selected images out of teh component  */
  onInsert: PropTypes.func,
  /** Should be a function that closes the modal */
  onCancel: PropTypes.func,
  /**
   * @param files
   * Function that should run to upload selected files to backend */
  onUpload: PropTypes.func,
  /**
   * Array of images to be shown in the library
   */
  images: PropTypes.arrayOf(PropTypes.object),
  /**
   * Sets whether multiple images should be selected for upload.
   * Same field determines if user should be allowed to select multiple images from library
   */
  multiple: PropTypes.bool,
};

MediaLibrary.defaultProps = {
  multiple: true,
};
export default MediaLibrary;
