import api from "./api";

const commentService = {
  // Obtener comentarios de un post
  getByPostId(postId) {
    return api.get(`/posts/${postId}/comments`);
  },

  // Crear comentario
  create(postId, data) {
    return api.post(`/posts/${postId}/comments`, data);
  },

  // Editar comentario
  update(commentId, data) {
    return api.put(`/comments/${commentId}`, data);
  },

  // Eliminar comentario
  remove(commentId) {
    return api.delete(`/comments/${commentId}`);
  }
};

export default commentService;