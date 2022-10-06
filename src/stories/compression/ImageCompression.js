import React, { useRef } from "react";

function ImageCompression() {
  const image = useRef();
  const hiddenImage = useRef();

  const onChange = (event) => {
    const file = event.target.files[0];
    readContent(file, function (response) {
      console.log("Old file size :: ", file.size);
      hiddenImage.current.src = response;
      createLowRes(response, (lowRes) => {
        image.current.src = lowRes.source;
        const newFile = toFile(lowRes.source);
        console.log("THe new size:: ", newFile.size);
      });
      //   const tempImage = new Image();

      //   tempImage.src = response;
      //   tempImage.onload = () => {
      //     const lowRes = createLowRes(tempImage);
      //     image.current.src = lowRes.source;
      //     const newFile = toFile(lowRes.source);
      //     console.log("THe new size:: ", newFile.size);
      //   };
    });
  };
  return (
    <div>
      <input
        type="file"
        placeholder="Choose an image from your device"
        onChange={onChange}
      />
      <br />
      <img
        ref={image}
        src={{ height: "auto", width: "auto", marginBottom: 10 }}
      />
      <img
        ref={hiddenImage}
        src={{ height: "auto", width: "auto", marginBottom: 10 }}
        hidden
      />
    </div>
  );
}

export default ImageCompression;

const readContent = (file, cb) => {
  return new Promise(function (resolve, reject) {
    const reader = new FileReader();
    reader.onload = function () {
      if (cb) cb(reader.result);
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const createLowRes = (source, cb) => {
  const image = new Image();
  image.src = source;
  const canvas = document.createElement("canvas");
  image.onload = () => {
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0, image.width, image.height);
    cb && cb({ source: canvas.toDataURL("image/jpeg", 0.5), canvas });
  };
};

const toFile = (base64String) => {
  var arr = base64String.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], "New File Meerhn", { type: mime });
};
