import { useState, useEffect } from "react";
import FormularioSocio from "./components/FormularioSocio";
import TablaSocios from "./components/TablaSocios";
import { Muro } from "./components/Muro";
import { Registro } from "./components/RegistroSocio";
import Login from "./components/Login";
import { Perfil } from "./components/Perfil";
import FormularioResultado from "./components/FormularioResultado";
import { GestionResultados } from "./components/GestionResultados";
import { Inicio } from "./components/Inicio";
import Navbar from "./components/Navbar";
import { Comunidad } from "./components/Comunidad";
import "./App.css"; // <-- Asegurate de que esto esté importado

export default function App() {
  const [usuario, setUsuario] = useState(null);
  const [mostrarLogin, setMostrarLogin] = useState(true);
  const [vista, setVista] = useState("inicio");

  const [actualizarLista, setActualizarLista] = useState(0);
  const [actualizarResultados, setActualizarResultados] = useState(0);

  const refrescarTabla = () => setActualizarLista((prev) => prev + 1);
  const refrescarResultados = () => setActualizarResultados((prev) => prev + 1);

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    if (usuarioGuardado) setUsuario(JSON.parse(usuarioGuardado));
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    setUsuario(null);
    setVista("inicio");
  };

  return (
    <div id="center">
      {" "}
      {/* Usamos el ID de tu App.css */}
      {/* ⚽ PANTALLA DE INGRESO (Usuario NO logueado) */}
      {!usuario ? (
        <div className="login-screen">
          <div className="login-card">
            <h1 style={{ color: "#2c3e50", marginBottom: "20px" }}>
              C.A. Valentin ⚽
            </h1>

            {mostrarLogin ? (
              <>
                <Login setUsuario={setUsuario} />
                <p style={{ marginTop: "20px", color: "#7f8c8d" }}>
                  ¿No tenés cuenta?{" "}
                  <button
                    onClick={() => setMostrarLogin(false)}
                    style={styles.linkBtn}
                  >
                    Registrate acá
                  </button>
                </p>
              </>
            ) : (
              <>
                <h2 style={{ fontSize: "1.5rem" }}>Nuevo Socio</h2>
                <Registro />
                <p style={{ marginTop: "20px", color: "#7f8c8d" }}>
                  ¿Ya tenés cuenta?{" "}
                  <button
                    onClick={() => setMostrarLogin(true)}
                    style={styles.linkBtn}
                  >
                    Iniciá sesión
                  </button>
                </p>
              </>
            )}
          </div>
        </div>
      ) : (
        /* 🏟️ PLATAFORMA DEL CLUB (Usuario Logueado) */
        <div style={{ width: "100%" }}>
          <div style={styles.headerTop}>
            <span>
              Bienvenido, <strong>{usuario.nombre}</strong> (Rol: {usuario.rol})
            </span>
          </div>

          <Perfil usuario={usuario} />

          <Navbar
            setVista={setVista}
            vistaActual={vista}
            cerrarSesion={cerrarSesion}
          />

          {vista === "inicio" && <Inicio nombreUsuario={usuario.nombre} />}

          {vista === "socios" && (
            <div className="seccion-contenedor" style={{ padding: "20px" }}>
              {usuario.rol === "admin" && (
                <>
                  <h2 style={styles.seccionTitulo}>
                    Gestión Interna de Socios
                  </h2>
                  <FormularioSocio recargarSocios={refrescarTabla} />
                </>
              )}
              <TablaSocios
                key={`socios-${actualizarLista}`}
                usuarioRol={usuario.rol}
              />
            </div>
          )}

          {vista === "resultados" && (
            <div className="seccion-contenedor" style={{ padding: "20px" }}>
              {usuario.rol === "admin" && (
                <>
                  <h2 style={styles.seccionTitulo}>Panel de Resultados</h2>
                  <FormularioResultado
                    recargarPartidos={refrescarResultados}
                    usuarioRol={usuario.rol}
                  />
                </>
              )}
              <GestionResultados
                key={`resultados-${actualizarResultados}`}
                usuarioRol={usuario.rol}
              />
            </div>
          )}

          {vista === "comunidad" && <Comunidad />}

          {vista === "muro" && (
            <div className="seccion-contenedor" style={{ padding: "20px" }}>
              <Muro usuarioId={usuario.id} usuarioRol={usuario.rol} />
            </div>
          )}

          <footer
            style={{
              textAlign: "center",
              marginTop: "50px",
              color: "#999",
              fontSize: "0.8rem",
              borderTop: "1px solid #eee",
              paddingTop: "20px",
            }}
          >
            © 2026 Gestión Club de Fútbol - Panel Administrativo
          </footer>
        </div>
      )}
    </div>
  );
}

const styles = {
  linkBtn: {
    cursor: "pointer",
    background: "none",
    border: "none",
    color: "#3498db",
    fontWeight: "bold",
    textDecoration: "underline",
  },
  headerTop: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "10px",
    fontSize: "0.9rem",
    color: "#7f8c8d",
  },
  seccionTitulo: {
    textAlign: "center",
    color: "#2c3e50",
    marginTop: "10px",
    marginBottom: "20px",
    textTransform: "uppercase",
    fontSize: "1.5rem",
  },
};
