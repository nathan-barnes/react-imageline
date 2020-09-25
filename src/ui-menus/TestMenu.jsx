import React from "react";
import { Grid } from "@material-ui/core";
import ScreenCapButton from "../components-special/ScreenCapButton";
import { UndoButton, RedoButton } from "../components-special/UndoRedo";
import {
  //   TogglePerson,
  ToggleDrivers,
  ToggleView,
} from "../components-special/TestSceneControls";

export default function TestMenu(props) {
  return (
    <div>
      {/* <ScreenCapButton {...props} />
      <p />
      <UndoButton {...props} />
      <RedoButton {...props} />
      <TogglePerson {...props} />
      <p /> */}
      <ToggleDrivers {...props} />
      <p />
      <ToggleView {...props} />
    </div>
  );
}
