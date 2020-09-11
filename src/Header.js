import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
  typographyStyles: {
    flex: 1,
  },
}));

const Header = () => {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography className={classes.typographyStyles}>
          This is our Header
        </Typography>
        <AlternateEmailIcon />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
