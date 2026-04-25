import { useState, useEffect } from "react";
import "./Muro.css";

export const Muro = ({ usuarioId, usuarioRol }) => {
  const [comentarios, setComentarios] = useState([]);
  const [nuevoTexto, setNuevoTexto] = useState("");

  // 1. Cargar mensajes apenas entra al muro
  useEffect(() => {
    traerMensajes();
  }, []);

  const traerMensajes = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/comentarios");
      const data = await res.json();
      setComentarios(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error al cargar el muro:", error);
    }
  };

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
      // 💡 IMPORTANTE: Ahora mandamos el ROL y el ID del USUARIO logueado
      const response = await fetch(
        `http://localhost:5000/api/comentarios/${id}?rol=${usuarioRol}&usuarioId=${usuarioId}`,
        { method: "DELETE" },
      );

      if (response.ok) {
        traerMensajes();
      } else {
        alert("No tenés permisos para eliminar este comentario");
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
                  <span style={{ fontSize: "0.8rem", color: "#888" }}>
                    {new Date(c.fecha).toLocaleDateString()}
                  </span>

                  {/* LÓGICA DE BORRADO:
                    Se muestra si: el usuario es ADMIN 
                    O si el mensaje le pertenece al usuario logueado 
                  */}
                  {(usuarioRol === "admin" ||
                    Number(c.id_usuario) === Number(usuarioId)) && (
                    <button
                      onClick={() => eliminarComentario(c.id)}
                      className="btn-borrar-comentario"
                      title="Eliminar mensaje"
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
