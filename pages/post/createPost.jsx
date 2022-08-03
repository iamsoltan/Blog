import * as React from "react";
import { Button, Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import Typography from "@mui/material/Typography";
import { addPost } from "services/posts";
import { useMutation } from "react-query";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import toast from "react-hot-toast";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const validationSchema = yup.object({
  title: yup.string().required(),
  img: yup.string(),
  excerpts: yup.string(),
  vote: yup.number(),
  content: yup.string(),
  author: yup.string().required(),
});

const Post = () => {
  const { mutate, isLoading } = useMutation(addPost, {
    onSuccess: () => {
      toast.success("Successfully Added !");
    },
    onError: (error) => {
      toast.error(`cannot Add  !\n${error.message}`);
    },
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      img: "",
      excerpts: "",
      vote: 0,
      content: "",
      author: "",
    },
    validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(false);
      mutate(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container direction="row" p={1}>
        <Grid p={1} item xs={12}>
          <Typography>Add Post</Typography>
        </Grid>

        <Grid p={1} item xs={12} sm={12} md={6}>
          <TextField
            fullWidth
            id="title"
            name="title"
            label="Title"
            placeholder="Title"
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
        </Grid>

        <Grid p={1} item xs={12} sm={12} md={6}>
          <TextField
            fullWidth
            id="img"
            name="img"
            label="Add Image URL"
            placeholder="Add Image URL"
            value={formik.values.img}
            onChange={formik.handleChange}
            error={formik.touched.img && Boolean(formik.errors.img)}
            helperText={formik.touched.img && formik.errors.img}
          />
        </Grid>

        <Grid p={1} item xs={12} sm={12} md={6}>
          <TextField
            fullWidth
            id="excerpts"
            name="excerpts"
            label="Add Excerpt"
            placeholder="Add Excerpt"
            value={formik.values.excerpts}
            onChange={formik.handleChange}
            error={formik.touched.excerpts && Boolean(formik.errors.excerpts)}
            helperText={formik.touched.excerpts && formik.errors.excerpts}
          />
        </Grid>

        <Grid p={1} item xs={12} sm={12} md={6}>
          <TextField
            fullWidth
            type={"number"}
            id="vote"
            name="vote"
            label="Add Vote ratio"
            placeholder="Add vote ratio like 12 or -3"
            value={formik.values.vote}
            onChange={formik.handleChange}
            error={formik.touched.vote && Boolean(formik.errors.vote)}
            helperText={formik.touched.vote && formik.errors.vote}
          />
        </Grid>
        <Grid p={1} item xs={12} sm={12} md={6}>
          <TextField
            fullWidth
            id="author"
            name="author"
            label="Author"
            placeholder="Author"
            value={formik.values.author}
            onChange={formik.handleChange}
            error={formik.touched.author && Boolean(formik.errors.author)}
            helperText={formik.touched.author && formik.errors.author}
          />
        </Grid>

        <Grid p={1} item xs={12} sm={12} >
          <ReactQuill
            id="content"
            name="content"
            label="Add Post Content"
            placeholder="Add Post Content"
            theme="snow"
            height={300}
            value={formik.values.content}
            onChange={(e) => formik.setFieldValue("content", e)}
          />
          {/* <TextField
            fullWidth
            multiline
            rows={6}
            id="content"
            name="content"
            label="Add Post Content"
            placeholder="Add Post Content"
            value={formik.values.content}
            onChange={formik.handleChange}
            error={formik.touched.content && Boolean(formik.errors.content)}
            helperText={formik.touched.content && formik.errors.content}
          /> */}
        </Grid>

        <Grid p={1} item xs={12}>
          <Button
            variant="contained"
            color="primary"
            disabled={formik.isSubmitting}
            type="submit"
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
export default Post;
