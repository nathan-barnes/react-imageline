import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Input from "@material-ui/core/Input";
import { SvgIcon } from "@material-ui/core";

const useStyles = makeStyles({
  // This is probably why the RWD isn't working - it overrides the RWD behavior (?)
  root: {
    minWidth: 200,
    // flexBasis: "75%",
    // flexGrow: 5,
    // flexBasis: 100,
  },
  input: {
    width: 50,
  },
});

//use blank icon as default
function BlankIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="" />
    </SvgIcon>
  );
}

/**
 *
 * @param {min, max, step, value, setValue} props
 * goal: add default icon or blank
 */
export default function FeedbackSlider(props) {
  const { label, pId } = props;
  const min = props.min || 0;
  const max = props.max || min + 10;
  const step = props.step || 1;
  const defValue = props.defVal === 0 ? 0 : props.defVal || min;
  const TheIcon = props.icon || BlankIcon;
  const disabled = props.disabled || false;

  const classes = useStyles();

  //this is difference between Feedback version and regular version.
  // const [value, setValue] = React.useState(defValue);
  const { value, setValue, setDragValue } = props;
  const type = "range";
  const [localVal, setLocalVal] = useState(defValue);

  const handleSliderDrag = props.handleSliderDrag
    ? props.handleSliderDrag
    : (event, newValue) => {
        setDragValue(newValue, pId, type);
        setLocalVal(newValue);
      };

  const handleSliderChange = (event, newValue) => {
    setValue(newValue, pId, type);
    setLocalVal(newValue);
  };

  const sendUpdate = (newVal) => {
    let nextVal = newVal === "" ? 0 : Number(newVal);
    if (nextVal < min) nextVal = min;
    else if (nextVal > max) nextVal = max;
    setValue(Number(nextVal), pId, type);
    setLocalVal(Number(nextVal));
  };

  const handleBlur = (event) => {
    let nextVal = event.target.value === "" ? 0 : Number(event.target.value);
    sendUpdate(nextVal);
  };

  const handleKeyPress = (event) => {
    // console.log(`event.key: ${event.key}`);
    if (event.key === "Enter") sendUpdate(localVal);
  };

  const handleInputChange = (event) => {
    setLocalVal(event.target.value);
  };

  return (
    <div className={classes.root}>
      <Typography id="input-slider" gutterBottom align="left" variant="caption">
        {label}
      </Typography>
      <Grid container spacing={2}>
        <Grid item>
          <TheIcon />
        </Grid>
        <Grid item xs>
          <Slider
            step={step}
            min={min}
            max={max}
            value={value || 0}
            onChange={handleSliderDrag}
            onChangeCommitted={handleSliderChange}
            aria-labelledby="input-slider"
            disabled={disabled}
          />
        </Grid>
        <Grid item>
          <Input
            className={classes.input}
            value={localVal}
            margin="dense"
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            onBlur={handleBlur}
            inputProps={{
              step: step,
              min: min,
              max: max,
              type: "number",
              "aria-labelledby": "input-slider",
              disabled: disabled,
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}
