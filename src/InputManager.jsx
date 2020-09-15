import React from "react";
import { useState, useCallback } from "react";
import {
  //   Button,
  Grid,
  Paper,
  Typography,
  Card,
  CardHeader,
  //   CardMedia,
  CardContent,
  // Select,
} from "@material-ui/core";

// import FeedbackButton from "./FeedbackButton";
import FeedbackSlider from "./FeedbackSlider";

import FeedbackButtonToggle from "./FeedbackButtonToggle";
import { WidthIcon, HeightIcon, AmplitudeIcon } from "./DimIcons";
import ControlledAccordions from "./ControlledAccordions";

import Waves from "@material-ui/icons/Waves";
import GraphicEq from "@material-ui/icons/GraphicEq";
import RotateRightIcon from "@material-ui/icons/RotateRight";

import { makeStyles } from "@material-ui/styles";
import { useEffect } from "react";

import paramData from "./ImageLinesParams";
import FeedbackImageUpload from "./FeedbackImageUpload";
import FeedbackSelect from "./FeedbackSelect";
//replace this with call to SDApi when adding volatile data

// import theme from "./MuiTheme";

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

//goal: identify params that UI asks for (by name)
// all of these have to be in an array together
// each is broken apart and only gets displayed if the param exists in the incoming array (or some default behavior takes over)
// does each type of param get broken out as a component?  if they are particular but reusable, then maybe.

