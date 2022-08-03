import * as React from "react";
import Card from "components/Card";

export default function DisplayBlog() {
  const blogs = [
    {
      _id: "24154",
      title: "blog title",
      img: "https://mui.com/static/images/cards/contemplative-reptile.jpg",
      excerpts:
        "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
    },
  ];
  return (
    <>
      {blogs.map((e) => (
        <Card title={e.title} img={e.img} excerpts={e.excerpts} _id={e.id} />
      ))}
    </>
  );
}
