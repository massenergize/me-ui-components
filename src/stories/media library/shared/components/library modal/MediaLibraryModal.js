import React, { Suspense, useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
// import "./MediaLibrary.css";
import Modal from "./../../../../modal/Modal";
import SidePane from "./../sidepane/SidePane";
import Upload from "./../upload/Upload";
import MLButton from "../button/MLButton";
const Library = React.lazy(() => import("./../library/Library")); // so that library component only loads when needed

function MediaLibraryModal({
  multiple = true,
  onInsert,
  onCancel,
  onUpload,
  images,
  sourceExtractor,
  defaultTab,
  selected,
}) {
  const [currentTab, setCurrentTab] = useState(defaultTab);
  const [showSidePane, setShowSidePane] = useState(false);
  const [previews, setPreviews] = useState([]);
  const [files, setFiles] = useState([]);
  const [content, setSelectedContent] = useState(selected);
  const [state, setState] = useState({});

  const handleUpload = () => {
    if (!onUpload) return;
    setState((prev) => ({ ...prev, uploading: true }));
    onUpload(files, setCurrentTab, reset);
  };

  const handleInsert = () => {
    if (!onInsert) return;
    onInsert(content, reset);
  };

  const handleCancel = () => {
    if (!onCancel) return;
    onCancel();
  };

  const reset = () => {
    setPreviews([]);
    setFiles([]);
    setState({});
  };

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
          uploading={state?.uploading}
          upload={handleUpload}
        />
      ),
    },
    {
      headerName: "Library",
      key: "library",
      component: (
        <Suspense fallback={<p>Loading...</p>}>
          <Library
            sourceExtractor={sourceExtractor}
            setSelectedContent={setSelectedContent}
            content={content}
            setShowSidePane={setShowSidePane}
            multiple={multiple}
            images={images}
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
        // showOverlay={false}
        size="md"
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
          <Footer
            files={files}
            content={content}
            multiple={multiple}
            cancel={handleCancel}
            insert={handleInsert}
          />
        </div>
      </Modal>
    </React.Fragment>
  );
}

const Footer = ({ content, multiple, cancel, insert }) => {
  var len = content && 1;
  if (multiple) len = content?.length;

  return (
    <div className="ml-footer">
      <h3 style={{ margin: 0, marginLeft: 10, color: "#ffebd2", fontSize: 12 }}>
        @massenergize
      </h3>
      <div style={{ marginLeft: "auto" }}>
        <MLButton backColor="maroon" btnColor="white" onClick={cancel}>
          CANCEL
        </MLButton>
        {/* <button
          className="ml-footer-btn"
          style={{ "--btn-color": "white", "--btn-background": "maroon" }}
          cancel={() => cancel()}
        >
          CANCEL
        </button> */}
        <button
          className="ml-footer-btn"
          style={{ "--btn-color": "white", "--btn-background": "green" }}
          onClick={() => insert()}
        >
          INSERT {len > 0 ? `(${len})` : ""}
        </button>
      </div>
    </div>
  );
};
MediaLibraryModal.propTypes = {
  /**
   * @param images
   * Functions that retrieves all selected images out of the component  */
  onInsert: PropTypes.func,
  /** Should be a function that closes the modal */
  onCancel: PropTypes.func,
  /**
   * @param files
   * @tabChanger Provides a function that will allow you to change tab outside the component
   * @reset Provides a function that will reset the component
   * Function that should run to upload selected files to backend */
  onUpload: PropTypes.func,
  /**
   * Array of images to be shown in the library
   */
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  /**
   * Sets whether multiple images should be selected for upload.
   * Same field determines if user should be allowed to select multiple images from library
   */
  multiple: PropTypes.bool,
  /**
   * A function that is used to extract the  URL of each image
   */
  sourceExtractor: PropTypes.func,
  /**
   * List of images to show as preselected items in the library. Should be an array if multiple = true, and not an array if multiple = false
   */
  selected: PropTypes.arrayOf(PropTypes.object),
};

MediaLibraryModal.UPLOAD_TAB = "upload";
MediaLibraryModal.LIBRARY_TAB = "library";
MediaLibraryModal.defaultProps = {
  multiple: true,
  images: [],
  defaultTab: MediaLibraryModal.LIBRARY_TAB,
  selected: [],
};
export default MediaLibraryModal;
