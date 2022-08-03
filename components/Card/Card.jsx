import * as React from "react";
import { Card as MuiCard } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";

export default function Card({ _id, title, author, excerpts, img, vote = 0 }) {
  const router = useRouter();
  return (
    <MuiCard
      sx={{
        minWidth: 200,
        border: vote !== 0 ? 5 : 1,
        borderColor: vote > 0 ? "green" : vote < 0 ? "red" : null,
      }}
    >
      <CardMedia component="img" height="140" image={img} alt="green iguana" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {excerpts}
        </Typography>
        <br />
        <Typography variant="p" color="black">
          author : {author}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => router.push(`/post/${_id}`)}>
          Read More
        </Button>
      </CardActions>
    </MuiCard>
  );
}
