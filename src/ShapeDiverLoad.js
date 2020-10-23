import React, { useCallback, useRef, useEffect, useState } from "react";
// import { makeStyles } from "@material-ui/styles";
import asyncLogParams from "./components-logging/firebaseRealtime";

// import "./ShapeDiverContainer.css";
import {
  Grid,
  Paper,
  Card,
  // Typography,
  CircularProgress,
  LinearProgress,
  responsiveFontSizes,
} from "@material-ui/core";
import InputManager from "./InputManager";
// import ExportControl from "./ExportControl.jsx";

import staticParamData from "./static/ImageLinesParams111.json";
import {
  undoAction,
  getApiValues,
  redoAction,
  UndoButton,
  RedoButton,
} from "./components-special/UndoRedo";
import { TogglePerson } from "./components-special/TogglePerson";
import ScreenCapButton from "./components-special/ScreenCapButton";
import { getPaths } from "./SDHelpers";
import { ZoomExtents } from "./components-special/ZoomExtents";

// goal: Is it possible to load the API without loading a window?  Yes, using Backend api
// goal: reference an outside component that controls a custom param control.  If that is declared, then a custom control panel will be created. If not, a generic one will be created.

// const useStyles = makeStyles((theme) => ({
//   ShapediverContainer: {
//     margin: "3em",
//     display: "flex",

//     // margin-right: 3em,
//     // margin-left: 3em,
//     // display: flex,
//   },
// }));

