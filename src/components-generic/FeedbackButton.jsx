import React from "react";
import { Button } from "@material-ui/core";

export default function FeedbackButton(props) {
  const { onClick, clicks } = props;

  return (
    <Button variant="contained" onClick={onClick}>
      {clicks}
    </Button>
  );
}
