import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Button } from "@material-ui/core";

// const useStyles = makeStyles((theme) => ({
//   button: {
//     //add button properties
//     // width: 100,
//     color: theme.primary
//   },
//   input: {
//     //flex: 5,
//     //any properties?  this doesn't show.
//   },
// }));

export default function FeedbackImageUpload(props) {
  // const classes = useStyles();
  const type = "file";
  const {
    // value,
    pId,
    setValue,
  } = props;

  function onChange(event) {
    //get vars for updateParam function
    let file = event.target.files[0];
    if (file) {
      //goal: manage file types to match param formats
      if (file.size > 10485760) {
        //get the max from the param[max]?
        alert("filesize exceeds max");
      } else {
        console.log(file, pId, type);
        setValue(file, pId, type);
      }
    }

    //Call update Param
    //   updateParam(value, pId, type);
  }

  return (
    <div>
      <input
        accept="image/*"
        // className={classes.input}
        style={{ display: "none" }}
        id="raised-button-file"
        multiple={false}
        type="file"
        onChange={onChange}
        pid={pId}
        // value={value || ""}
        //need to get this to use same updateParam function to update the value of the filename in the params
      />

      <label htmlFor="raised-button-file">
        <Button
          variant="contained"
          component="span"
          color="primary"
          // className={classes.button}
        >
          Upload Image
        </Button>
      </label>
    </div>
  );
}
