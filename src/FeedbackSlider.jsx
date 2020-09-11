import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Input from "@material-ui/core/Input";
import VolumeUp from "@material-ui/icons/VolumeUp";

const useStyles = makeStyles({
  root: {
    width: 250,
  },
  input: {
    width: 42,
  },
});

/**
 *
 * @param {min, max, step, value, setValue} props
 * goal: add default icon or blank
 */
export default function FeedbackSlider(props) {
  const { label } = props;
  const min = props.min || 0;
  const max = props.max || min + 10;
  const step = props.step || 1;
  const defValue = props.defValue || min;
  const TheIcon = props.icon || VolumeUp;

  const classes = useStyles();

  //this is difference between Feedback version and regular version.
  // const [value, setValue] = React.useState(defValue);
  const { value, setValue } = props;

  // This doesn't work b/c React Hooks cannot be called conditionally
  // const [value, setValue] =
  //   props.value && props.setValue
  //     ? [props.value, props.setValue]
  //     : React.useState(defValue);

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
      <Typography id="input-slider" gutterBottom align="left" variant="caption">
        {label}
      </Typography>
      <Grid container spacing={2} xs>
        <Grid item>
          <TheIcon />
        </Grid>
        <Grid item xs>
          <Slider
            step={step}
            min={min}
            max={max}
            value={typeof value === "number" ? value : 0}
            // defaultValue={defValue}
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
              // defaultValue: defValue,
              type: "number",
              "aria-labelledby": "input-slider",
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}
