import axios from "axios";


export const getPosts = async () => {
  const response = await axios
    .get("/api/post")
    .catch(() => {
      throw new Error("Posts Error in getPosts");
    });

  return response?.data
};
export default getPosts;

export const getPostById = async (id) => {
  const response = await axios
    .get(`/api/post?id=${id}`)
    .catch(() => {
      throw new Error("Posts Error in getPostById");
    });

  return response?.data[0]
};

export const addPost = async (payload) => {
  const response = await axios
    .post(`/api/post`, payload)
    .catch(() => {
      throw new Error("Posts Error in addPost");
    });

  return response?.data
};