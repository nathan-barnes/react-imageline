import React from "react";
import FeedbackImageUpload from "../components-generic/FeedbackImageUpload";
import FeedbackButtonToggle from "../components-generic/FeedbackButtonToggle";

export default function ImageMenu(props) {
  const { getProps } = props;

  return (
    <div>
      <FeedbackImageUpload {...getProps("Image: Input")} />
      <p />
      <FeedbackButtonToggle
        option1="Stretch"
        option2="Crop"
        {...getProps("Image: Crop/Stretch")}
      />
      <p />
      <FeedbackButtonToggle //Replace with Checkbox
        option1="Invert Sampling"
        option2="Original"
        {...getProps("Image: Invert Sampling")}
      />
      <p />
      <FeedbackButtonToggle //Replace with Checkbox
        option1="Invert Color"
        option2="Original"
        {...getProps("Image: Invert Color")}
      />
    </div>
  );
}
