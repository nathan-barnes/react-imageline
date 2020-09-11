import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { CardHeader, IconButton, Avatar, CardMedia } from "@material-ui/core";
import ShareOutlined from "@material-ui/icons/ShareOutlined";

// const useStyles = makeStyles({
//   //   root: {
//   //     minWidth: 200,
//   //   },
//   bullet: {
//     display: "inline-block",
//     margin: "0 2px",
//     transform: "scale(0.8)",
//   },
//   title: {
//     fontSize: 14,
//   },
//   pos: {
//     marginBottom: 12,
//   },
// });

const CoffeeCard = (props) => {
  //   const classes = useStyles();
  //   const bull = <span className={classes.bullet}>•</span>;
  const { avatarUrl, title, price, description, imageUrl } = props;

  return (
    <Card>
      <CardContent>
        <CardHeader
          avatar={<Avatar src={avatarUrl} />}
          action={
            <IconButton aria-label="settings">
              <ShareOutlined />
            </IconButton>
          }
          title={title}
          subheader={price}
        />
        <CardMedia style={{ height: "220px" }} image={imageUrl} />
        {/* If height of CardMedia is not set, image will not display.  Should be done through useStyles ideally */}
        <Typography variant="body2" component="p">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">BUY NOW</Button>
        <Button size="small">OFFER</Button>
      </CardActions>
    </Card>
  );
};

export default CoffeeCard;
