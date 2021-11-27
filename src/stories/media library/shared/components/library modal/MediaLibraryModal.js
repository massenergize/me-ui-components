import React, { Suspense, useState } from "react";
import Modal from "./../../../../modal/Modal";
import SidePane from "./../sidepane/SidePane";
import Upload from "./../upload/Upload";
import MLButton from "../button/MLButton";
const Library = React.lazy(() => import("./../library/Library")); // so that library component only loads when needed

function MediaLibraryModal({
  multiple = true,

  cancel,
  onUpload,
  images,
  sourceExtractor,
  defaultTab,
  selected,
  getSelected,
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
    getSelected(content, reset);
    cancel();
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
        close={cancel}
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
                      key={tab.key}
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
            cancel={cancel}
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

MediaLibraryModal.UPLOAD_TAB = "upload";
MediaLibraryModal.LIBRARY_TAB = "library";
MediaLibraryModal.defaultProps = {
  multiple: true,
  images: [],
  defaultTab: MediaLibraryModal.LIBRARY_TAB,
  selected: [],
};
export default MediaLibraryModal;
