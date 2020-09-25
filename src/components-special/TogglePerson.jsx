import React from "react";
import { useState } from "react";
import PersonIcon from "@material-ui/icons/Person";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import { IconButton } from "@material-ui/core";

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
