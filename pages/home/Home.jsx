import * as React from "react";
import Card from "components/Card";
import getPosts from "services/posts";
import { Grid, LinearProgress, TextField } from "@mui/material";
import { useQuery } from "react-query";

export default function Home() {
  const { data, isLoading } = useQuery(["posts"], () => getPosts(), {
    keepPreviousData: true,
  });

  const [search, setSearch] = React.useState("");
  const regex = new RegExp(search, "gi");
  const newData = data?.filter((e) =>
    [e.title, e.excerpts, e.author, e.content, ""].some((el) => el.match(regex))
  );

  {
    isLoading && <LinearProgress />;
  }

  if (data?.length === 0) {
    return "No Posts created yet!   try editing one ?";
  }

  return (
    <>
      <Grid
        container
        direction="row"
        display={"flex"}
        justifyContent="center"
        alignItems={"center"}
        pl={"15%"}
        pr={"15%"}
      >
        <Grid p={1} item xs={12} sm={12} md={6}>
          <TextField
            fullWidth
            id="Search"
            name="Search"
            label="Search"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Grid>
      </Grid>
      <Grid container direction="row" pl={"15%"} pr={"15%"}>
        {newData?.map((e) => (
          <Grid p={1} item xs={12} sm={6} md={4}>
            <Card
              title={e.title}
              img={e.img}
              excerpts={e.excerpts}
              _id={e._id}
              vote={e.vote}
              author={e.author}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
