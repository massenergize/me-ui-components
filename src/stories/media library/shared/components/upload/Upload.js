import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./Upload.css";
import uploadDummy from "./up_img.png";
import {
  getFilesFromTransfer,
  getRandomStringKey,
  readContentOfSelectedFile,
} from "../../utils/utils";

function Upload(props) {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [tempBasket, setTempBasket] = useState([]);
  
  const dragBoxRef = useRef(null);
  const fileOpenerRef = useRef(null);

  const handleSelectedFiles = (e) => {
    e.preventDefault();
    var arr = [];
    const targetFiles = e.target.files;
    for (let i = 0; i < targetFiles.length; i++) {
      const file = targetFiles[i];
      const fileJson = { id: getRandomStringKey(), file: file };
      arr.push(fileJson);
    }
    arr = [...arr, ...files];
    console.log("LE FILES", arr);
    setFiles(arr);
    processForPreview(arr);
  };

  const handleDroppedFile = (e) => {
    e.preventDefault();
    dragBoxRef.current.classList.remove("ml-drag-over");
    var _files = getFilesFromTransfer(e?.dataTransfer?.items);
    var arr = [];
    for (let i = 0; i < _files.length; i++) {
      const file = _files[i];
      const fileJson = { id: Date.now(), file: file };
      arr.push(fileJson);
    }
    _files = [...arr, ...files];
    setFiles(_files);
    processForPreview(_files);
    console.log(_files);
  };

  const createImage = async (file, cb) => {
    const baseImage = await readContentOfSelectedFile(file);
    if (cb) cb(baseImage);
  };

  const processForPreview = async (files) => {
    for (let i = 0; i < files?.length; i++) {
      const fileObj = files[i];
      const baseImage = await readContentOfSelectedFile(fileObj?.file);
      const obj = { ...fileObj, src: baseImage };
      const newTogether = [obj, ...previews];
      setPreviews(newTogether);
      // if (i !== files.length - 1) setTempBasket(newTogether);
      // else {
      //   setPreviews(newTogether);
      //   setTempBasket([]);
      // }
    }
  };

  useEffect(() => {}, [previews]);
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
        multiple
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
        <img src={uploadDummy} style={{ width: 110, height: 66 }} />
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
      </div>
      {/* ----------------- PREVIEW AREA --------------- */}
      <div className="ml-preview-area">
        {previews?.map((prev, index) => {
          console.log("I amt eh prev", index);
          return (
            <React.Fragment key={prev?.id?.toString()}>
              <PreviewElement {...prev} />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

const PreviewElement = ({ file, id, src }) => {
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
      <small>Filename: Some file bi</small>{" "}
      <small>
        Size: <b>32 Mb</b>
      </small>
      <small className="ml-prev-el-remove">Remove</small>
    </div>
  );
};
Upload.propTypes = {};

export default Upload;
