import React from "react";
import useDrivePicker from "react-google-drive-picker/dist";

function Import() {
  const [openPicker, authResponse] = useDrivePicker();
  // const customViewsArray = [new google.picker.DocsView()]; // custom view
  const handleOpenPicker = () => {
    openPicker({
      clientId:
        "1034022709126-utt2fnmpqk5mvo00alm658d16us360dn.apps.googleusercontent.com",
      developerKey: "AIzaSyCTKnZPKHSRliMfl3DLnS_W0pk3C96wbaE",
      viewId: "DOCS",
      // token: token, // pass oauth token in case you already have one
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: false,
      // customViews: customViewsArray, // custom view
      callbackFunction: (data) => {
        if (data.action === "cancel") {
          console.log("User clicked cancel/close button");
        }
        console.log(data);
      },
    });
  };
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <button style={{ padding: 15 }} onClick={() => handleOpenPicker()}>
        OPEN DRIVE DIALOG
      </button>
    </div>
  );
}

export default Import;
