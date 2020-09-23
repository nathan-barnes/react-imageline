import React from "react";
import { Button } from "@material-ui/core";
import Undo from "@material-ui/icons/Undo";
import Redo from "@material-ui/icons/Redo";

export function UndoButton(props) {
  const { sdApi } = props;
  const undoAction = () => {
    if (sdApi.current.parameters.canGoBackInHistory())
      sdApi.current.parameters.goBackInHistoryAsync();
    //then log this action?
  };
  return (
    <Button
      variant="contained"
      onClick={() => undoAction()}
      startIcon={<Undo />}
    >
      UNDO
    </Button>
  );
}

export function RedoButton(props) {
  const { sdApi } = props;
  const redoAction = () => {
    if (sdApi.current.parameters.canGoForwardInHistory())
      sdApi.current.parameters.goForwardInHistoryAsync();
    //then log this action?
  };
  return (
    <Button
      variant="contained"
      onClick={() => redoAction()}
      startIcon={<Redo />}
    >
      REDO
    </Button>
  );
}
