import * as React from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { getPostById } from "services/posts";
import { Grid, LinearProgress, Typography } from "@mui/material";

const Post = () => {
  const router = useRouter();
  const { pid } = router.query;

  const { data, isLoading } = useQuery(["post"], () => getPostById(pid), {
    keepPreviousData: true,
  });

  {
    isLoading && <LinearProgress />;
  }
  return (
    <>
      <Grid container direction="column" pl={15} pr={15}>
        <Grid p={1} item xs={12}>
          <Typography variant="h3" component="h2">
            {data?.title}
          </Typography>
        </Grid>
        <Grid pl={15} pr={15} item xs={12}>
          <img src={data?.img} />
        </Grid>
        <Grid p={1} item xs={12}>
          <div dangerouslySetInnerHTML={{ __html: data?.content }} />
        </Grid>
      </Grid>
    </>
  );
};
export default Post;
