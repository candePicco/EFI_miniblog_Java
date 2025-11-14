import api from "./api";

const commentService = {
  getAll: () => api.get("/comments"),
  getOne: (id) => api.get(`/comments/${id}`),
  create: (data) => api.post("/comments", data),
  update: (id, data) => api.put(`/comments/${id}`, data),
  remove: (id) => api.delete(`/comments/${id}`)
};

export default commentService;
