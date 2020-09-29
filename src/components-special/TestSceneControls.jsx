import React from "react";

import { Button } from "@material-ui/core";
// import { useState } from "react";
// import PersonIcon from "@material-ui/icons/Person";
// import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";

//refactor at some point, initializing the show state in the initial parameters.
//create two groups - Preview and EditMode
//toggle the state of each group when the toggle button is activated.

export function ToggleView(props) {
  const { sdApi } = props;
  //   const [frontOn, setFrontOn] = useState(false);

  const setToFront = () => {
    console.log(
      'sdApi.current.updateSettingAsync("scene.camera.cameraTypes.active", 6);',
      sdApi.current
        .updateSettingAsync("scene.camera.cameraTypes.active", 6)
        .then(sdApi.current.scene.camera.zoomAsync(null, { duration: 1000 }))
    );
  };

  const setToPerspective = () => {
    console.log(
      'sdApi.current.updateSettingAsync("scene.camera.cameraTypes.active", 0',
      sdApi.current
        .updateSettingAsync("scene.camera.cameraTypes.active", 0)
        .then(sdApi.current.scene.camera.zoomAsync(null, { duration: 1000 }))
    );
  };

  return (
    <Button onClick={setToFront} onDoubleClick={setToPerspective}>
      Front/Perspective
    </Button>
  );
}
