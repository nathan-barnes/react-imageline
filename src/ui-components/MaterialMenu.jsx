import React from "react";
import FeedbackSelect from "../FeedbackSelect";

export default function MaterialMenu(props) {
  const {
    getProps,
    // getValue
  } = props;

  return (
    <div>
      <FeedbackSelect
        name="Select Material and Finish"
        {...getProps("MATERIAL")}
      />
    </div>
  );
}
