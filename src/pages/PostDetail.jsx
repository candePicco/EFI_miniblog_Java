import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import postService from "../api/postService";

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  // Cargar el post
  const loadPost = async () => {
    try {
      const { data } = await postService.getOne(id);
      setPost(data);
    } catch (error) {
      console.error("Error al cargar el post:", error);
    }
  };

  useEffect(() => {
    loadPost();
  }, [id]);

  if (!post) return <p>Cargando...</p>;

  return (
    <div className="container fade-in">

      <div className="card animated-card" style={{ marginTop: "1.5rem" }}>
        <h2>{post.title}</h2>
        <p>{post.content}</p>

        <small>
          ✍️ {post.author?.username || "Usuario"} —{" "}
          {new Date(post.created_at).toLocaleDateString()}
        </small>
      </div>

      {}
      <h3 style={{ marginTop: "3rem", opacity: 0.6, textAlign: "center" }}>
        No hay comentarios disponibles.
      </h3>

    </div>
  );
}
