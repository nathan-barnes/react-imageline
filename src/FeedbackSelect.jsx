import React from "react";

export default function FeedbackSelect(props) {
  const type = "select";
  const { name, children, defVal } = props;
  //   console.log("children: ", children);
  const {
    //    value,
    pId,
    setValue,
  } = props;

  const onChange = (event) => {
    // console.log("event: ", event.target.value);
    // console.log("material: ", children[event.target.value].key);
    setValue(event.target.value, pId, type);
  };

  return (
    <div>
      <label htmlFor="menu">{name} </label>
      {/* Bug: Default value is not loading */}
      <select id="menu" onChange={onChange} defaultValue={defVal}>
        {children}
      </select>
    </div>
  );
}
