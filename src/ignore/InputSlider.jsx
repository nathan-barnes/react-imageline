import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Input from "@material-ui/core/Input";
//import VolumeUp from "@material-ui/icons/VolumeUp";

const useStyles = makeStyles({
  root: {
    width: 250,
  },
  input: {
    width: 42,
  },
});

export default function InputSlider(props) {
  const { label } = props;
  const min = props.min || 0;
  const max = props.max || min + 10;
  const step = props.step || 1;
  const defValue = props.defValue || min;

  // console.log(
  //   "Label: ",
  //   label,
  //   "min: ",
  //   min,
  //   "max: ",
  //   max,
  //   "step: ",
  //   step,
  //   "defValue: ",
  //   defValue
  // );

  const classes = useStyles();
  const [value, setValue] = React.useState(defValue);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < min) {
      setValue(min);
    } else if (value > max) {
      setValue(max);
    }
  };

  return (
    <div className={classes.root}>
      <Typography id="input-slider" gutterBottom align="left">
        {label}
      </Typography>
      <Grid container spacing={2} alignItems="center">
        {/* <Grid item>
          <VolumeUp />
        </Grid> */}
        <Grid item xs>
          <Slider
            step={step}
            min={min}
            max={max}
            value={typeof value === "number" ? value : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid item>
          <Input
            className={classes.input}
            value={value}
            margin="dense"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: step,
              min: min,
              max: max,
              type: "number",
              "aria-labelledby": "input-slider",
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}
