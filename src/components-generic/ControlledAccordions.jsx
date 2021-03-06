import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import { ListSubheader } from "@material-ui/core";

//ToDo: Change subHeader to the settings of the nested values -
// the contents should be composed to return a string as well as an array of the components inside

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(25) + " !important",
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15) + " !important",
    color: theme.palette.text.secondary,
    flexBasis: "66.6%",
    flexShrink: 4,
    // alignContent: "center",
  },
}));

export default function ControlledAccordions(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState("panel0"); //Change this to set the open panel when the app loads.

  const handleChange = (panel, editMode) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    props.toggleEditMode(isExpanded ? editMode : true);
  };
  const { accordionGroups } = props;

  const assembleGroups = (accordionGroups) => {
    let accordionArray = [];
    let i = 0;

    for (const group of accordionGroups) {
      //goal: change to a map function?
      accordionArray.push(
        <Accordion
          expanded={expanded === "panel" + i}
          onChange={ handleChange("panel" + i, group.editMode)}
          key={"accordion" + i}
          disabled={group.disabled || false}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon color="primary" />}
            aria-controls={"panel" + i + "bh-content"}
            id={"panel" + 1 + "bh-header"}
            // id necessary to differentiate instances of the component
          >
            <Typography className={classes.heading}>{group.heading}</Typography>
            <Typography className={classes.secondaryHeading} align="right">
              {group.subHeading}
              {/* Change so subHeading is composed of settings of children - pass down through this component? Use Context? */}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>{group.children}</AccordionDetails>
        </Accordion>
      );
      i++;
    }

    return accordionArray;
  };

  return <div className={classes.root}>{assembleGroups(accordionGroups)}</div>;
}
