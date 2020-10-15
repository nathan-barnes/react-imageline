import React from "react";
import ZoomOutMapIcon from "@material-ui/icons/ZoomOutMap";
import { IconButton, Tooltip } from "@material-ui/core";

export function ZoomExtents(props) {
  const { updateViewState } = props;

  return (
    <Tooltip title="Zoom Extents" arrow>
      <IconButton onClick={
        // () => {updateViewState(); props.asyncLogParams("ZoomEx",1,"")} // This doesn't work for some reason - triggers an update or something like that.
        updateViewState
        } aria-label="ZoomExtents">
        {<ZoomOutMapIcon />}
      </IconButton>
    </Tooltip>
  );
}
