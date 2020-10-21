import React from "react";
import { IconButton } from "@material-ui/core";
import Undo from "@material-ui/icons/Undo";
import Redo from "@material-ui/icons/Redo";
import Tooltip from "@material-ui/core/Tooltip";

export function undoAction(sdApi) {
  if (sdApi.current.parameters.canGoBackInHistory()) {
    sdApi.current.parameters.goBackInHistoryAsync();
    return true;
  } else return null;
}

export function redoAction(sdApi) {
  if (sdApi.current.parameters.canGoForwardInHistory()) {
    sdApi.current.parameters.goForwardInHistoryAsync();
    return true;
  } else return null;
}

export function getApiValues(sdApi, params) {
  const currentParams = Object.keys(params).map(
    (p) => sdApi.current.parameters.get({ id: p }).data[0]
  );
  const newParams = currentParams.reduce(
    (obj, each) => ({ ...obj, [each.id]: each.value }),
    {}
  );
  return newParams;
}

export function UndoButton(props) {
  return (
    <Tooltip title="Undo" arrow>
      <IconButton aria-label="Undo" onClick={props.undoAndSync} color={props.timedOut? "primary": "default"}>
        <Undo />
      </IconButton>
    </Tooltip>
  );
}

export function RedoButton(props) {
  return (
    <Tooltip title="Redo" arrow>
      <IconButton aria-label="Redo" onClick={props.redoAndSync}>
        <Redo />
      </IconButton>
    </Tooltip>
  );
}
