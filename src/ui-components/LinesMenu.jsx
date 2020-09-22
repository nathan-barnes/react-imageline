import React from "react";
import { Grid } from "@material-ui/core";

import FeedbackButtonToggle from "../FeedbackButtonToggle";
import FeedbackSlider from "../FeedbackSlider";

import Waves from "@material-ui/icons/Waves";
// import GraphicEq from "@material-ui/icons/GraphicEq";
import RotateRightIcon from "@material-ui/icons/RotateRight";

import { AmplitudeIcon } from "../DimIcons";

export default function LinesMenu(props) {
  const { getProps, getValue } = props;
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
          />
        </Grid>
        {/* <Grid item xs={12}>
          <FeedbackSlider
            label={"Stroke Thickness (%)"}
            {...getProps("Lines: Stroke%ofMax")}
            // icon={RotateRightIcon}
          />
        </Grid> */}
        <Grid item xs={12}>
          <FeedbackButtonToggle
            option1="Waves"
            option2="Lines"
            {...getProps("Waves: Lines/Waves")}
          />
          <p />
        </Grid>
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
        <Grid item xs={12}>
          <FeedbackButtonToggle
            option1="Show Waves"
            option2="Hide"
            {...getProps("Waves: Curves-Hide/Show")}
            disabled={getValue("Waves: Lines/Waves") ? false : true}
          />
          <p />
        </Grid>
        <Grid item xs={12}>
          <FeedbackButtonToggle
            option1="Show Drivers"
            option2="Hide"
            {...getProps("Waves: Drivers-Hide/Show")}
            disabled={getValue("Waves: Lines/Waves") ? false : true}
          />
        </Grid>
      </Grid>
    </div>
  );
}
