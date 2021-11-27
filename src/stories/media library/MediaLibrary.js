import React, { Suspense, useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./MediaLibrary.css";
import MLButton from "./shared/components/button/MLButton";
import MediaLibraryModal from "./shared/components/library modal/MediaLibraryModal";
import ImageThumbnail from "./shared/components/thumbnail/ImageThumbnail";

function MediaLibrary(props) {
  const {
    multiple = true,
    onInsert,
    // onCancel,
    onUpload,
    images,
    sourceExtractor,
    defaultTab,
    selected,
  } = props;

  const [show, setShow] = useState(false);
  const [imageTray, setTrayImages] = useState()

  return (
    <React.Fragment>
      {show && (
        <div style={{ position: "fixed" }}>
          <MediaLibraryModal {...props} onCancel={() => setShow(false)} />
        </div>
      )}

      <div>
        <MediaLibrary.Button
          onClick={() => {
            setShow(true);
          }}
        >
          Show Library
        </MediaLibrary.Button>
      </div>
    </React.Fragment>
  );
}

MediaLibrary.propTypes = {
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

MediaLibrary.Button = MLButton;
MediaLibrary.ThumbnailImage = ImageThumbnail;
MediaLibrary.defaultProps = {
  multiple: true,
  images: [],
  defaultTab: MediaLibrary.LIBRARY_TAB,
  selected: [],
};
export default MediaLibrary;
