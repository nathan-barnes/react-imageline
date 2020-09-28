import React from "react";
import { ButtonGroup, Button } from "@material-ui/core";
// import { makeStyles } from "@material-ui/styles";

// const useStyles = makeStyles(() => ({
//   root: {
//     flexGrow: 5,
//     flexBasis: 250,
//   },
// }));

export default function FeedbackButtonToggle(props) {
  // const classes = useStyles();

  const type = "bool";
  const { option1, option2, pId, disabled } = props;

  const { value, setValue } = props;
  const disable = disabled || false;

  const name1 = option1 || "One";
  const name2 = option2 || "Two";
  //initialize with option 1 active, option2 disactivated

  const handleToggle = props.handleToggle
    ? props.handleToggle
    : () => {
        setValue(!value, pId, type);
      };

  return (
    <ButtonGroup
      variant="contained"
      // className="root"
    >
      <Button
        id="One"
        onClick={!value ? handleToggle : () => {}}
        color={value ? "primary" : "secondary"}
        disabled={disable}
      >
        {name1}
      </Button>
      <Button
        id="Two"
        onClick={value ? handleToggle : () => {}}
        color={!value ? "primary" : "secondary"}
        disabled={disable}
      >
        {name2}
      </Button>
    </ButtonGroup>
  );
}
