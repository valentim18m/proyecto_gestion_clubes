import { useState, useEffect } from "react";
import "./Muro.css";

export const Muro = ({ usuarioId }) => {
  const [comentarios, setComentarios] = useState([]);
  const [nuevoTexto, setNuevoTexto] = useState("");

  const traerMensajes = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/comentarios");
      const data = await res.json();
      setComentarios(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error al cargar el muro:", error);
    }
  };

  useEffect(() => {
    traerMensajes();
  }, []);

  const publicar = async (e) => {
    e.preventDefault();
    if (!nuevoTexto.trim()) return;

    try {
      const response = await fetch("http://localhost:5000/api/comentarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_usuario: usuarioId, texto: nuevoTexto }),
      });

      if (response.ok) {
        setNuevoTexto("");
        traerMensajes();
      }
    } catch (error) {
      alert("No se pudo publicar el mensaje");
    }
  };

  const eliminarComentario = async (id) => {
    if (!window.confirm("¿Estás seguro de que querés borrar este mensaje?"))
      return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/comentarios/${id}`,
        {
          method: "DELETE",
        },
      );

      if (response.ok) {
        traerMensajes();
      } else {
        alert("No se pudo eliminar el comentario");
      }
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  return (
    <div className="muro-section">
      <h3>Muro de Avisos ⚽</h3>

      <form onSubmit={publicar} className="muro-form">
        <textarea
          placeholder="Escribí una novedad para el club..."
          value={nuevoTexto}
          onChange={(e) => setNuevoTexto(e.target.value)}
        />
        <button type="submit">Publicar</button>
      </form>

      <div className="muro-feed">
        {comentarios.length === 0 ? (
          <p className="vacio">No hay avisos todavía.</p>
        ) : (
          comentarios.map((c) => (
            <div key={c.id} className="mensaje-card">
              <div className="mensaje-header">
                <strong>{c.nombre_usuario}</strong>

                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <span>{new Date(c.fecha).toLocaleDateString()}</span>

                  {/* Comparamos IDs asegurando que ambos sean números */}
                  {usuarioId && Number(c.id_usuario) === Number(usuarioId) && (
                    <button
                      onClick={() => eliminarComentario(c.id)}
                      className="btn-borrar-comentario"
                      title="Eliminar mi mensaje"
                    >
                      🗑️
                    </button>
                  )}
                </div>
              </div>
              <p>{c.texto}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
