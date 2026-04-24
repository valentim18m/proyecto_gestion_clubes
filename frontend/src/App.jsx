import { useState, useEffect } from "react"; // Solo una vez
import FormularioSocio from "./components/FormularioSocio";
import TablaSocios from "./components/TablaSocios";
import { Muro } from "./components/Muro";
import { Registro } from "./components/RegistroSocio";
import Login from "./components/Login";

export default function App() {
  const [usuario, setUsuario] = useState(null);

  // --- 1. AQUÍ VA EL EFECTO PARA EL F5 ---
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    if (usuarioGuardado) {
      // Si hay algo guardado, lo volvemos a convertir en objeto
      setUsuario(JSON.parse(usuarioGuardado));
    }
  }, []);

  // --- 2. FUNCIÓN PARA CERRAR SESIÓN PROLIJO ---
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
            {/* --- 3. CAMBIAMOS EL ONCLICK AQUÍ --- */}
            <button onClick={cerrarSesion} style={{ cursor: "pointer" }}>
              Cerrar Sesión
            </button>
          </div>

          <h2 style={{ textAlign: "center", color: "#555", marginTop: "30px" }}>
            Gestión Interna de Socios
          </h2>

          <FormularioSocio />
          <TablaSocios />

          <hr style={{ margin: "50px 0", borderTop: "2px solid #eee" }} />

          {/* Pasamos el ID del usuario al Muro */}
          <Muro usuarioId={usuario.id} />
        </>
      )}
    </div>
  );
}
