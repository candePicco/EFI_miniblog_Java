// PostDetail.jsx
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import postService from "../api/postService";
import commentService from "../api/commentService"; 
import { useAuth } from "../context/AuthContext"; 
import { Toast } from "primereact/toast"; 
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Card } from "primereact/card"; 
import { InputText } from "primereact/inputtext"; 

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState("");
  const [commentRating, setCommentRating] = useState(5);

  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingContent, setEditingContent] = useState("");

  const toast = useRef(null);
  const { user } = useAuth();

  // ============================
  // CARGAR POST Y COMENTARIOS
  // ============================
  const loadPost = async () => {
    try {
      const { data } = await postService.getOne(id);
      setPost(data);
    } catch (error) {
      console.error("Error al cargar post:", error);
    }
  };

  const loadComments = async () => {
    try {
      const { data } = await commentService.getByPostId(id);
      setComments(data);
    } catch (error) {
      console.error("Error al cargar comentarios:", error);
      setComments([]);
    }
  };

  useEffect(() => {
    loadPost();
    loadComments();
  }, [id]);

  // ============================
  // CREAR COMENTARIO
  // ============================
  const handleSubmitComment = async (e) => {
    e.preventDefault();

    if (!commentContent.trim()) {
      toast.current.show({ severity: "warn", summary: "Advertencia", detail: "El comentario no puede estar vacío." });
      return;
    }

    const ratingValue = Number(commentRating);
    if (ratingValue < 1 || ratingValue > 5) {
      toast.current.show({ severity: "warn", summary: "Advertencia", detail: "La calificación debe estar entre 1 y 5." });
      return;
    }

    try {
      await commentService.create(id, {
        text: commentContent.trim(),
        rating: ratingValue,
      });

      setCommentContent("");
      setCommentRating(5);
      loadComments();

      toast.current.show({ severity: "success", summary: "Éxito", detail: "Reseña agregada correctamente." });
    } catch (err) {
      const msg = err?.response?.data?.msg || "Error al crear reseña";
      toast.current.show({ severity: "error", summary: "Error", detail: msg });
    }
  };

  // ============================
  // ELIMINAR COMENTARIO
  // ============================
  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("¿Eliminar esta reseña?")) return;

    try {
      await commentService.remove(commentId);
      loadComments();
      toast.current.show({ severity: "success", summary: "Éxito", detail: "Reseña eliminada." });
    } catch (error) {
      const msg = error?.response?.data?.msg || "Error al eliminar reseña";
      toast.current.show({ severity: "error", summary: "Error", detail: msg });
    }
  };

  // ============================
  // EDITAR COMENTARIO
  // ============================
  const toggleEditMode = (comment) => {
    setEditingCommentId(comment.id);
    setEditingContent(comment.text);
  };

  const handleUpdateComment = async (e) => {
    e.preventDefault();

    if (!editingContent.trim()) {
      toast.current.show({ severity: "warn", summary: "Advertencia", detail: "El contenido no puede estar vacío." });
      return;
    }

    try {
      await commentService.update(editingCommentId, {
        text: editingContent.trim(),
      });

      setEditingCommentId(null);
      setEditingContent("");
      loadComments();

      toast.current.show({ severity: "success", summary: "Éxito", detail: "Reseña actualizada." });
    } catch (error) {
      const msg = error?.response?.data?.msg || "Error al actualizar reseña";
      toast.current.show({ severity: "error", summary: "Error", detail: msg });
    }
  };

  if (!post) return <p>Cargando...</p>;

  return (
    <div className="container fade-in">
      <Toast ref={toast} />

      {/* ============================
          POST
      ============================ */}
      <div className="card animated-card" style={{ marginTop: "1.5rem" }}>
        <h2>{post.title}</h2>
        <p>{post.content}</p>
        <small>
          ✍️ {post.author?.username || "Usuario"} — {new Date(post.created_at).toLocaleDateString()}
        </small>
      </div>

      {/* ============================
          FORMULARIO DE RESEÑAS
      ============================ */}
      {user ? (
        <div className="card" style={{ marginTop: "1.5rem" }}>
          <h4>Agregá tu reseña</h4>

          <form onSubmit={handleSubmitComment} className="p-fluid">

            <label>Calificación (1-5)</label>
            <InputText
              type="number"
              min="1"
              max="5"
              value={commentRating}
              onChange={(e) => setCommentRating(e.target.value)}
              style={{ width: "5rem", marginBottom: "1rem" }}
            />

            <InputTextarea
              rows={3}
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              placeholder="Escribe tu reseña..."
              autoResize
            />

            <Button label="Publicar reseña" className="p-button-primary" style={{ marginTop: "1rem" }} />
          </form>
        </div>
      ) : (
        <p style={{ textAlign: "center", marginTop: "1.5rem" }}>
          Debes iniciar sesión para dejar una reseña.
        </p>
      )}

      {/* ============================
          LISTA DE RESEÑAS
      ============================ */}
      <h3 style={{ marginTop: "3rem" }}>{comments.length} Reseñas</h3>

      {comments.length > 0 ? (
        comments.map((comment) => (
          <Card key={comment.id} style={{ marginBottom: "1rem" }}>
            {editingCommentId === comment.id ? (
              // ====== MODO EDICIÓN ======
              <form onSubmit={handleUpdateComment}>
                <InputTextarea
                  rows={3}
                  value={editingContent}
                  onChange={(e) => setEditingContent(e.target.value)}
                  autoResize
                />
                <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
                  <Button label="Guardar" className="p-button-success" />
                  <Button label="Cancelar" className="p-button-secondary" onClick={() => setEditingCommentId(null)} />
                </div>
              </form>
            ) : (
              // ====== MODO VISUAL ======
              <>
                <p>
                  ⭐ {comment.rating}/5 — {comment.text}
                </p>

                <small>
                  Por: <strong>{comment.author?.username || "Usuario"}</strong> —{" "}
                  {new Date(comment.created_at).toLocaleDateString()}
                </small>

                {/* PERMISOS: autor o admin */}
                {user && (user.username === comment.author?.username || user.role === "admin") && (
                  <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
                    <Button label="Editar" icon="pi pi-pencil" onClick={() => toggleEditMode(comment)} />
                    <Button label="Eliminar" icon="pi pi-trash" className="p-button-danger" onClick={() => handleDeleteComment(comment.id)} />
                  </div>
                )}
              </>
            )}
          </Card>
        ))
      ) : (
        <p style={{ textAlign: "center", opacity: 0.7 }}>No hay reseñas todavía.</p>
      )}
    </div>
  );
}