export default function ShapeDiverLoad(props) {
  // const classes = useStyles();

  const containerSD = useRef();
  const sdApi = useRef();
  const [paramDefs, setParamDefs] = useState({});
  const [params, setParams] = useState({});
  const [pIdNameList, setPIdNameList] = useState({});

  const [editPaths, setEditPaths] = useState([]);
  const [previewPaths, setPreviewPaths] = useState([]);

  const [editOn, setEditOn] = useState(true);
  const [personState, setPersonState] = useState(true);

  const [busyState, setBusyState] = useState(false);
  const [progress, setProgress] = useState(0);

  const [sdData, setSdData] = useState({});

  const [timedOut, setTimedOut] = useState(false);

  //Adding Selectable Points:
  const sphereRefs = useRef([]);
  const sphPoints = useRef([]);

  const hoverEffect = {
    active: {
      name: "colorHighlight",
      options: {
        color: [100, 100, 100],
      },
    },
  };

  const sphereGroup = {
    id: "spheres",
    draggable: true,
    dragEffect: hoverEffect,
    hoverable: true,
    hoverEffect: hoverEffect,
  };

  const { liveLink } = props || true; //Controls whether SD is initialized or uses set of static variables

  useEffect(() => {
    if (!liveLink) {
      //for static version of params for work on UI
      const staticParams = staticParamData
        .filter((p) => (p.hidden = "false"))
        .reduce((vals, p) => ({ ...vals, [p.id]: p.value }), {});
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
          // ticket of the model as shown on app.shapediver.com - input in app.js
          ticket: props.ticket,

          // URL of the ShapeDiver backend system used
          modelViewUrl: "eu-central-1",

          deferGeometryLoading: false,

          runtimeId: "CommPlugin_1",

          // all following settings only work with iframe.  need to implement for api version
          // brandedMode: false,
          // showZoomButton: true,
          // showFullscreenButton: false,
          // showInitialSpinner: false,
          // busyGraphic:
          //   // replace with Zahner logo
          //   "https://pbs.twimg.com/profile_images/864982129104625667/awrS6KR1_400x400.jpg",
        });

        // console.log("ShapeDiver CommPlugin successfully loaded");

        api.scene.addEventListener(
          api.scene.EVENTTYPE.VISIBILITY_ON,
          async () => {
            const parameters = await api.parameters.get().data;
            // console.log("Parameters: ", JSON.stringify(parameters));
            const currentParams = parameters
              .filter((p) => !p.hidden)
              .reduce((vals, def) => ({ ...vals, [def.id]: def.value }), {});

            const pIdNamePairs = parameters
              .filter((p) => !p.hidden)
              .reduce((vals, def) => ({ ...vals, [def.id]: def.name }), {});

            //From the list of all params, filter down to only ones that are not hidden
            //From filtered list, reduce to array of id:value pairs

            // console.log("currentParams: ", JSON.stringify(currentParams));
            // console.log(`init parameters: `, JSON.stringify(parameters));

            // is there a problem having 2 await statements in an async call? is it necessary?
            // const currentExports = await api.exports.get().data;

            setParamDefs(parameters);
            setParams(currentParams);
            setPIdNameList(pIdNamePairs);
            setSdData(api.scene.getData().data[0]);

            sphPoints.current = JSON.parse(
              api.parameters.get({ name: "Points" }).data[0].value
            )["points"];
            // setExports(currentExports);
          }
        );

        // refresh (load geometry), because the initial parameter update might not have changed any values
        await api.plugins.refreshPluginAsync("CommPlugin_1");

        const sceneSettings = {
          blurSceneWhenBusy: false,
          scene: {
            show: true,
            gridVisibility: false,
            groundPlaneVisibility: true,
            camera: {
              zoomExtentsFactor: 1, // Factor to apply to the bounding box before zooming to extents
              autoAdjust: false, // disable that the camera adjusts to geometry updates
              controls: {
                orbit: {
                  restrictions: {
                    //limits camera movement in 3D scene
                    rotation: {
                      minPolarAngle: -90,
                      maxPolarAngle: 90,
                      minAzimuthAngle: -90,
                      maxAzimuthAngle: 90,
                    },
                  },
                },
              },
            },
          },
        };

        await api.updateSettingsAsync(sceneSettings);

        // This section all about api display of geometry.  Goal is to show/hide edit mode using api instead of param call to gh
        // paths cannot be collected unless geometry is in show state.

        const editGeoPaths = getPaths(api, [
          "Sphere",
          "Tweens",
          "GuideCrvs",
          "ImageDisplay",
        ]);
        setEditPaths(editGeoPaths);

        const hideNow = getPaths(api, ["GroundPlane"]);

        // asyncLogParams("viewerInit", 1);
        asyncLogParams("ticket", props.ticket);

        // console.log(
        //   `JSON.stringify(editPaths.current): ${JSON.stringify(
        //     editPaths.current
        //   )}`
        // );
        // console.log(
        //   `JSON.stringify(editGeoPaths): ${JSON.stringify(
        //     editGeoPaths
        //   )}, ${editGeoPaths}`
        // );

        // setDriverPaths(getPaths(api, ["Sphere", "Tweens", "GuideCrvs"]));

        const previewGeoPaths = getPaths(api, ["Person", "PatternGeo"]);
        setPreviewPaths(previewGeoPaths);

        // console.log(
        //   `JSON.stringify(previewGeoPaths): ${JSON.stringify(
        //     previewGeoPaths
        //   )}, ${previewGeoPaths}`
        // );

        api.scene.toggleGeometry(
          [...previewGeoPaths],
          [...editGeoPaths, ...hideNow]
        );
      }
      loadApi().then(() => {
        api.scene.updateInteractionGroups(sphereGroup);

        const assets = api.scene.get(null, "CommPlugin_1");
        const sphereAssets = assets.data.filter((a) => a.format !== "material");
        var updateObjects = [];
        for (let assetnum in sphereAssets) {
          let asset = sphereAssets[assetnum];
          // console.log(`asset: ${JSON.stringify(asset)}`);
          if (asset.name.includes("Sphere_")) {
            let updateObject = {
              id: asset.id,
              duration: 0,
              interactionGroup: sphereGroup.id,
              name: asset.name,
            };
            updateObjects.push(updateObject);
          }
        }
        sphereRefs.current = updateObjects;
        // sphereRefs.current.map((e) => console.log(JSON.stringify(e)));
        api.scene.updatePersistentAsync(updateObjects, "CommPlugin_1");
        api.scene.addEventListener(api.scene.EVENTTYPE.DRAG_END, dragCallback);
        // api.scene.addEventListener(api.scene.EVENTTYPE.SELECT_ON, addPoint);;
        // api.scene.camera.zoomAsync(previewPaths);
        api.state.addEventListener(api.state.EVENTTYPE.BUSY, busySpinner);
        api.state.addEventListener(api.state.EVENTTYPE.IDLE, busySpinner);
        api.state.addEventListener(api.state.EVENTTYPE.MESSAGE, (event) => {
          // console.log(`Message: ${JSON.stringify(event.message)}`);
          handleTimeOut();
        });
        // api.state.addEventListener(api.state.EVENTTYPE.FAILED, (event) => {
        //   console.log(`Message: ${JSON.stringify(event.message)}`);
        // });
        api.state.addEventListener(
          api.parameters.EVENTTYPE.VALUE_UPDATE,
          sdValueUpdate
        );
      });
    }
  }, []); //Empty Array here means this function will run once and will not update.

  // update Parameter functions

  const sdValueUpdate = () => {
    // try {
    const dataUpdate = sdApi.current.scene.getData().data[0];
    setSdData(dataUpdate);
    // } catch (err) {
    //   console.log("error: ", err);
    // }
  };

  const handleTimeOut = () => {
    // alert(
    //   "Operation timed out.  Please reduce size and/or complexity of design."
    // );
    asyncLogParams("TimeOut", 1).then(()=>{setTimedOut(true);});
    // undoAndSync();
  };

  const updateParam = (value, id, type) => {
    setParams((prev) =>
      type === "file" ? { ...prev, [id]: value.name } : { ...prev, [id]: value }
    );

    if (sdApi && sdApi.current) {
      sdApi.current.parameters
        .updateAsync({ id, value })
        .then(function (response) {
          // console.log("Promise result: ", JSON.stringify(response));
          if (response["data"]) {
            setTimedOut(false); 
            // updateViewState(true);
          }
          // else setTimedOut(true);
        })
        .then(asyncLogParams(pIdNameList[id], value));
      // .then(function (result) {
      updateViewState(true); //this could be used to target goemetry under different conditions - edit vs. preview geometry
      // can set new camera view as default by setting "default:true" in transition settings
      // });
      // This is where logging goes.  also add log of errors/failed calls to api
      // Also add log entry in updatePoints()
      // console.log("id, value, type: ", id, value, type);
      // console.log(`previewPaths: ${JSON.stringify(previewPaths)}`);
      // sdApi.current.scene.camera.zoomAsync(previewPaths);
    }
  };
  // , []);

  const updateParamNoSD = useCallback((value, id, type) => {
    setParams((prev) =>
      type === "file" ? { ...prev, [id]: value.name } : { ...prev, [id]: value }
    );
  }, []);

  //trying to replace/improve getters for nested components
  /*
  const getParamName = (paramId) => {
    try {
      var name = paramDefs.find((p) => p.id === paramId).name;
    } catch (err) {
      alert(err, `paramId ${paramId} not found`);
    } //add error handling, return error if caught
    return name;
  };

  const getParamID = (paramName) => {
    try {
      var id = paramDefs.find((p) => p.name === paramName).id;
    } catch (err) {
      alert(err, `paramName ${paramName} not found`);
    } //add error handling, return error if caught
    return id;
  };

  const getParamValue = (paramId) => {
    try {
      var value = params.paramId;
    } catch (err) {
      alert(err, `paramId ${paramId} not found in params`);
    } //add error handling, return error if caught
    return value;
  };
*/

  /*
  // This is meant to trigger on export events.  
  const exportRequest = useCallback((evt) => {
      const { name, type } = evt.target;
      //type is maintained here to eventually handle different types of export: direct download and email.
      console.log("sdApi: ", sdApi);
      console.log("sdApi.current.exports: ", sdApi.current.exports);
      // const exportName = name;
    
      if (sdApi) {
          sdApi.current.exports
            .requestAsync({ name: name })
            .catch(function (err) {
                return Promise.reject(err);
              })
              .then(function (response) {
                  let link = response.data.content[0].href;
                  window.location = link;
                });
            }
          }, []);
 */

  // More on selectable points:
  const dragCallback = (event) => {
    const sphereID = event.scenePath.split(".")[1];
    // console.log("sphereId: ", sphereID);

    const selectedSph = sphereRefs.current
      .find((ref) => ref.id === sphereID)
      .name.split("_")[1];

    const tFormName = selectedSph < 5 ? "TForm1" : "TForm2"; //assumes 4 points per curve - this may not always be true
    // console.log("tFormName ", tFormName);

    const tForm = getDataByName(tFormName);

    // console.log("tForm ", tForm);
    // console.log("tForm.type(): ", tForm.type());

    const newPos = event.dragPosAbs;
    // console.log("newPos: ", newPos);
    // console.log("newPos.type(): ", newPos.type());

    const tPos = applyTransform(newPos, tForm);

    let tempPts = sphPoints.current;
    // let tempPts = getDataByName("points");
    // console.log("tempPts: ", tempPts);

    tempPts.splice(selectedSph - 1, 1, [tPos.x, tPos.y, tPos.z]);
    // console.log("drag tempPts spliced: ", tempPts);

    updatePoints(tempPts, "move");
  };

  function updatePoints(pts,logName) {
    sphPoints.current = pts;
    const logType = logName ? "Points-" + logName: "Points"
    // console.log("pts to update: ", JSON.stringify(pts));
    sdApi.current.parameters
      .updateAsync({
        name: "Points",
        value: JSON.stringify({ points: pts }),
      })
      .then((response)=>{if (response["data"]) setTimedOut(false);})
      .then(asyncLogParams(logType, 1, JSON.stringify({ points: pts })));
    updateViewState(true);
    // .then(updateViewState(true));
  }

  /**
   * logic from  https://gamedev.stackexchange.com/questions/28249/calculate-new-vertex-position-given-a-transform-matrix
   * @param {*} point - point{x,y,z} to transform
   * @param {*} m - array[16] - 3d transform matrix
   */
  const applyTransform = (point, m) => {
    const { x, y, z } = point;
    const w = 1;
    const tX = m[0] * x + m[1] * y + m[2] * z + m[3] * w;
    const tY = m[4] * x + m[5] * y + m[6] * z + m[7] * w;
    const tZ = m[8] * x + m[9] * y + m[10] * z + m[11] * w;
    const tW = m[12] * x + m[13] * y + m[14] * z + m[15] * w;
    const pointTformed = { x: tX / tW, y: tY / tW, z: tZ / tW };

    return pointTformed;
  };

  const getDataByName = (dataName) => {
    // console.log(
    //   `dataname ${dataName}: sdApi.current.scene.getData(): ${JSON.stringify(
    //     sdApi.current.scene.getData()
    //   )} `
    // );
    const dataObj = sdApi.current.scene.getData().data[0];
    // console.log("data: ", JSON.stringify(dataObj.data[dataName]));
    // console.log(`dataObj.data[${dataName}]: `, dataObj.data[dataName]);
    if (dataObj) return dataObj.data[dataName];
    else {
      // console.log(
      //   `sdData.data[dataName]: ${JSON.stringify(sdData.data[dataName])}`
      // );
      return sdData.data[dataName];
    }
  };

  const resetPoints = () => {
    sphPoints.current = [
      [0, 0, 0],
      // [null], //this works - use nulls as placeholders if adding and removing points
      [0, 0.333333, 0],
      [0, 0.666667, 0],
      [0, 1, 0],
      [0, 0, 0],
      [0, 0.333333, 0],
      [0, 0.666667, 0],
      [0, 1, 0],
    ];
    updatePoints(sphPoints.current, "reset");
  };

  /* 
  // Note: may use this later to add points to curves on demand
  const addPoint = (event) => {
    const pickPoint = event.selectPos;
    console.log(`pickPoint: ${JSON.stringify(pickPoint)}`);
    var tempPts = getDataByName("points");

    console.log("points before  setting: ", tempPts);
    if (tempPts.length < 3) {
      tempPts.push([pickPoint.x, pickPoint.y, pickPoint.z]);
      console.log("tempPts after adding: ", tempPts);
      updatePoints(tempPts);
    }
    const tempInfo =
      tempPts.length === 1
        ? "Drag Existing Points to update position on the mesh"
        : tempPts.length === 3
        ? "Maximum number of points exceeded"
        : "Click on the mesh to pick a point on it...";

    setInfo(tempInfo);
  };
  */

  const undoAndSync = () => {
    if (undoAction(sdApi)) {
      const newParams = getApiValues(sdApi, params);
      setParams((prev) => ({ ...newParams }));
      asyncLogParams("Undo", -1);
      setTimedOut(false); //This isn't quite right - sometimes an undo won't fix a timeOut
    }
  };

  const redoAndSync = () => {
    if (redoAction(sdApi)) {
      const newParams = getApiValues(sdApi, params);
      setParams((prev) => ({ ...newParams }));
      asyncLogParams("Redo", 1);
    }
  };

  const toggleEditMode = (override) => {
    if(override != editOn) {
      setEditOn(override);
    // setEditOn(!editOn);
    // console.log(`editOn.toString(): ${editOn.toString()}`);
    // console.log(`previewPaths: ${previewPaths}`);
    // updateViewState();
    }
  };

  const updateViewOnChange = useEffect(()=>{updateViewState()},[editOn])

  const updateViewState = (reverse) => {
    //maybe useCallback and memo-ize?
    const previewPathsSelected = personState ? previewPaths : [previewPaths[1]];
    // console.log(`previewPaths: ${previewPaths}`);
    const toShow = editOn
      ? [previewPathsSelected, editPaths]
      : [editPaths, previewPathsSelected];
    // if (reverse) toShow.reverse();
    sdApi.current.scene.toggleGeometry(...toShow);
    sdApi.current.scene.camera.zoomAsync(toShow[0]);
    sdApi.current.updateSettingAsync(
      "scene.groundPlaneVisibility",
      editOn 
    );
  };

  const busySpinner = (event) => {
    const state = sdApi.current.state.get().data;
    // console.log(`JSON.stringify(state): ${JSON.stringify(state)}`);
    if (state.busy) {
      setBusyState(true);
      setProgress(state.progress);
    } else {
      setProgress(state.progress);
      setBusyState(false);
    }
  };

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
        <Grid item xs={12}>
          <LinearProgress
            variant="determinate"
            style={{
              height: 8,
            }}
            value={progress * 100}
            color={progress === 1 ? "secondary" : "primary"}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          {/* <!-- ShapeDiver Viewer Main Container --> */}
          {liveLink ? (
            <div
              style={{
                width: "100%",
                height: "100%",
                minHeight: 600,
                maxHeight: 800,
                flexShrink: 3,
                // position: "sticky",
              }}
            >
              <Paper
                color="secondary"
                variant="outlined"
                style={{
                  width: "100%",
                  height: "100%",
                  minHeight: 600,
                  maxHeight: 600,
                  flexShrink: 3,
                  // position: "sticky",
                }}
              >
                <div
                  // className={classes.ShapediverContainer}
                  id="sdv-container"
                  ref={containerSD}
                  style={{
                    position: "relative",
                    //sticky may allow it to stay at the top when scrolling
                    // top: "5%",
                    // bottom: "5%",
                    height: "99%",
                    width: "90",
                    // right: "5%",
                    // left: "5%",
                    // flex: 1,
                  }}
                />
                <div
                  style={{
                    position: "relative",
                    bottom: 50,
                    left: 25,
                    zIndex: 10,
                    marginBottom: "-65px",
                    justifyContent: "right",
                  }}
                >
                  <UndoButton undoAndSync={undoAndSync} timedOut={timedOut}/>
                  <RedoButton redoAndSync={redoAndSync} />{" "}
                  <TogglePerson
                    sdApi={sdApi}
                    personState={personState}
                    setPersonState={setPersonState}
                    editOn={editOn}
                    updateViewState={updateViewState}
                    asyncLogParams={asyncLogParams}
                  />
                  <ZoomExtents updateViewState={updateViewState} asyncLogParams={asyncLogParams} />
                  <ScreenCapButton sdApi={sdApi} />
                  <p />
                  {busyState ? (
                    <CircularProgress
                      variant="indeterminate"
                      size={20}
                      thickness={5}
                      value={progress * 100}
                      color={progress === 1 ? "secondary" : "primary"}
                    />
                  ) : (
                    <div />
                  )}
                </div>
              </Paper>
            </div>
          ) : (
            <Card>
              <div
                style={{ position: "relative", top: 50, left: 20, zIndex: 4 }}
              >
                <UndoButton undoAndSync={undoAndSync} timedOut={timedOut}/>
                <RedoButton redoAndSync={redoAndSync} />
                <TogglePerson
                  sdApi={sdApi}
                  personState={personState}
                  setPersonState={setPersonState}
                  editOn={editOn}
                  updateViewState={updateViewState}
                />
                <ScreenCapButton sdApi={sdApi} />
              </div>
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
              />

              {/* <Paper
                color="secondary"
                variant="outlined"
                style={{
                  position: "sticky",
                  width: "100%",
                  // minHeight: 600,
                  height: "100%",
                  // maxWidth: 600,
                  minWidth: 200,
                  minHeight: 200,
                  height: "100%",
                  margintop: "75%",
              />
                }} */}
            </Card>
          )}
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper style={{ height: 600 }} variant="outlined">
            <div id="controls">
              {canRenderParams ? (
                <InputManager
                  updateParams={updateParam}
                  updateParamNoSD={updateParamNoSD}
                  // exportRequest={exportRequest}
                  paramData={paramDefs}
                  params={params}
                  // exports={exports}
                  resetPoints={resetPoints}
                  updatePoints={updatePoints}
                  sdApi={sdApi}
                  toggleEditMode={toggleEditMode}
                  editOn={editOn}
                  getDataByName={getDataByName}
                  // paths={previewPaths}
                />
              ) : (
                <div />
              )}
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12}></Grid>
      </Grid>
    </div>
  );
}
