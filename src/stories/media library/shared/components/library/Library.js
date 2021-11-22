import React, { useState } from "react";
import PropTypes from "prop-types";

import ImageThumbnail from "../thumbnail/ImageThumbnail";

function Library({ multiple }) {
  const [content, setSelectedContent] = useState(null);

  const handleSelection = (image) => {
    if (!multiple) return setSelectedContent(image);
    var images = content || [];
    var found = images.find((img) => img.id === image.id);
    var rest = images.filter((img) => img.id !== image.id);
    if (!found) rest = [...rest, image];
    setSelectedContent(rest);
  };

  const checkIfSelected = (image) => {
    if (!multiple) return image?.id === content?.id;
    var images = content || [];
    return images?.find((img) => img.id === image.id);
  };

  return (
    <div>
      <div className="m-content-area" style={{ padding: 15 }}>
        {images.map((image, index) => {
          const selected = checkIfSelected(image);
          return (
            <div key={index.toString()} style={{ position: "relative" }}>
              <ImageThumbnail
                imageSource={image.url}
                onClick={() => handleSelection(image)}
              />
              {selected && (
                <p className="ml-thumb-checkmark elevate-float">&#10004;</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

Library.propTypes = {};

export default Library;

const images = [
  { url: "https://i.pravatar.cc/300", id: 1 },
  { url: "https://i.pravatar.cc/300", id: 12 },
  { url: "https://i.pravatar.cc/300", id: 14 },
  { url: "https://i.pravatar.cc/300", id: 15 },
  { url: "https://i.pravatar.cc/300", id: 16 },
  { url: "https://i.pravatar.cc/300", id: 18 },
  { url: "https://i.pravatar.cc/300", id: 19 },
  { url: "https://i.pravatar.cc/300", id: 11 },
  { url: "https://i.pravatar.cc/300", id: 18 },
];
