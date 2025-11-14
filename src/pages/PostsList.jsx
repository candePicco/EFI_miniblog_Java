import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import postService from "../api/postService";
import { useAuth } from "../context/AuthContext";

export default function PostsList() {
  const [posts, setPosts] = useState([]);
  const toast = useRef(null);
  const { user } = useAuth();
  const nav = useNavigate();

  const canManage = (p) => {
    if (!user) return false;
    if (user.role === "admin") return true;
    return String(p.user_id) === String(user.id);
  };

  const load = async () => {
    try {
      const { data } = await postService.getAll();
      setPosts(data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const remove = async (id) => {
    if (!confirm("¿Eliminar este post?")) return;

    try {
      await postService.remove(id);
      setPosts(posts.filter((p) => p.id !== id));
      toast.current.show({
        severity: "success",
        summary: "Eliminado",
        detail: "Post eliminado correctamente",
      });
    } catch (err) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "No se pudo eliminar",
      });
    }
  };

  return (
    <div className="container fade-in">
      <Toast ref={toast} />

      <div className="page-header">
        <h2>Publicaciones</h2>
        <Link to="/posts/new" className="btn btn-primary btn-big">
          Crear nueva publicación
        </Link>
      </div>

      <div className="grid">
        {posts.map((p) => (
          <div key={p.id} className="post-card animated-card">
            <h3 className="post-title">{p.title}</h3>
            <p className="post-content">{p.content}</p>

            <small className="post-meta">
              ✍️ {p.author?.username || "Anónimo"} —{" "}
              {new Date(p.created_at).toLocaleDateString()}
            </small>

            {canManage(p) && (
              <div className="post-actions">
                <Button
                  label="Editar"
                  icon="pi pi-pencil"
                  className="p-button-info p-button-text"
                  onClick={() => nav(`/posts/${p.id}`)}
                />

                <Button
                  label="Eliminar"
                  icon="pi pi-trash"
                  className="p-button-danger p-button-text"
                  onClick={() => remove(p.id)}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

