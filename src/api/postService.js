import api from "./api";

const postService = {
  getAll: () => api.get("/posts"),
  getOne: (id) => api.get(`/posts/${id}`),
  create: (data) => api.post("/posts", data),
  update: (id, data) => api.put(`/posts/${id}`, data),
  remove: (id) => api.delete(`/posts/${id}`)
};

export default postService;
