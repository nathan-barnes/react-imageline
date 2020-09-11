import React from "react";
import { Grid } from "@material-ui/core";

import CoffeeCard from "./CoffeeCard";
import coffeeMakerList from "./constants";

const Content = () => {
  const getCoffeeMakerCard = (coffeeMakerObj) => {
    // const {title, price, description, avatarUrl, imageUrl} = coffeeMakerObj;
    return (
      <Grid item xs={12} sm={4}>
        <CoffeeCard {...coffeeMakerObj} />
      </Grid>
    );
  };

  return (
    <Grid container spacing={2}>
      {/* spacing is a multiple of a variable set in the theme.  In this case, it is 8px per unit of spacing */}
      {coffeeMakerList.map((coffeeMakerObj) =>
        getCoffeeMakerCard(coffeeMakerObj)
      )}
    </Grid>
  );
};

export default Content;
