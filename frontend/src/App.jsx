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

export default function App() {
  const [usuario, setUsuario] = useState(null);
  const [mostrarLogin, setMostrarLogin] = useState(true);
  const [vista, setVista] = useState("inicio"); // Estado para la navegación

  // Estados para refrescar las listas
  const [actualizarLista, setActualizarLista] = useState(0);
  const [actualizarResultados, setActualizarResultados] = useState(0);

  const refrescarTabla = () => {
    setActualizarLista((prev) => prev + 1);
  };

  const refrescarResultados = () => {
    setActualizarResultados((prev) => prev + 1);
  };

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
    setVista("inicio"); // Al cerrar sesión volvemos al inicio por defecto
  };

  return (
    <div
      style={{
        fontFamily: "sans-serif",
        maxWidth: "1000px",
        width: "100%",
        margin: "0 auto",
        padding: "10px",
        boxSizing: "border-box",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#333" }}>
        Sistema de Gestión - Club de Fútbol ⚽
      </h1>

      {!usuario ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "40px",
            width: "100%",
          }}
        >
          <div
            style={{ width: "100%", maxWidth: "450px", textAlign: "center" }}
          >
            {mostrarLogin ? (
              <>
                <Login setUsuario={setUsuario} />
                <p style={{ marginTop: "20px" }}>
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
                <Registro />
                <p style={{ marginTop: "20px" }}>
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
        <>
          <div style={styles.navBar}>
            <span>
              Bienvenido, <strong>{usuario.nombre}</strong> (Rol: {usuario.rol})
            </span>
            <button onClick={cerrarSesion} style={{ cursor: "pointer" }}>
              Cerrar Sesión
            </button>
          </div>

          <Perfil usuario={usuario} />

          {/* MENÚ DE NAVEGACIÓN */}
          <Navbar setVista={setVista} vistaActual={vista} />

          {/* LÓGICA DE VISTAS CONDICIONALES */}

          {vista === "inicio" && <Inicio nombreUsuario={usuario.nombre} />}

          {vista === "socios" && (
            <>
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
            </>
          )}

          {vista === "resultados" && (
            <>
              {usuario.rol === "admin" && (
                <>
                  <h2 style={styles.seccionTitulo}>
                    Panel de Resultados Deportivos
                  </h2>
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
            </>
          )}
          {vista === "comunidad" && <Comunidad />}
          {vista === "muro" && (
            <Muro usuarioId={usuario.id} usuarioRol={usuario.rol} />
          )}

          <footer
            style={{
              textAlign: "center",
              marginTop: "50px",
              color: "#999",
              fontSize: "0.8rem",
            }}
          >
            © 2026 Gestión Club de Fútbol - Panel Administrativo
          </footer>
        </>
      )}
    </div>
  );
}

const styles = {
  linkBtn: {
    cursor: "pointer",
    background: "none",
    border: "none",
    color: "blue",
    textDecoration: "underline",
  },
  navBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#f4f4f4",
    padding: "10px",
    borderRadius: "8px",
    flexWrap: "wrap",
    gap: "10px",
  },
  seccionTitulo: { textAlign: "center", color: "#555", marginTop: "30px" },
};
