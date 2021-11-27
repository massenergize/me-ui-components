import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./Upload.css";
import uploadDummy from "./up_img.png";
import {
  getFilesFromTransfer,
  getFileSize,
  getRandomStringKey,
  readContentOfSelectedFile,
  smartString,
} from "../../utils/utils";
import { spinner } from "../../utils/values";

export const EXTENSIONS = [
  "image/jpg",
  "image/png",
  "image/jpeg",
  "application/pdf",
];
function Upload({
  files,
  setFiles,
  previews,
  setPreviews,
  multiple,
  uploading,
  upload, //the upload function
}) {
  const dragBoxRef = useRef(null);
  const fileOpenerRef = useRef(null);
  useEffect(() => {}, [previews, files]);

  const handleSelectedFiles = (e) => {
    e.preventDefault();
    var arr = [];
    const targetFiles = e.target.files;
    for (let i = 0; i < targetFiles.length; i++) {
      const file = targetFiles[i];
      const fileJson = { id: getRandomStringKey(), file: file };
      arr.push(fileJson);
    }
    setFiles((prevFiles) => [...prevFiles, ...arr]);
    processForPreview(arr);
  };

  const handleDroppedFile = (e) => {
    e.preventDefault();
    dragBoxRef.current.classList.remove("ml-drag-over");
    var _files = getFilesFromTransfer(e?.dataTransfer?.items);
    var arr = [];
    for (let i = 0; i < _files.length; i++) {
      const file = _files[i];
      const fileJson = { id: getRandomStringKey(), file: file };
      arr.push(fileJson);
    }
    _files = [...files, ...arr];
    setFiles(_files);
    processForPreview(arr);
  };

  const processForPreview = async (files) => {
    for (let i = 0; i < files?.length; i++) {
      const fileObj = files[i];
      const baseImage = await readContentOfSelectedFile(fileObj?.file);
      const obj = {
        ...fileObj,
        src: baseImage,
        sizeText: getFileSize(fileObj?.file),
      };
      setPreviews((previous) => [...previous, obj]);
    }
  };

  const removeAnImage = (id) => {
    const remFxn = (item) => item.id !== id;
    const restFiles = files.filter(remFxn);
    const restPreviews = previews.filter(remFxn);
    setPreviews(restPreviews);
    setFiles(restFiles);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 40,
      }}
    >
      <input
        type="file"
        ref={fileOpenerRef}
        style={{ width: 0, height: 0 }}
        onChange={(e) => handleSelectedFiles(e)}
        accept={EXTENSIONS.join(", ")}
        multiple={multiple}
      />
      <div
        ref={dragBoxRef}
        className="ml-drag-box"
        onDragLeave={(e) => dragBoxRef.current.classList.remove("ml-drag-over")}
        onDragOver={(e) => {
          e.preventDefault();
          dragBoxRef.current.classList.add("ml-drag-over");
        }}
        onDrop={(e) => handleDroppedFile(e)}
      >
        {files?.length > 0 ? (
          <>
            <p>
              Upload ({files?.length}) File{files?.length == 1 ? "" : "s"}
            </p>
            {uploading ? (
              <img src={spinner} style={{ height: 70 }} />
            ) : (
              <button
                className="ml-footer-btn"
                style={{
                  "--btn-color": "white",
                  "--btn-background": "green",
                  height: "auto",
                  borderRadius: 4,
                }}
                onClick={() => upload()}
              >
                UPLOAD
              </button>
            )}
          </>
        ) : (
          <>
            <img src={uploadDummy} style={{ width: 110, height: 66 }} />
          </>
        )}
        {uploading ? (
          <p style={{ color: "#de8b28" }}>Uploading, please be patient...</p>
        ) : (
          <p>
            Drag and drop image here or{" "}
            <a
              href="#void"
              onClick={(e) => {
                e.preventDefault();
                fileOpenerRef.current.click();
              }}
            >
              browse
            </a>
          </p>
        )}
      </div>
      {/* ----------------- PREVIEW AREA --------------- */}
      <div className="ml-preview-area">
        {previews?.map((prev) => {
          return (
            <React.Fragment key={prev?.id?.toString()}>
              <PreviewElement
                {...prev}
                remove={removeAnImage}
                uploading={uploading}
              />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

const PreviewElement = ({ file, id, src, sizeText, remove, uploading }) => {
  return (
    <div
      style={{
        flexDirection: "column",
        display: "flex",
        margin: 10,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img src={src} className="ml-preview-image" />
      <small>{smartString(file?.name)}</small>
      <small>
        Size: <b>{sizeText}</b>
      </small>
      {!uploading && (
        <small className="ml-prev-el-remove" onClick={() => remove(id)}>
          Remove
        </small>
      )}
    </div>
  );
};
Upload.propTypes = {};

export default Upload;
