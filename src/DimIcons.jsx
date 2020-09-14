import React from "react";
import { SvgIcon } from "@material-ui/core";

/* from https://materialdesignicons.com/
 */

export function WidthIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M9,11H15V8L19,12L15,16V13H9V16L5,12L9,8V11M2,20V4H4V20H2M20,20V4H22V20H20Z" />
    </SvgIcon>
  );
}

export function HeightIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M13,9V15H16L12,19L8,15H11V9H8L12,5L16,9H13M4,2H20V4H4V2M4,20H20V22H4V20Z" />
    </SvgIcon>
  );
}

export function BlankIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="" />
    </SvgIcon>
  );
}

export function AmplitudeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M 0,12 C 0,12 5,32 12,12 18.75,-8.75 24,12 24,12" />
    </SvgIcon>
  );
}
