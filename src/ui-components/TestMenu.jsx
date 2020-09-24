import React from "react";
import { Grid } from "@material-ui/core";
import ScreenCapButton from "../ScreenCapButton";
import { UndoButton, RedoButton } from "../UndoRedo";
import { TogglePerson, ToggleDrivers, ToggleView } from "../TestSceneControls";

export default function TestMenu(props) {
  return (
    <div>
      <ScreenCapButton {...props} />
      <p />
      <UndoButton {...props} />
      <p />
      <RedoButton {...props} />
      <p />
      <TogglePerson {...props} />
      <p />
      <ToggleDrivers {...props} />
      <p />
      <ToggleView {...props} />
    </div>
  );
}
