import { useState, useEffect } from "react";

const TablaSocios = ({ usuarioRol }) => {
  const [socios, setSocios] = useState([]);

  // 1. Esta función es la que va a buscar los datos al Backend
  const traerSocios = async () => {
    try {
      console.log("Trayendo socios desde el backend...");
      const response = await fetch("http://localhost:5000/api/socios");
      const data = await response.json();
      setSocios(data);
    } catch (error) {
      console.error("Error al obtener socios:", error);
    }
  };

  // 2. EL MOTOR: Este useEffect se dispara apenas la tabla aparece en pantalla
  // Como en App.jsx usamos la "key", cada vez que la key cambia,
  // este componente muere y nace de nuevo, ejecutando esto otra vez.
  useEffect(() => {
    traerSocios();
  }, []);

  const eliminarSocio = async (id) => {
    if (!window.confirm("¿Seguro que querés eliminar este socio?")) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/socios/${id}?rol=${usuarioRol}`,
        {
          method: "DELETE",
        },
      );

      if (response.ok) {
        alert("Socio eliminado correctamente");
        traerSocios(); // Recargamos después de borrar
      }
    } catch (error) {
      alert("Error al eliminar");
    }
  };

  return (
    <div style={styles.container}>
      <h3 style={{ textAlign: "center", color: "#333" }}>
        Socios del Club Registrados
      </h3>
      <table style={styles.table}>
        <thead>
          <tr style={styles.header}>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>DNI</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {socios.length > 0 ? (
            socios.map((s) => (
              <tr key={s.id} style={styles.row}>
                <td>{s.id}</td>
                <td>{s.nombre}</td>
                <td>{s.apellido}</td>
                <td>{s.dni}</td>
                <td>{s.categoria}</td>
                <td>
                  {usuarioRol === "admin" ? (
                    <button
                      onClick={() => eliminarSocio(s.id)}
                      style={styles.deleteBtn}
                    >
                      🗑️ Borrar
                    </button>
                  ) : (
                    <span style={{ color: "#999", fontSize: "0.8rem" }}>
                      Sin permisos
                    </span>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="6"
                style={{ textAlign: "center", padding: "20px", color: "#666" }}
              >
                Cargando socios... o lista vacía.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    marginTop: "20px",
    backgroundColor: "#fff",
    padding: "15px",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  table: { width: "100%", borderCollapse: "collapse", marginTop: "10px" },
  header: {
    backgroundColor: "#f8f9fa",
    borderBottom: "2px solid #dee2e6",
    padding: "10px",
  },
  row: { borderBottom: "1px solid #eee", textAlign: "center" },
  deleteBtn: {
    backgroundColor: "#ff4d4d",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default TablaSocios;
