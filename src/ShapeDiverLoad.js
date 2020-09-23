import React, { useCallback, useRef, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import asyncLogParams from './logging-components/firebaseRealtime';

// import ParamControl from "./ParamControl.js";
// import "./ShapeDiverContainer.css";
import {
  Grid,
  Paper,
  Card,
  // CardContent,
  // Box,
  // Typography,
} from "@material-ui/core";
import InputManager from "./InputManager";
// import ExportControl from "./ExportControl.jsx";
// import staticParamData from "./ImageLinesParams";
import staticParamData from "./ImageLinesParams0454.json";

// goal: Change name to reflect that it loads window only? Change so it only loads the API and calls something separate to load the window?
// goal: Is it possible to load the API without loading a window?  Probably, almost certainly.
// goal: reference an outside component that controls a custom param control.  If that is declared, then a custom control panel will be created. If not, a generic one will be created.

const useStyles = makeStyles((theme) => ({
  ShapediverContainer: {
    margin: "3em",
    display: "flex",

    // margin-right: 3em,
    // margin-left: 3em,
    // display: flex,
  },
}));

export default function ShapeDiverLoad(props) {
  const classes = useStyles();

  const containerSD = useRef();
  const sdApi = useRef();
  const [paramDefs, setParamDefs] = useState({});
  const [params, setParams] = useState({});
  // const [exports, setExports] = useState({});

  //Trying to add history.  Don't know how yet
  const [history, recordHistory] = useState([]);

  // const recordHistory = (record) => {
  //   history.push(record);
  // };

  const { liveLink } = props || true;

  useEffect(() => {
    if (!liveLink) {
      //for static version of params for work on UI
      const staticParams = staticParamData
        .filter((p) => (p.hidden = "false"))
        .reduce((vals, p) => ({ ...vals, [p.id]: p.value }), {});
      // // console.log("idValuePairs", idValuePairs);
      // //set paired id's and values to params
      setParams(staticParams);
      setParamDefs(staticParamData);
    } else {
      // container for the viewer

      let _container = containerSD.current;

      // ShapeDiver Viewer constructor settings
      // Refer to https://app.shapediver.com/api for details
      let settings = {
        container: _container,
        showSceneMode: 1, // do not show the scene automatically
      };

      // construct an instance of the viewer
      const api = (sdApi.current = new window.SDVApp.ParametricViewer(
        settings
      ));

      async function loadApi() {
        // register a ShapeDiver CommPlugin
        await api.plugins.registerCommPluginAsync({
          // ticket of the model as shown on app.shapediver.com
          ticket: props.ticket,

          // URL of the ShapeDiver backend system used
          modelViewUrl: "eu-central-1",

          brandedMode: false,
          deferGeometryLoading: false,
          showZoomButton: true,
          showFullscreenButton: false,
          showInitialSpinner: false,

          runtimeId: "CommPlugin_1",
          busyGraphic:
            // replace with Zahner logo
            "https://pbs.twimg.com/profile_images/864982129104625667/awrS6KR1_400x400.jpg",
        });

        console.log("ShapeDiver CommPlugin successfully loaded");

        api.scene.addEventListener(
          api.scene.EVENTTYPE.VISIBILITY_ON,
          async () => {
            const parameters = await api.parameters.get().data;
            // console.log("Parameters: ", JSON.stringify(parameters));
            const currentParams = parameters
              .filter((p) => !p.hidden)
              .reduce((vals, def) => ({ ...vals, [def.id]: def.value }), {});
            //From the list of all params, filter down to only ones that are not hidden
            //From filtered list, reduce to array of id:value pairs

            // console.log("currentParams: ", JSON.stringify(currentParams));

            // is there a problem having 2 await statements in an async call? is it necessary?
            const currentExports = await api.exports.get().data;

            setParamDefs(parameters);
            setParams(currentParams);
            // setExports(currentExports);
            recordHistory({ parameters });
          }
        );

        // refresh (load geometry), because the initial parameter update might not have changed any values
        await api.plugins.refreshPluginAsync("CommPlugin_1");

        const sceneSettings = {
          scene: {
            show: true,
            gridVisibility: false,
            groundPlaneVisibility: true,
          },
        };

        await api.updateSettingsAsync(sceneSettings);
      }
      loadApi();
    }
  }, []); //Empty Array here means this function will run once and will not update.

  const updateParam = useCallback((value, id, type) => {
    // const { id, value, type } = evt.target;
    //where does "prev" come from?  How does it get populated with the correct data?
    setParams((prev) =>
      type === "file" ? { ...prev, [id]: value.name } : { ...prev, [id]: value }
    );
    //trying to add history.  Don't know how yet.
    // recordHistory((prev) => {
    //   prev.push(params);
    // });
    // console.log("History: ", history);

    if (sdApi && sdApi.current) {
      sdApi.current.parameters.updateAsync({ id, value }).then(asyncLogParams( id, value));
      console.log("id, value, type: ", id, value, type);
    }
  }, []);

  const updateParamNoSD = useCallback((value, id, type) => {
    // const { id, value, type } = evt.target;

    //where does "prev" come from?  How does it get populated with the correct data?
    setParams((prev) =>
      type === "file" ? { ...prev, [id]: value.name } : { ...prev, [id]: value }
    );
    // if (sdApi) {
    //   sdApi.current.parameters.updateAsync({ id, value });
    // }
  }, []);

  /*
  This is meant to trigger on export events.  
  */
  // const exportRequest = useCallback((evt) => {
  //   const { name, type } = evt.target;
  //   //type is maintained here to eventually handle different types of export: direct download and email.
  //   console.log("sdApi: ", sdApi);
  //   console.log("sdApi.current.exports: ", sdApi.current.exports);
  //   // const exportName = name;

  //   if (sdApi) {
  //     sdApi.current.exports
  //       .requestAsync({ name: name })
  //       .catch(function (err) {
  //         return Promise.reject(err);
  //       })
  //       .then(function (response) {
  //         let link = response.data.content[0].href;
  //         window.location = link;
  //       });
  //   }
  // }, []);

  const canRenderParams = paramDefs && Object.keys(params).length;
  // console.log("Can it render?", canRenderParams);

  return (
    <div>
      <Grid
        container
        spacing={1}
        direction="row-reverse"
        alignContent="center"
        style={{ padding: 10 }}
      >
        <Grid item xs={12} md={8}>
          {/* <!-- ShapeDiver Viewer Main Container --> */}
          {liveLink ? (
            <Paper
              color="secondary"
              variant="outlined"
              style={{
                width: "100%",
                height: "100%",
                minHeight: 600,
                maxHeight: 800,
                flexShrink: 3,
              }}
            >
              <div
                // className={classes.ShapediverContainer}
                id="sdv-container"
                ref={containerSD}
                style={{
                  position: "inherit",
                  top: "5%",
                  bottom: "5%",
                  height: "99%",
                  width: "90",
                  right: "5%",
                  left: "5%",
                  // flex: 1,
                }}
              />
            </Paper>
          ) : (
            <Card>
              <Paper
                color="secondary"
                variant="outlined"
                style={{
                  width: "100%",
                  height: "100%",
                  minHeight: 600,
                  maxHeight: 800,
                  flexShrink: 3,
                }}
              ></Paper>
            </Card>
          )}
        </Grid>
        <Grid item xs={12} md={4}>
          <div id="controls">
            {canRenderParams ? (
              <InputManager
                updateParams={updateParam}
                updateParamNoSD={updateParamNoSD}
                // exportRequest={exportRequest}
                paramData={paramDefs}
                params={params}
                // exports={exports}
              />
            ) : (
              <div />
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
