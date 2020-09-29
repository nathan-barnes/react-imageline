import React from "react";
import { Grid, Button } from "@material-ui/core";
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
      >
        <Grid item xs={12}>
          <FeedbackSlider
            label={
              (getValue("Waves: Lines/Waves") ? " Wave" : " Line") + "s/ft"
            }
            icon={Waves}
            {...getProps("Lines: Per Ft")}
          />
        </Grid>
        {/* <Grid item xs={12}>
          <FeedbackSlider
            label={"Max Perf/ft"}
            {...getProps("Lines: Perf per Ft of Line")}
            icon={GraphicEq}
          />
        </Grid> */}
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
        {/* <Grid item xs={12}>
          <FeedbackSlider
            label={"Stroke Thickness (%)"}
            {...getProps("Lines: Stroke%ofMax")}
            // icon={RotateRightIcon}
          />
        </Grid> */}

        {/* <Grid item xs={12}>
          <FeedbackButtonToggle
            option1="Waves"
            option2="Lines"
            {...getProps("Waves: Lines/Waves")}
          />
          <p />
        </Grid> */}
        {/* <Grid item xs={12}>
          <FeedbackSlider
            label={"Max Amplitude (1-10)"}
            {...getProps("Waves: Max Amplitude")}
            icon={AmplitudeIcon} //replace - look for sound related amplitude
            disabled={getValue("Waves: Lines/Waves") ? false : true}
          />
        </Grid> */}
        {/* <Grid item xs={12}>
          <FeedbackSlider
            label={"Random Wave Seed"}
            {...getProps("Waves: Seed")}
            // icon={BlankIcon} //replace - look for sound related amplitude
            disabled={getValue("Waves: Lines/Waves") ? false : true}
          />
        </Grid> */}

        {/* <Grid item xs={12}>
          <FeedbackButtonToggle
            option1="Show Waves"
            option2="Hide"
            {...getProps("Waves: Curves-Hide/Show")}
            disabled={getValue("Waves: Lines/Waves") ? false : true}
          />
          <p />
        </Grid> */}
        {/* <Grid item xs={12}>
          <FeedbackButtonToggle
            option1="Show Drivers"
            option2="Hide"
            {...getProps("Waves: Drivers-Hide/Show")}
            disabled={getValue("Waves: Lines/Waves") ? false : true}
          />
          <p />
        </Grid> */}

        <Grid item xs={12}>
          {/* xs={6} md={12} lg={6}> */}
          <FeedbackButtonToggle
            option1="Edit Mode"
            option2="Preview Mode"
            value={editOn}
            handleToggle={() => {
              toggleEditMode();
            }}
          />
          <p />
        </Grid>
        {/* <Grid item xs={12}>
          <FeedbackButtonToggle
            option1="Edit Mode"
            option2="Preview Mode"
            {...getProps("Waves: EditModeOn")}
            disabled={getValue("Waves: Lines/Waves") ? false : true}
          />
          <p /> 
        </Grid> */}
        <Grid item xs={12}>
          {/* xs={6} md={12} lg={6}> */}
          <Button
            variant="contained"
            onClick={resetPoints}
            color="primary"
            // disabled={getValue("Waves: EditModeOn") ? false : true}
          >
            Reset to Lines
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
