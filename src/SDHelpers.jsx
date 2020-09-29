// import React from "react";

export function getPaths(sdApi, filters) {
  if (sdApi) {
    const paths = sdApi.scene
      .get(null, "CommPlugin_1")
      .data.filter(
        (p) =>
          filters.includes(p.name.split("_")[0]) && p.hasOwnProperty("bbmin")
      )
      .map((q) => q.scenePath);
    // console.log(`paths for ${JSON.stringify(filters)}: ${paths}`);
    return paths;
  }
  return null;
}

export function getCenterPivot(sdApi, assetName) {
  if (sdApi.current) {
    const centerAsset = sdApi.current.scene
      .get(null, "CommPlugin_1")
      .data.filter((p) => p.name === assetName && p.hasOwnProperty("bbmin"))[0];

    const pivot = {
      x: (centerAsset.bbmin[0] + centerAsset.bbmax[0]) / 2,
      y: (centerAsset.bbmin[1] + centerAsset.bbmax[1]) / 2,
      z: (centerAsset.bbmin[2] + centerAsset.bbmax[2]) / 2,
    };
    return pivot;
  }
  return null;
}

// goal: change dynamic data storage to array of type "ParameterUpdateObject":
// https://viewer.shapediver.com/v2/2.10.1/doc/module-ApiInterfaceV2-ApiParameterInterface.html#updateAsync

/**
 *
 * @param {*} paramData ParamData Array from ShapeDiver or Static data set.
 * returns Array of params in format: [{id, name, value}, ...]
 * but needs to return all in a single object...
 * also should filter hidden (?)
 */
export function getParamObjs(paramData) {
  var paramObjs = [];

  for (let entry of paramData) {
    // console.log(`entry: ${JSON.stringify(entry)}`);
    let paramObject = {
      id: entry.id,
      name: entry.name,
      value: entry.value,
    };
    paramObjs.push(paramObject);
  }
  // console.log(`JSON.stringify(paramObjs): ${JSON.stringify(paramObjs)}`);
  return paramObjs;
}
