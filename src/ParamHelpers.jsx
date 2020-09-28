import React from "react";

// is it possible to break these functions out and then call them in ShapeDiverLoad.js?
// Don't know what else needs to be added as inputs
// None of this is currently in use 09/27/20

export const updateParam = useCallback((value, id, type) => {
  // const { id, value, type } = evt.target;
  //where does "prev" come from?  How does it get populated with the correct data?
  setParams((prev) =>
    type === "file" ? { ...prev, [id]: value.name } : { ...prev, [id]: value }
  );
  // trying to add history.  Don't know how yet.
  // recordHistory(id, value);
  // console.log(`history: `, history);

  if (sdApi && sdApi.current) {
    sdApi.current.parameters.updateAsync({ id, value }).then(function (result) {
      sdApi.current.scene.camera.zoomAsync();
    });
    //This is where logging goes.  also add log of errors/failed calls to api
    //Also add log entry in updatePoints()
    console.log("id, value, type: ", id, value, type);
  }
}, []);

export const updateParamNoSD = useCallback((value, id, type) => {
  setParams((prev) =>
    type === "file" ? { ...prev, [id]: value.name } : { ...prev, [id]: value }
  );
}, []);

//trying to replace/improve getters for nested components

export const getParamName = (paramDefs, paramId) => {
  try {
    var name = paramDefs.find((p) => p.id === paramId).name;
  } catch (err) {
    alert(err, `paramId ${paramId} not found`);
  }
  return name;
};

export const getParamID = (paramDefs, paramName) => {
  try {
    var id = paramDefs.find((p) => p.name === paramName).id;
  } catch (err) {
    alert(err, `paramName ${paramName} not found`);
  }
  return id;
};

export const getParamValue = (params, paramId) => {
  try {
    var value = params.paramId;
  } catch (err) {
    alert(err, `paramId ${paramId} not found in params`);
  }
  return value;
};
