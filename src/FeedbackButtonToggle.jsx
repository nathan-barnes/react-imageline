import React from "react";
import { ButtonGroup, Button } from "@material-ui/core";

export default function FeedbackButtonToggle(props) {
  const { option1, option2 } = props;

  //   const [value, setValue] = React.useState(true);
  const { value, setValue } = props;

  const name1 = option1 || "One";
  const name2 = option2 || "Two";
  //initialize with option 1 active, option2 disactivated

  const handleToggle = (event) => {
    setValue(!value);
  };

  return (
    <ButtonGroup variant="contained">
      <Button
        id="One"
        onClick={!value ? handleToggle : () => {}}
        color={value ? "primary" : "secondary"}
      >
        {name1}
      </Button>
      <Button
        id="Two"
        onClick={value ? handleToggle : () => {}}
        color={!value ? "primary" : "secondary"}
      >
        {name2}
      </Button>
    </ButtonGroup>
  );
}
