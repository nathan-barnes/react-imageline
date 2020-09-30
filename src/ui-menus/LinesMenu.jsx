import React from "react";
import { Grid, Button, Typography } from "@material-ui/core";
import Waves from "@material-ui/icons/Waves";
import RotateRightIcon from "@material-ui/icons/RotateRight";

import FeedbackButtonToggle from "../components-generic/FeedbackButtonToggle";
import FeedbackSlider from "../components-generic/FeedbackSlider";

import { getPaths, getCenterPivot } from "../SDHelpers";
import { liveTransform } from "../LiveTransforms";

export default function LinesMenu(props) {
  const {
    getProps,
    getValue,
    resetPoints,
    toggleEditMode,
    sdApi,
    setDragValue,
    paramIds,
    editOn,
  } = props;
  return (
    <div>
      <Grid
        container
        //   style={{ padding: 10 }}
        spacing={2}
      >
        <Grid container>
          <Grid item xs={12}>
            <FeedbackSlider
              label={
                (getValue("Waves: Lines/Waves") ? " Wave" : " Line") + "s/ft"
              }
              icon={Waves}
              {...getProps("Lines: Per Ft")}
            />
          </Grid>
          <Grid item xs={12}>
            <FeedbackSlider
              label={"Rotation (degrees)"}
              {...getProps("Lines: Rotation")}
              icon={RotateRightIcon}
              handleSliderDrag={(event, newValue) => {
                const rotationDegree = newValue - getValue("Lines: Rotation");

                try {
                  const paths = getPaths(sdApi.current, [
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
        <Grid container spacing={2} direction="row-reverse">
          <Grid item xs={6} sm={6} md={12} lg={6}>
            <FeedbackButtonToggle
              option1="EDIT LINES"
              option2="PREVIEW MODE"
              value={editOn}
              handleToggle={() => {
                toggleEditMode();
              }}
            />
          </Grid>

          <Grid item xs={6} sm={6} md={12} lg={6}>
            <Button
              variant="contained"
              onClick={resetPoints}
              styles={{ color: "white" }}
            >
              <Typography color="primary" variant="h6">
                RESET LINES
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
