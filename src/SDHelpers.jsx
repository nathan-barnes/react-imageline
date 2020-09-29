import React from "react";

export function getPaths(sdApi, filters) {
  if (sdApi) {
    const paths = sdApi.scene
      .get(null, "CommPlugin_1")
      .data.filter(
        (p) =>
          filters.includes(p.name.split("_")[0]) && p.hasOwnProperty("bbmin")
      )
      .map((q) => q.scenePath);
    console.log(`paths for ${JSON.stringify(filters)}: ${paths}`);
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
