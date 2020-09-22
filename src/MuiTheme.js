import { createMuiTheme } from "@material-ui/core/styles";
// import purple from "@material-ui/core/colors/purple";
// import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";
import grey from "@material-ui/core/colors/grey";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#f82400",
    },
    secondary: {
      main: grey[500],
    },
  },
  typography: {
    fontFamily: [
      "aktiv-grotesk",
      "Aktiv Grotesk",
      "Helvetica Neue",
      "Helvetica",
      // Helvetica,
      // Arial,
      // sans - serif,
    ],
  },
});

export default theme;
