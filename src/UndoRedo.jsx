import React from "react";
import { Button } from "@material-ui/core";
import Undo from "@material-ui/icons/Undo";
import Redo from "@material-ui/icons/Redo";

export function undoAction(sdApi) {
  if (sdApi.current.parameters.canGoBackInHistory()) {
    sdApi.current.parameters.goBackInHistoryAsync();
    return true;
    // const newParams = getApiValues({ ...props });
    // syncParams(setParams, newParams);
  } else return null;
  //then log this action, and or update local params
}

export function redoAction(sdApi) {
  if (sdApi.current.parameters.canGoForwardInHistory()) {
    sdApi.current.parameters.goForwardInHistoryAsync();
    return true;
    // const newParams = getApiValues({ ...props });
    // syncParams(setParams, newParams);
  } else return null;
}

export function getApiValues(sdApi, params) {
  //   const { sdApi, params } = props;
  const currentParams = Object.keys(params).map(
    (p) => sdApi.current.parameters.get({ id: p }).data[0]
  );
  const newParams = currentParams
    // .map((p) => ({ [p.id]: p.value }))
    .reduce((obj, each) => ({ ...obj, [each.id]: each.value }), {});
  return newParams;
}

function syncParams(setParams, newParams) {
  //   const { setParams, newParams } = props;
  setParams(newParams);
  //then log this action
}

export function UndoButton(props) {
  const { undoAndSync } = props;
  return (
    <Button
      variant="contained"
      //   onClick={() => undoAction({ ...props })}
      onClick={undoAndSync}
      startIcon={<Undo />}
    >
      UNDO
    </Button>
  );
}

export function RedoButton(props) {
  const { redoAndSync } = props;

  return (
    <Button
      variant="contained"
      //   onClick={() => redoAction()}
      onClick={redoAndSync}
      startIcon={<Redo />}
    >
      REDO
    </Button>
  );
}
