import { IPost } from "@/lib/database/dbmodels/post.model";
import {
  Card,
  CardHeader,
  Avatar,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  Grid,
} from "@mui/material";
import { red } from "@mui/material/colors";
import moment from "moment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import React from "react";

interface ComponentProps {
  posts: IPost[];
}

type Props = ComponentProps;

const PostCards = (props: Props) => {
  const { posts } = props;
  return (
    <Grid container style={{ marginTop: 20 }} spacing={5}>
      {posts.map((post) => {
        return (
          <Grid item key={post._id} xs={12} md={5} lg={4}>
            <Card>
              <CardHeader
                avatar={
                  // TODO: Need users avatar down here
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    R
                  </Avatar>
                }
                title={post.name}
                subheader={moment(post?.createdAt).format("DD/MM/YYYY")}
              />
              <CardMedia
                component="img"
                height="194"
                image="/static/images/cards/paella.jpg" // TODO: fix this image
                alt=""
              />
              <CardContent>
                <Typography variant="body1">
                  <b>{post.jobTitle ?? "Sovelluskehittäjä"}</b>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {post.jobDescription}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <b>Hinta alkaen: </b>
                  <b>{"50€"}</b>
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default PostCards;
