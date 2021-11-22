import React from "react";
import ImageThumbnail from "./shared/components/thumbnail/ImageThumbnail";

export default function SidePane() {
  return (
    <div className="ml-sidepane-container elevate-float">
      <h5 style={{ margin: 0, marginBottom: 10 }}>IMAGE DETAILS</h5>
      <ImageThumbnail />

      <h6 style={{ margin: 0 }}>URL</h6>
      <a href="#" style={{ fontSize: 13, color: "cornflowerblue" }}>
        www.google.com/something-n33f3-gbelekakulao-n3f333
      </a>
    </div>
  );
}
