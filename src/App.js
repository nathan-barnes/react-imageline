import React from "react";
import InputManager from "./InputManager";
import data from "./ImageLinesParams.json";

// import Typography from "@material-ui/core/Typography";
// import Link from "@material-ui/core/Link";
// import Container from "@material-ui/core/Container";
// import Box from "@material-ui/core/Box";
// import ProTip from "./ProTip";
// import SignIn from "./SignIn";
// import BasicButtonGroup from "./BasicButtonGroup";
// import ContinuousSlider from "./ContinuousSlider";
// import Grid from "@material-ui/core/Grid";
// import Header from "./Header";
// import Content from "./Content";

// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {"Copyright © "}
//       <Link color="inherit" href="https://material-ui.com/">
//         Your Website
//       </Link>{" "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

// const App = () => {
//   return (
//     <Grid container direction="column">
//       <Grid item>
//         <Header />
//       </Grid>
//       <Grid item container>
//         <Grid item xs={false} sm={2} />
//         <Grid item xs={12} sm={8}>
//           <Content />
//         </Grid>
//         <Grid item xs={false} sm={2} />
//       </Grid>
//     </Grid>
//   );
// };
const App = () => {
  return (
    <div>
      <InputManager />
    </div>
  );
};

// const arr = JSON.parse(JSON.stringify(data));

// for (const element of arr) console.log(element);
console.log(data);

// console.log(typeof JSON.parse(JSON.stringify(data)));
// const arr = JSON.parse(data);

export default App;

//export default function App()
// {
//   return (
//     // <Container maxWidth="sm">
//     //   <Box my={4}>
//     //     <Typography variant="h4" component="h1" gutterBottom color="primary">
//     //       Create React App v4-beta example
//     //     </Typography>
//     //     <ProTip />
//     //     <Copyright />
//     //     <SignIn />
//     //     <BasicButtonGroup />
//     //     <BasicButtonGroup />
//     //     <ContinuousSlider />
//     //     <ContinuousSlider name="Height" min="10" max="20" defVal="15" />
//     //     <ContinuousSlider name="Width" />
//     //   </Box>
//     // </Container>
//     <Grid container direction="column" />
//   );
// }
