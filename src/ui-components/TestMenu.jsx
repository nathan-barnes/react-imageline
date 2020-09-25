import React from "react";
import { Grid } from "@material-ui/core";
import ScreenCapButton from "../ScreenCapButton";
import { UndoButton, RedoButton } from "../UndoRedo";
import {
  TogglePerson,
  ToggleDrivers,
  ToggleView,
  MyDonut,
} from "../TestSceneControls";
import { Donut } from "react-dial-knob";

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
