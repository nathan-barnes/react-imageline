import React from "react";
import { Tooltip, IconButton } from "@material-ui/core";
import CasinoIcon from "@material-ui/icons/Casino";

// Get a random/dice icon
// Will need to flex if number of points becomes variable.  For now, use static 4/4

export function rollDice() {
  // for length of points, gen a point val for x to add/subtract from the default
  var pts = [
    [0, 0, 0],
    [0, 0.333333, 0],
    [0, 0.666667, 0],
    [0, 1, 0],
    [0, 0, 0],
    [0, 0.333333, 0],
    [0, 0.666667, 0],
    [0, 1, 0],
  ];

  var minL = 1, minR = 1;
  for (let i = 0; i < pts.length; i++) {
    const rand = Math.random() / 2;
if (i<4){
  pts[i][0] += rand;
  minL = rand < minL ? rand : minL;
}
else {
  pts[i][0] += -rand;
  minR = rand<minR? rand: minR;
}
  }
  for (let i = 0; i< pts.length; i++){
    pts[i][0] += i < 4 ? -minL: minR;
  }
  return pts;
}

export function DiceRoll(props) {
  return (
    <Tooltip title="Randomize" arrow>
      <IconButton onClick={props.onClick} variant="contained">
        <CasinoIcon />
      </IconButton>
    </Tooltip>
  );
}
