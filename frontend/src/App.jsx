import { useState } from "react";
import FormularioSocio from "./components/FormularioSocio";
import TablaSocios from "./components/TablaSocios";
import { Muro } from "./components/Muro";
import { Registro } from "./components/RegistroSocio";
import Login from "./components/Login";

export default function App() {
  // 1. Creamos el estado para el usuario
  const [usuario, setUsuario] = useState(null);

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

      {/* 2. CONDICIONAL: Si NO hay usuario, mostramos acceso */}
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
            {/* Le pasamos setUsuario al Login para que cuando entre, nos avise */}
            <Login setUsuario={setUsuario} />
          </div>
        </div>
      ) : (
        /* 3. CONDICIONAL: Si HAY usuario, mostramos el panel privado */
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
            <button
              onClick={() => setUsuario(null)}
              style={{ cursor: "pointer" }}
            >
              Cerrar Sesión
            </button>
          </div>

          <h2 style={{ textAlign: "center", color: "#555", marginTop: "30px" }}>
            Gestión Interna de Socios
          </h2>

          <FormularioSocio />
          <TablaSocios />

          <hr style={{ margin: "50px 0", borderTop: "2px solid #eee" }} />

          {/* 4. Agregamos el Muro al final */}
          <Muro usuarioId={usuario.id} />
        </>
      )}
    </div>
  );
}
