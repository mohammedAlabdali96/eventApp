import React from 'react';
import { useSelector } from 'react-redux';
import { CircularProgress, Grid } from '@material-ui/core';
import Post from './Post/Post';
import useStyles from './styles';

const Posts = ({ setCurrentId }) => {
  const posts = useSelector((state) => state.posts);
  const classes = useStyles();

  return (
    !posts.length ? <CircularProgress />
      : (
        <Grid
          className={classes.container}
          container
          alignItems="stretch"
          spacing={4}
        >
          {posts.map((post) => (
            <Grid
              key={post._id}
              item
              xs={12}
              sm={6}
            >
              <Post setCurrentId={setCurrentId} post={post} />
            </Grid>
          ))}
        </Grid>
      )
  );
};

export default Posts;
