import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Input from "@material-ui/core/Input";
import { SvgIcon } from "@material-ui/core";

const useStyles = makeStyles({
  // This is probably why the RWD isn't working - it overrides the RWD behavior (?)
  root: {
    width: 250,
    // flexBasis: "75%",
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
  // const defValue = props.defValue || min;
  const TheIcon = props.icon || BlankIcon;
  const disabled = props.disabled || false;

  const classes = useStyles();

  //this is difference between Feedback version and regular version.
  // const [value, setValue] = React.useState(defValue);
  const { value, setValue } = props;
  const type = "range";

  const handleSliderChange = (event, newValue) => {
    setValue(newValue, pId, type);
  };

  const handleInputChange = (event) => {
    setValue(
      event.target.value === "" ? "" : Number(event.target.value),
      pId,
      type
    );
  };

  const handleBlur = () => {
    if (value < min) {
      setValue(min, pId, type);
    } else if (value > max) {
      setValue(max, pId, type);
    }
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
            value={typeof value === "number" ? value : 0}
            // defaultValue={defValue}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            disabled={disabled}
          />
        </Grid>
        <Grid item>
          <Input
            className={classes.input}
            value={value || ""}
            margin="dense"
            onChange={handleInputChange}
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
