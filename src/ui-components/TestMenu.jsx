import React from "react";
import { Grid } from "@material-ui/core";
import ScreenCapButton from "../ScreenCapButton";
import { UndoButton, RedoButton } from "../UndoRedo";

export default function TestMenu(props) {
  return (
    <div>
      <ScreenCapButton {...props} />
      <p />
      <UndoButton {...props} />
      <p />
      <RedoButton {...props} />
    </div>
  );
}
