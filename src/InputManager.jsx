import React from "react";
import {
  useState,
  useEffect,
  // useCallback
} from "react";

import {
  //   Button,
  // Grid,
  Paper,
  Typography,
  // Card,
  // CardHeader,
  // CardMedia,
  // CardContent,
  // Select,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import ZahnerLogo from "./ZahnerLogo";

import ControlledAccordions from "./ControlledAccordions";

import ImageMenu from "./ui-components/ImageMenu";
import LinesMenu from "./ui-components/LinesMenu";
import ScopeMenu from "./ui-components/ScopeMenu";
// import MaterialMenu from "./ui-components/MaterialMenu";
import PerfMenu from "./ui-components/PerfMenu";
import TestMenu from "./ui-components/TestMenu";

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
  controls: {
    height: 200,
    maxHeight: 800,

    // minHeight: 800,
  },
}));

//goal: identify params that UI asks for (by name)
// all of these have to be in an array together
// each is broken apart and only gets displayed if the param exists in the incoming array (or some default behavior takes over)
// does each type of param get broken out as a component?  if they are particular but reusable, then maybe.

export default function InputManager(props) {
  const classes = useStyles();

  const [bool1, setBool1] = useState(true);

  const [paramIds, setParamIds] = useState({}); //replace with useRef()?

  // Adding SD link:
  const {
    params,
    paramData,
    updateParams,
    updateParamNoSD,
    resetPoints,
    sdApi,
  } = props;

  // console.log(
  //   `From parent: \nparams: ${params}\n\nparamData: ${paramData}\n\nupdateParams: ${updateParams}`
  // );

  //then collect params and set to current

  //   These are the names of params in the SD app that will be used in the UI
  // const paramNames = [
  //   "Scope Width",
  //   "Scope Height",
  //   "Bool.InvertSampling",
  //   "Bool.IsStretched",
  //   "MATERIAL",
  //   "ImageInput",
  //   "LINES/WAVES",
  //   "LINES/WAVES PER FT",
  //   "PERF PER FT OF LINES/WAVES",
  //   "ROTATE LINES/WAVES",
  //   "WAVE CURVES-HIDE/SHOW",
  //   "WAVE DRIVERS-HIDE/SHOW",
  //   "WAVES: MAX AMPLITUDE",
  //   "WAVES: SEED",
  //   "Num.Stroke%ofMax",
  // ];

  // revised: Script version 0.4.54
  const paramNames = [
    "Waves: Lines/Waves",
    "Scope: Width",
    "Scope: Height",
    "Image: Invert Sampling",
    "Lines: Perf per Ft of Line",
    "Image: Input",
    "Lines: Stroke%ofMax",
    "Lines: Per Ft",
    "Lines: Rotation",
    "Image: Crop/Stretch",
    "Waves: Max Amplitude",
    "Waves: Seed",
    "Image: Invert Color",
    "Reveal/2",
    "Panel: Portrait/Landscape",
    "Waves: Curves-Hide/Show",
    "Waves: Drivers-Hide/Show",
    "Person: Show/Hide",
    "EmailHistoryFile",
    "EmailFileType",
    "EmailFileName",
    "EmailAddress",
    "EmailSubject",
    "EmailBody",
    "Waves: EditModeOn",
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
    // const idValuePairs = paramData
    //   .filter((p) => paramNames.includes(p.name))
    //   .reduce((vals, p) => ({ ...vals, [p.id]: p.value }), {});
    // // console.log("idValuePairs", idValuePairs);
    // //set paired id's and values to params
    // setParams(idValuePairs);

    const paramIdPaired = paramData
      .filter((p) => paramNames.includes(p.name))
      .reduce((vals, p) => ({ ...vals, [p.name]: p.id }), {});
    // console.log("paramIdPaired: ", paramIdPaired);
    setParamIds(paramIdPaired);
  }, []);

  //problem(?) - this is called every time the component renders.  Should only be called once to initialize, not get triggered on each update.
  const getProps = (paramName) => {
    // for a given name, return a generic list of props for that component:

    const thisParamData = paramData
      ? paramData.filter((p) => p.name === paramName)[0]
      : [];
    if (!thisParamData)
      // console.log("found: ", thisParamData);
      // else
      throw new console.error(`param: ${paramName} not found`);

    let defaultParams = {
      setValue: updateParams,
      setDragValue: updateParamNoSD,
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

  const getValue = (paramName) => params[paramIds[paramName]];

  const accordionGroups = [
    {
      heading: "Image",
      subHeading:
        (params[paramIds["Image: Input"]] || "Upload an Image") +
        ` / ${
          params[paramIds["Image: Invert Sampling"]] ? "Inverted" : "Original"
        } / ${
          params[paramIds["Image: Crop/Stretch"]] ? "Stretched" : "Cropped"
        }`,
      children: <ImageMenu getProps={getProps} />,
    },

    {
      heading: "Lines",
      subHeading:
        params[paramIds["Lines: Per Ft"]] +
        (params[paramIds["Waves: Lines/Waves"]] ? " Wave" : " Line") +
        "s/ft, @ " +
        params[paramIds["Lines: Rotation"]] +
        " deg",
      children: (
        <LinesMenu
          getProps={getProps}
          getValue={getValue}
          resetPoints={resetPoints}
        />
      ),
    },
    {
      heading: "Perforations",
      subHeading:
        params[paramIds["Lines: Perf per Ft of Line"]] +
        " Max Perforations/ft @ " +
        params[paramIds["Lines: Stroke%ofMax"]] +
        "% Stroke",
      children: <PerfMenu getProps={getProps} getValue={getValue} />,
      disabled: params[paramIds["Waves: EditModeOn"]],
    },

    {
      heading: "Scope",
      subHeading:
        params[paramIds["Scope: Width"]] +
        `' X ` +
        params[paramIds["Scope: Height"]] +
        `' `,
      //  +
      // (bool1 ? "Wall" : "Ceiling"),
      children: (
        <ScopeMenu
          getProps={getProps}
          getValue={getValue}
          setBool1={setBool1}
          bool1={bool1}
        />
      ),
    },
    {
      heading: "Test",
      subHeading: "Test Features",
      children: <TestMenu {...props} params={params} />,
    },
    // {
    //   heading: "Material",
    //   subHeading:
    //     // "Pick Material and Finish" +
    //     paramData.filter((p) => p.name === "MATERIAL")[0].choices[
    //       params[paramIds["MATERIAL"]]
    //     ],
    //   children: <MaterialMenu getProps={getProps} getValue={getValue} />,
    // },
    // goal: Add two different methods of selection from list: with swatches of different materials/colors, and using dropdown method
  ];

  return (
    <div>
      <div>
        {/* <Grid
          container
          spacing={0}
          direction="row-reverse"
          alignContent="center"
        > */}
        {/* The grid values need tweaking!!! */}

        {/* <Card>
          <CardContent> 
          <Typography> */}
        {/* feedback params here to check that updates are happening */}
        {/* {Object.keys(paramIds).map((param, idx) => (
                  <p key={idx}>
                    {idx}: {param} = {params[paramIds[param]].toString()}
                  </p>
                ))}
          </Typography>
          </CardContent>
            </Card> */}

        {/* <Grid
            item
            xs={12}
            //  sm={10} md={3}
          > 
            <div> */}
        <Paper
          color="secondary"
          variant="outlined"
          className={classes.controls}
        >
          <p />
          <Typography gutterBottom align="center">
            <a href={"http://azahner.com"}>
              <ZahnerLogo />
            </a>{" "}
            <strong>{"  ImageLines"}</strong>
          </Typography>
          <ControlledAccordions accordionGroups={accordionGroups} />
        </Paper>
        {/* </div>
          </Grid>
        </Grid> */}
      </div>
    </div>
  );
}
