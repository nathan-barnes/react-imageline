import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles({
  root: {
    width: 200,
  },
});

export default function ContinuousSlider(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(30);

  //   const name = props.name ? props.name : "default";
  const { min, max, defVal, name } = props;

  console.log(name);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Typography id="continuous-slider" align="left" display="inline">
        {name} - {value} ft
      </Typography>

      <Slider
        value={value}
        valueLabelDisplay="on"
        defaultValue={defVal}
        type=""
        // min={min}
        max={max}
        onChange={handleChange}
        aria-labelledby="continuous-slider"
      />
    </div>
  );
}
