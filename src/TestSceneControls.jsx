import React from "react";

import { Button, IconButton } from "@material-ui/core";
import { useState } from "react";
import PersonIcon from "@material-ui/icons/Person";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import Donut from "react-dial-knob";

export function TogglePerson(props) {
  const [showState, setShowState] = useState(false);
  const { sdApi } = props;
  const editMode = props.editMode || false;

  const getPerson = () => {
    return sdApi.current.scene
      .get({ name: "Person" }, "CommPlugin_1")
      .data.filter((p) => p.hasOwnProperty("bbmax"))[0].scenePath;
  };

  const togglePerson = () => {
    try {
      const toShow = showState ? [[getPerson()], []] : [[], [getPerson()]];
      sdApi.current.scene.toggleGeometry(...toShow);
    } catch (err) {
      console.log("no person to toggle", err);
    }
    setShowState(!showState);
  };

  return (
    <IconButton onClick={togglePerson}>
      {showState || editMode ? <PersonOutlineOutlinedIcon /> : <PersonIcon />}
    </IconButton>
  );
}

//refactor at some point, initializing the show state in the initial parameters.
//create two groups - Preview and EditMode
//toggle the state of each group when the toggle button is activated.
export function ToggleDrivers(props) {
  const [showState, setShowState] = useState(false);
  const { sdApi } = props;
  const filters = ["Sphere", "TweenLines", "GuideCrvs"];

  const getAssets = () => {
    const assets = sdApi.current.scene
      .get(null, "CommPlugin_1")
      .data.filter(
        (p) =>
          filters.includes(p.name.split("_")[0]) && p.hasOwnProperty("bbmin")
      )
      .map((q) => q.scenePath);
    return assets;
  };

  //probably should consider storing these with useRef or useState
  //   const getPanels = () => {
  //     const assets = showState
  //       ? sdApi.current.scene
  //           .get({ name: "PanelBounds" }, "CommPlugin_1")
  //           .data.filter((p) => p.hasOwnProperty("bbmax"))[0].scenePath
  //       : null;
  //     return assets;
  //   };

  const toggleDrivers = () => {
    try {
      const toShow = showState
        ? [[...getAssets()], []]
        : [[], [...getAssets()]];
      // console.log("toshow Drivers: ", toShow);
      sdApi.current.scene.toggleGeometry(...toShow);
    } catch (err) {
      console.log("no drivers to toggle", err);
    }

    setShowState(!showState);
    // zoom call is not working as desired!!!!
    sdApi.current.scene.camera.zoomAsync(null, { duration: 1000 });
  };

  return <Button onClick={toggleDrivers}>Toggle Drivers</Button>;
}

export function ToggleView(props) {
  const { sdApi } = props;
  const [frontOn, setFrontOn] = useState(false);

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

export function EditModeToggle(props) {
  return (
    <IconButton
      aria-label="Edit Mode"
      onClick={props.toggleEditMode}
    ></IconButton>
  );
}
