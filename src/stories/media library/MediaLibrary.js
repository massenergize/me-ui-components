import React, { Suspense, useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./MediaLibrary.css";
import MLButton from "./shared/components/button/MLButton";
import MediaLibraryModal from "./shared/components/library modal/MediaLibraryModal";
import ImageThumbnail from "./shared/components/thumbnail/ImageThumbnail";
import { libraryImage } from "./shared/utils/values";

function MediaLibrary(props) {
  const { actionText, selected, sourceExtractor, onInsert, multiple } = props;

  const [show, setShow] = useState(false);
  const [imageTray, setTrayImages] = useState(selected);
  const [state, setState] = useState({});

  const transfer = (content, reset) => {
    if (onInsert) return onInsert(content, reset);
  };

  const handleSelected = (content, reset) => {
    setTrayImages(content);
    setState((prev) => ({ ...prev, resetor: reset }));
    transfer(content, reset);
  };

  const remove = (id) => {
    if (!multiple) return setTrayImages(null);
    const rest = imageTray?.filter((itm) => itm.id !== id);
    setTrayImages(rest);
    transfer(rest, state?.resetor);
  };

  return (
    <React.Fragment>
      {show && (
        <div style={{ position: "fixed" }}>
          <MediaLibraryModal
            {...props}
            close={() => setShow(false)}
            getSelected={handleSelected}
            selected={imageTray}
          />
        </div>
      )}

      <div
        style={{
          width: "100%",
          minHeight: 300,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          border: "dashed 2px #e3e3e3",
          borderRadius: 10,
        }}
      >
        {!imageTray || imageTray?.length === 0 ? (
          <img src={libraryImage} style={{ height: 150 }} />
        ) : (
          <ImageTray
            sourceExtractor={sourceExtractor}
            content={imageTray}
            remove={remove}
            multiple={multiple}
          />
        )}

        <MediaLibrary.Button
          onClick={() => {
            setShow(true);
          }}
          style={{ borderRadius: 5, marginTop: 20, padding: "15px 40px" }}
        >
          {actionText}
        </MediaLibrary.Button>
      </div>
    </React.Fragment>
  );
}

const ImageTray = ({ sourceExtractor, remove, content, multiple }) => {
  if (!multiple)
    return (
      <TrayImage
        src={sourceExtractor ? sourceExtractor(content) : content?.url}
        id={content?.id}
        remove={remove}
      />
    );
  return (
    <div
      style={{
        display: "flex",
        overflowX: "scroll",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {content?.map((img, index) => {
        const src = sourceExtractor ? sourceExtractor(img) : img.url;
        return (
          <React.Fragment key={index.toString()}>
            <TrayImage src={src} id={img?.id} remove={remove} />
          </React.Fragment>
        );
      })}
    </div>
  );
};

const TrayImage = ({ src, remove, id }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <img src={src} className="ml-preview-image elevate-float" />
      <small className="ml-prev-el-remove" onClick={() => remove(id)}>
        Remove
      </small>
    </div>
  );
};

MediaLibrary.propTypes = {
  /**
   * @param images
   * Function that retrieves all selected images out of the component  */
  onInsert: PropTypes.func,

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
   determines if user will be allowed to select multiple images from library
   */
  uploadMultiple: PropTypes.bool,
  /**
   * Sets whether multiple images should be selected for upload.
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

  /**
   * Custom text that should show on media library modal trigger button
   */
  actionText: PropTypes.string,
};

MediaLibrary.Button = MLButton;
MediaLibrary.ThumbnailImage = ImageThumbnail;
MediaLibrary.defaultProps = {
  multiple: true,
  images: [],
  defaultTab: MediaLibrary.LIBRARY_TAB,
  selected: [],
  actionText: "Choose From Library",
};
export default MediaLibrary;
