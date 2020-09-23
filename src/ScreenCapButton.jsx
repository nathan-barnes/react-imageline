import React from "react";

import { Button } from "@material-ui/core";
import Image from "@material-ui/icons/Image";

export default function ScreenCapButton(props) {
  const { sdApi } = props;

  const onClick = () => {
    const imageURI = sdApi.current.scene.getScreenshot();
    console.log("imageURI: ", imageURI, imageURI.toString());
    const link = document.createElement("a");
    link.download = "ScreenshotName";
    link.href = imageURI;
    link.click();
  };

  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={onClick}
      startIcon={<Image />}
    >
      Download Screenshot
    </Button>
  );
}
