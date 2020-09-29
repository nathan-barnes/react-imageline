import React from "react";
import { Grid, Button } from "@material-ui/core";
import {
  ToggleDrivers,
  // ToggleView,
} from "../components-special/TestSceneControls";
import { liveTransform } from "../LiveTransforms";
import FeedbackSlider from "../components-generic/FeedbackSlider";
import RotateRightIcon from "@material-ui/icons/RotateRight";
import { getPaths, getCenterPivot } from "../SDHelpers";

export default function TestMenu(props) {
  const {
    getProps,
    getValue,
    sdApi,
    setDragValue,
    paramIds,
    toggleEditMode,
    updateViewState,
  } = props;

  return (
    <div>
      <ToggleDrivers {...props} />
      <p />
      <Button onClick={toggleEditMode}>Toggle Edit Mode</Button>
      {/* <ToggleView {...props} /> */}
      <Grid container>
        <Grid item xs={12}>
          <FeedbackSlider
            label={"Rotation (degrees)"}
            {...getProps("Lines: Rotation")}
            icon={RotateRightIcon}
            handleSliderDrag={(event, newValue) => {
              const rotationDegree = -(newValue - getValue("Lines: Rotation"));

              try {
                const paths = getPaths(sdApi, [
                  "Sphere",
                  "Tweens",
                  "GuideCrvs",
                ]);
                const pivot = getCenterPivot(sdApi, "ImageDisplay");
                liveTransform(sdApi, paths, rotationDegree, pivot);
              } catch (err) {
                console.log("no driver geo found: ", err);
              }

              setDragValue(newValue, paramIds["Lines: Rotation"], "range");
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}
