import React from "react";

import { IconButton } from "@material-ui/core";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import ToolTip from "@material-ui/core/Tooltip";
import asyncLogParams from "../components-logging/firebaseRealtime";

export default function ScreenCapButton(props) {
  const { sdApi } = props;

  const onClick = () => {
    const imageURI = sdApi.current.scene.getScreenshot();
    // console.log("imageURI: ", imageURI, imageURI.toString());
    const link = document.createElement("a");
    link.download = "Zahner-ImageLines";
    link.href = imageURI;
    link.click();
    asyncLogParams("CaptureDownload", 1);
  };

  return (
    <ToolTip title="screenshot" arrow>
      <IconButton aria-label="download ScreenShot" onClick={onClick}>
        <CameraAltIcon />
      </IconButton>
    </ToolTip>
  );
}
