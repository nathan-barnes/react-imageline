import React from "react";
import FeedbackImageUpload from "../FeedbackImageUpload";
import FeedbackButtonToggle from "../FeedbackButtonToggle";

export default function ImageMenu(props) {
  const { getProps } = props;

  return (
    <div>
      <FeedbackImageUpload {...getProps("Image: Input")} />
      <p />
      <FeedbackButtonToggle //Replace with Checkbox
        option1="Invert"
        option2="Original"
        {...getProps("Image: Invert Sampling")}
      />
      <p />
      <FeedbackButtonToggle
        option1="Stretch"
        option2="Crop"
        {...getProps("Image: Crop/Stretch")}
      />
    </div>
  );
}
