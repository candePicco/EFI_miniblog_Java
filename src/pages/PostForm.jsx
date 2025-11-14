import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import postService from "../api/postService";

export default function PostForm() {
  const { id } = useParams();
  const toast = useRef(null);
  const nav = useNavigate();

  const [form, setForm] = useState({
    title: "",
    content: "",
  });

  const fetchOne = async () => {
    if (!id) return;
    const { data } = await postService.getOne(id);
    setForm({
      title: data.title,
      content: data.content,
    });
  };

  useEffect(() => {
    fetchOne();
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();

    try {
      if (!form.title.trim() || !form.content.trim()) {
        toast.current.show({
          severity: "warn",
          summary: "Campos incompletos",
          detail: "Todos los campos son obligatorios",
        });
        return;
      }

      if (id) {
        await postService.update(id, form);
        toast.current.show({
          severity: "success",
          summary: "Actualizado",
          detail: "Post modificado correctamente",
        });
      } else {
        await postService.create(form);
        toast.current.show({
          severity: "success",
          summary: "Creado",
          detail: "Post creado correctamente",
        });
      }

      setTimeout(() => nav("/posts"), 500);
    } catch (err) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "No se pudo guardar el post",
      });
    }
  };

  return (
    <div className="container fade-in">
      <Toast ref={toast} />

      <form className="postform-card" onSubmit={submit}>
        <h2 className="postform-title">
          {id ? "Editar publicación" : "Crear nueva publicación"}
        </h2>

        <div className="postform-group">
          <label>Título</label>
          <InputText
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="postform-input"
            required
          />
        </div>

        <div className="postform-group">
          <label>Contenido</label>
          <InputTextarea
            rows={6}
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            autoResize
            className="postform-textarea"
            required
          />
        </div>

        <div className="postform-buttons">
          <Button type="submit" label="Guardar" className="p-button-primary" />
          <Button
            type="button"
            label="Cancelar"
            className="p-button-secondary"
            onClick={() => nav("/posts")}
          />
        </div>
      </form>
    </div>
  );
}
