import { useState, useEffect } from "react";
import FormularioSocio from "./components/FormularioSocio";
import TablaSocios from "./components/TablaSocios";
import { Muro } from "./components/Muro";
import { Registro } from "./components/RegistroSocio";
import Login from "./components/Login";
import { Perfil } from "./components/Perfil";

export default function App() {
  const [usuario, setUsuario] = useState(null);

  // --- 1. PRIMER CAMBIO: Estado para refrescar la tabla ---
  const [actualizarLista, setActualizarLista] = useState(0);

  const refrescarTabla = () => {
    setActualizarLista((prev) => prev + 1);
  };

  // Persistencia: Recuperar sesión al cargar o refrescar (F5)
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    setUsuario(null);
  };

  return (
    <div
      style={{
        fontFamily: "sans-serif",
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#333" }}>
        Sistema de Gestión - Club de Fútbol ⚽
      </h1>

      {!usuario ? (
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
            marginBottom: "40px",
          }}
        >
          <div style={{ flex: "1", minWidth: "300px", margin: "10px" }}>
            <Registro />
          </div>
          <div style={{ flex: "1", minWidth: "300px", margin: "10px" }}>
            <Login setUsuario={setUsuario} />
          </div>
        </div>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "#f4f4f4",
              padding: "10px",
              borderRadius: "8px",
            }}
          >
            <span>
              Bienvenido, <strong>{usuario.nombre}</strong> (Rol: {usuario.rol})
            </span>
            <button onClick={cerrarSesion} style={{ cursor: "pointer" }}>
              Cerrar Sesión
            </button>
          </div>

          <Perfil usuario={usuario} />

          {usuario.rol === "admin" ? (
            <>
              <h2
                style={{
                  textAlign: "center",
                  color: "#555",
                  marginTop: "30px",
                }}
              >
                Gestión Interna de Socios
              </h2>
              {/* --- 2. SEGUNDO CAMBIO: Pasamos la función al Formulario --- */}
              <FormularioSocio recargarSocios={refrescarTabla} />
            </>
          ) : (
            <div
              style={{
                margin: "30px 0",
                padding: "20px",
                backgroundColor: "#e3f2fd",
                borderRadius: "8px",
                textAlign: "center",
                border: "1px solid #bbdefb",
              }}
            >
              <p>
                👋 Hola <strong>{usuario.nombre}</strong>. Como Socio, podés ver
                la lista de miembros y el muro.
              </p>
            </div>
          )}

          {/* --- 3. TERCER CAMBIO: Usamos la key para forzar el refresco --- */}
          <TablaSocios key={actualizarLista} usuarioRol={usuario.rol} />

          <hr style={{ margin: "50px 0", borderTop: "2px solid #eee" }} />

          <Muro usuarioId={usuario.id} />
        </>
      )}
    </div>
  );
}
