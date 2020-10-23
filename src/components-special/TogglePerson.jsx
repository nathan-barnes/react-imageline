import React from "react";
// import { useState } from "react";
import PersonIcon from "@material-ui/icons/Person";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import { IconButton } from "@material-ui/core";

export const getPerson = (sdApi) => {
  return sdApi.current.scene
    .get({ name: "Person" }, "CommPlugin_1")
    .data.filter((p) => p.hasOwnProperty("bbmax"))[0].scenePath;
};

export function TogglePerson(props) {
  const { personState, setPersonState } = props;
  // const [showState, setShowState] = useState(false);
  const { sdApi } = props;
  const editOn = props.editOn;

  const togglePerson = () => {
    if (editOn) {
      try {
        const toShow = !personState
          ? [[getPerson(sdApi)], []]
          : [[], [getPerson(sdApi)]];
        sdApi.current.scene.toggleGeometry(...toShow);
      } catch (err) {
        // console.log("no person to toggle", err);
      }
      setPersonState(!personState);
      props.asyncLogParams("Person",!personState,"")
    }
  };

  return (
    <IconButton onClick={togglePerson}>
      {!personState || !editOn ? <PersonOutlineOutlinedIcon /> : <PersonIcon />}
    </IconButton>
  );
}
