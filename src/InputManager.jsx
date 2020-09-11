import React from "react";
import { useState } from "react";
import {
  Button,
  Slider,
  Grid,
  Paper,
  Typography,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
} from "@material-ui/core";
// import InputSlider from "./InputSlider";
// import FeedbackButton from "./FeedbackButton";
import FeedbackSlider from "./FeedbackSlider";
// import Delete from "@material-ui/icons/Delete";
import FeedbackButtonToggle from "./FeedbackButtonToggle";
import { WidthIcon, HeightIcon } from "./DimIcons";
import ControlledAccordions from "./ControlledAccordions";
// import FormatLineSpacing from "@material-ui/icons/FormatLineSpacing";
import Waves from "@material-ui/icons/Waves";
import GraphicEq from "@material-ui/icons/GraphicEq";
import { makeStyles } from "@material-ui/styles";

//This component holds input values and is parent to a viewer that reports the values as well as a control panel that allows the values to be changed
//Is this component custom built for each app?  It may make sense, at least at the beginning, until patterns & templates are established

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
}));

export default function InputManager(props) {
  const classes = useStyles();
  const [input1, setInput1] = useState(5);
  const [input2, setInput2] = useState(8);
  const [bool1, setBool1] = useState(true);
  const [input3, setInput3] = useState(6);
  const [input4, setInput4] = useState(12);
  const [bool2, setBool2] = useState(false);
  const [bool3, setBool3] = useState(false);

  // for use with FeedbackButton
  //   const handleChange2 = (event) => {
  //     setInput1(input1 + 1);
  //   };

  // How do i make a generic function which updates a variable?  That is how the one that benj made works, with "Update Param".
  // That one gathers all the params and does an update on all of them, along with the specific one.
  // Then, somehow, that list of params gets updated as the current values.

  const accordionGroupTest = [
    {
      heading: "Image",
      subHeading: "filename and/or preview",
      children: (
        <div>
          This is where the image interface goes
          {/* need a image selector for this area, maybe something with a slideshow of thumbnails to select from 
          image needs to be checked for size (less than ?? check Shapediver docs)
          need to figure out how/where to store the image.  What happens to it once selected? Is it assigned to a variable?
          */}
          <p />
          <input
            accept="image/*"
            className={classes.input}
            style={{ display: "none" }}
            id="raised-button-file"
            multiple
            type="file"
          />
          <label htmlFor="raised-button-file">
            <Button
              variant="contained"
              component="span"
              className={classes.button}
            >
              Upload Image
            </Button>
          </label>
          <p />
          <FeedbackButtonToggle //Replace with Checkbox
            option1="Invert"
            option2="No Invert"
            setValue={setBool2}
            value={bool2}
          />
          <p />
          <FeedbackButtonToggle //Replace with Checkbox
            option1="Crop"
            option2="Stretch"
            setValue={setBool3}
            value={bool3}
          />
        </div>
      ),
    },

    {
      heading: "Lines",
      subHeading: input3 + " Lines/ft, " + input4 + " max perf/ft of Line",
      children: (
        <div>
          <FeedbackSlider
            label="Lines per ft"
            min={4}
            max={10}
            defValue={6}
            value={input3}
            setValue={setInput3}
            icon={Waves}
          />
          <p />
          <FeedbackSlider
            label="Max Perf per ft of Line"
            min={6}
            max={20}
            defValue={12}
            value={input4}
            setValue={setInput4}
            icon={GraphicEq}
          />
        </div>
      ),
    },
    {
      heading: "Scope",
      subHeading:
        input1 + `' X ` + input2 + `' ` + (bool1 ? "Wall" : "Ceiling"),
      children: (
        <div>
          <FeedbackSlider
            // key="Width"
            label="Width"
            min={2}
            max={20}
            defValue={input1}
            value={input1}
            setValue={setInput1}
            icon={WidthIcon}
          />
          <p />
          <FeedbackSlider
            // key="Height"
            label="Height"
            min={6}
            max={10}
            defValue={input2}
            value={input2}
            setValue={setInput2}
            icon={HeightIcon}
          />
          <p />
          <FeedbackButtonToggle
            option1="Wall"
            option2="Ceiling"
            setValue={setBool1}
            value={bool1}
          />
        </div>
      ),
    },
    {
      heading: "Material",
      subHeading: "Pick Material and Finish",
      children: <div>Material Selection here</div>,
    },
    // goal: Add two different methods of selection from list: with swatches of different materials/colors, and using dropdown method
  ];

  return (
    <div>
      {/* <h1>This is the input report</h1>
      <h2>input1: {input1}</h2>
      <h2>input2: {input2}</h2>
      <h2>bool1: {bool1.toString()}</h2>
      <hr />
      <h2>This is where the inputs go</h2> */}
      <div>
        <Grid container spacing={1} direction="row-reverse">
          <Grid item xs={false} sm={1} />
          <Grid item xs={12} sm={7}>
            {/* viewer container */}
            <Card color="secondary">
              <CardHeader title="This is where the viewer goes"></CardHeader>
              <CardMedia
                className={classes.media}
                component="img"
                height="220"
                image="../src/LWC_ScreenCap.png" //this isn't working and I don't know how to fix it
                title="Standin for Viewer"
              />
            </Card>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Paper color="secondary" variant="outlined">
              <Typography gutterBottom align="center">
                Zahner: ImageLines
              </Typography>
              <ControlledAccordions accordionGroups={accordionGroupTest} />
            </Paper>
          </Grid>
          <Grid item xs={false} sm={1} />
        </Grid>
      </div>
    </div>
  );
}
