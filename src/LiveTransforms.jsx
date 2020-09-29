// Test live transformations of scene objects for potential use in ui feedback
import React, { useState } from "react";
import { Button } from "@material-ui/core";

/**
 *
 * @param {*} sdApi ShapeDiverApi
 * @param {*} paths ScenePath to objects
 * @param {*} rotationDegree CW
 * @param {*} pivot Axis pivot using yAxis
 */
export function liveTransform(sdApi, paths, rotationDegree, pivot) {
  // need to get start angle of rotation and current angle, and then apply the transformation using the difference
  // need to set axis of rotation at the bounding box center of one of the main pieces of geometry, in the y direction

  const result = sdApi.current.scene.setLiveTransformation([
    {
      scenePaths: paths,
      transformations: [
        {
          delay: 0,
          duration: 500,
          type: "rotation",
          rotationAxis: { x: 0, y: 1, z: 0 },
          rotationDegree: rotationDegree || 0,
          pivot: pivot || { x: 0, y: 0, z: 0 }, //this should be the center of the bounding box
          easing: "Quartic.InOut",
        },
      ],
      reset: false,
    },
  ]);
  // console.log(`result: ${JSON.stringify(result)}`);
}

export function TestLiveTransform(props) {
  //   const { sdApi, paths } = props;
  // const paths = props.paths;
  // console.log(`JSON.stringify(paths): ${JSON.stringify(paths)}`);
  const onClick = () => {
    liveTransform(props);
  };
  return <Button onClick={onClick}>Apply Live Transform</Button>;
}

export function TestLiveTransformSlider(props) {
  const [value, setValue] = useState(0);

  const onChange = (evt) => {
    // console.log(`evt.target.value:`, evt.target.value);
    setValue(evt.target.value);
    // console.log(
    //   `evt.target.value-value =`,
    //   evt.target.value,
    //   "-",
    //   value,
    //   "=",
    //   evt.target.value - value
    // );
    const rotationDegree = evt.target.value - value;
    // console.log(`rotationDegree: ${rotationDegree}`);
    try {
      liveTransform({ ...props, rotationDegree });
    } catch (err) {
      console.log(err);
    }
  };
  return <input type="range" step={10} value={value} onChange={onChange} />;
}