export default function InputManager(props) {
  const classes = useStyles();

  const [bool1, setBool1] = useState(true);

  // for use with FeedbackButton
  //   const handleChange2 = (event) => {
  //     setInput1(input1 + 1);
  //   };
  const [params, setParams] = useState({});
  const [paramIds, setParamIds] = useState({});

  //then collect params and set to current

  //   These are the names of params in the SD app that will be used in the UI
  const paramNames = [
    "Scope Width",
    "Scope Height",
    "InvertSampling",
    "IsStretched",
    "MATERIAL",
    "ImageInput",
    "LINES/WAVES",
    "LINES/WAVES PER FT",
    "PERF PER FT OF LINES/WAVES",
    "ROTATE LINES/WAVES",
    "WAVE CURVES-HIDE/SHOW",
    "WAVE DRIVERS-HIDE/SHOW",
    "WAVES: MAX AMPLITUDE",
    "WAVES: SEED",
    "Num.Stroke%ofMax",
  ];

  //Then search for the names in the array from Shapediver, and return an array of objects with and name and id. this will remain static
  //reduce the array from SD? from names? names with a filter for that name that returns the name and id
  // or does this violate DRY?  If there's any mismatch, there should be check, but perhaps generating this list is superfluous?

  //   function getId(name) {
  //     return paramIds[name];
  //   }

  useEffect(() => {
    // This is probably where the SDApi gets called to generate the param list, maybe also to initialize the viewer (?)

    // Generate a list of ids paired with values, this is what actually gets updated
    const idValuePairs = paramData
      .filter((p) => paramNames.includes(p.name))
      .reduce((vals, p) => ({ ...vals, [p.id]: p.value }), {});
    // console.log("idValuePairs", idValuePairs);
    //set paired id's and values to params
    setParams(idValuePairs);

    const paramIdPaired = paramData
      .filter((p) => paramNames.includes(p.name))
      .reduce((vals, p) => ({ ...vals, [p.name]: p.id }), {});
    // console.log("paramIdPaired: ", paramIdPaired);
    setParamIds(paramIdPaired);
  }, []);

  // maintain Line/Curve text as state of a variable that is calculated once, instead of the repeated call to the array to get the value?
  useEffect(() => {});

  // Generate a list of the params themselves for reference? or don't, since they can still be referenced by id, might violate DRY principle
  // Change this so it only updates if the values change - useCallback?

  // How do i make a generic function which updates a variable?  That is how the one that benj made works, with "Update Param".
  // That one gathers all the params and does an update on all of them, along with the specific one.
  // Then, somehow, that list of params gets updated as the current values.
  const updateParams = useCallback((value, paramId, type) => {
    // console.log(
    //   `you want to set param id ${paramId} of type ${type} to ${value}`
    // );
    if (type === "file") {
      //When implementing with SD, the file needs to be passed, not the name
      console.log(value, "\n", value.name);
      setParams((prev) => ({ ...prev, [paramId]: value.name }));
    } else setParams((prev) => ({ ...prev, [paramId]: value }));
    // console.log("params after update: ", params);

    // call a single function that updates the single param in an array of params
    // call to SD update
    // goal: make a dummy SD update function
    // goal: display SD params array in the dummy viewer to show that it has updated in sibling (viewer)
  });

  //problem(?) - this is called every time the component renders.  Should only be called once to initialize, not get triggered on each update.
  const getProps = (paramName) => {
    // for a given name, return a generic list of props for that component:

    const thisParamData = paramData.filter((p) => p.name === paramName)[0];
    // if (thisParamData) console.log("found: ", thisParamData);

    let defaultParams = {
      setValue: updateParams,
      pId: paramIds[paramName],
      value: params[paramIds[paramName]],
      defVal: thisParamData.defVal,
    };
    if (["Odd", "Even", "Int", "Float"].includes(thisParamData.type)) {
      const step =
        thisParamData.type === "Int"
          ? 1
          : thisParamData.type === "Even " || thisParamData.type === "Odd"
          ? 2
          : 1 / Math.pow(10, thisParamData.decimalplaces);

      defaultParams = {
        ...defaultParams,
        min: thisParamData.min,
        max: thisParamData.max,
        step: step,
      };
      //   console.log("range defaults: ", defaultParams);
      // }

      //   // } else if (thisParamData.type === "checkbox") {
      //   //   if (thisParamData.value) {
      //   // defaultParams.checked = thisParamData.value;
      //   //   }
    } else if (thisParamData.type === "StringList") {
      defaultParams.children = thisParamData.choices.map((choice, idx) => (
        <option key={choice} value={idx}>
          {choice}
        </option>
      ));
    }
    // //if range, add other values from default props.

    return defaultParams;
  };

  const accordionGroupTest = [
    {
      heading: "Image",
      subHeading:
        (params[paramIds["ImageInput"]] || "Upload an Image") +
        ` / ${params[paramIds["InvertSampling"]] ? "Inverted" : "Original"} / ${
          params[paramIds["IsStretched"]] ? "Stretched" : "Cropped"
        }`,
      children: (
        <div>
          {/* goal: add image selector for this area, maybe something with a slideshow of thumbnails to select from 
          image needs to be checked for size (less than ?? check Shapediver docs)
          need to figure out how/where to store the image.  What happens to it once selected? Is it assigned to a variable?
          */}
          <FeedbackImageUpload {...getProps("ImageInput")} />
          <p />
          <FeedbackButtonToggle //Replace with Checkbox
            option1="Invert"
            option2="Original"
            {...getProps("InvertSampling")}
          />
          <p />
          <FeedbackButtonToggle
            option1="Stretch"
            option2="Crop"
            {...getProps("IsStretched")}
          />
        </div>
      ),
    },

    {
      heading: "Lines",
      subHeading:
        params[paramIds["LINES/WAVES PER FT"]] +
        (params[paramIds["LINES/WAVES"]] ? " Line" : " Wave") +
        "s/ft, " +
        params[paramIds["PERF PER FT OF LINES/WAVES"]] +
        " Max Perf/ft @ " +
        params[paramIds["ROTATE LINES/WAVES"]] +
        " deg",
      children: (
        <div>
          {/* Goal: change so init values come from paramData
            maybe: generate a inputProps param that is generic, then add it to the list of unique params */}

          <FeedbackSlider
            label={
              (params[paramIds["LINES/WAVES"]] ? " Line" : " Wave") + "s/ft"
            }
            icon={Waves}
            {...getProps("LINES/WAVES PER FT")}
          />
          <p />
          <FeedbackSlider
            label={"Max Perf/ft"}
            {...getProps("PERF PER FT OF LINES/WAVES")}
            icon={GraphicEq}
          />
          <p />
          <FeedbackSlider
            label={"Rotation (degrees)"}
            {...getProps("ROTATE LINES/WAVES")}
            icon={RotateRightIcon}
          />
          <p />
          {/* Add line thickness slider 
          "Num.Stroke%ofMax"*/}
          <FeedbackSlider
            label={"Stroke Thickness"}
            {...getProps("Num.Stroke%ofMax")}
            // icon={RotateRightIcon}
          />
          <p />
          <FeedbackButtonToggle
            option1="Lines"
            option2="Waves"
            {...getProps("LINES/WAVES")}
          />
          <p />
          <FeedbackSlider
            label={"Max Amplitude (1-10)"}
            {...getProps("WAVES: MAX AMPLITUDE")}
            icon={AmplitudeIcon} //replace - look for sound related amplitude
            disabled={params[paramIds["LINES/WAVES"]] ? true : false}
          />
          <p />
          <FeedbackSlider
            label={"Random Wave Seed"}
            {...getProps("WAVES: SEED")}
            // icon={BlankIcon} //replace - look for sound related amplitude
            disabled={params[paramIds["LINES/WAVES"]] ? true : false}
          />
        </div>
      ),
    },
    {
      heading: "Scope",
      subHeading:
        params[paramIds["Scope Width"]] +
        `' X ` +
        params[paramIds["Scope Height"]] +
        `' ` +
        (bool1 ? "Wall" : "Ceiling"),
      children: (
        <div>
          <FeedbackSlider
            // key="Width"
            label="Width"
            {...getProps("Scope Width")}
            icon={WidthIcon}
          />
          <p />
          <FeedbackSlider
            // key="Height"
            label="Height"
            {...getProps("Scope Height")}
            icon={HeightIcon}
          />
          <p />
          {/* NOT IMPLEMENTED */}
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
      subHeading:
        // "Pick Material and Finish" +
        paramData.filter((p) => p.name === "MATERIAL")[0].choices[
          params[paramIds["MATERIAL"]]
        ],
      children: (
        <div>
          {/* <label htmlFor="materials">Select Material </label>
          <select id="materials" {...getProps("MATERIAL")}></select>
          <p /> */}
          <FeedbackSelect
            name="Select Material and Finish"
            {...getProps("MATERIAL")}
          />
        </div>
      ),
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
        <Grid
          container
          spacing={0}
          direction="row-reverse"
          alignContent="center"
        >
          {/* The grid values need tweaking!!! */}
          <Grid item sm={false} md={1} />
          <Grid item xs={12} sm={10} md={7}>
            {/* viewer container */}
            <Card color="secondary">
              <CardHeader title="This is where the viewer goes"></CardHeader>
              {/* <CardMedia
                className={classes.media}
                component="img"
                height="220"
                image="../src/LWC_ScreenCap.png" //this isn't working and I don't know how to fix it
                title="Standin for Viewer"
              /> */}
              <CardContent>
                {/* <Typography> */}
                {/* feedback params here to check that updates are happening */}
                {Object.keys(paramIds).map((param, idx) => (
                  <p key={idx}>
                    {idx}: {param} = {params[paramIds[param]].toString()}
                  </p>
                ))}
                {/* </Typography> */}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={10} md={3}>
            <Paper color="secondary" variant="outlined">
              <Typography gutterBottom align="center">
                {/* goal: replace with image for branding or just Zahner logo */}
                Zahner: ImageLines
              </Typography>
              <ControlledAccordions accordionGroups={accordionGroupTest} />
            </Paper>
          </Grid>
          <Grid item sm={false} md={1} />
        </Grid>
      </div>
    </div>
  );
}
