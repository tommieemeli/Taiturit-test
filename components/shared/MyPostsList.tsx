import { IPost } from "@/lib/database/dbmodels/post.model";
import { Grid } from "@mui/material";
import React from "react";

interface ComponentProps {
  posts: IPost[];
}

type Props = ComponentProps;

const MyPostsList = (props: Props) => {
  const { posts } = props;
  return (
    <Grid container>
      {posts.length > 0 &&
        posts.map((post) => {
          return (
            <Grid key={post._id}>
              <p>{}</p>
            </Grid>
          );
        })}
    </Grid>
  );
};

export default MyPostsList;
