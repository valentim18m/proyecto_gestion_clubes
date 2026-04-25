import { useState, useEffect } from "react";

const TablaSocios = ({ usuarioRol }) => {
  // 👈 Quité el ";" que estaba acá
  const [socios, setSocios] = useState([]);

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

  useEffect(() => {
    traerSocios();
  }, []);

  const eliminarSocio = async (id) => {
    if (!window.confirm("¿Seguro que querés eliminar este socio?")) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/socios/${id}?rol=${usuarioRol}`,
        { method: "DELETE" },
      );

      if (response.ok) {
        alert("Socio eliminado correctamente");
        traerSocios();
      }
    } catch (error) {
      alert("Error al eliminar");
    }
  };

  return (
    <div style={styles.container}>
      <h3 style={{ textAlign: "center", color: "#333", marginBottom: "20px" }}>
        Socios del Club Registrados
      </h3>

      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.header}>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Nombre</th>
              <th style={styles.th}>Apellido</th>
              <th style={styles.th}>DNI</th>
              <th style={styles.th}>Categoría</th>
              <th style={styles.th}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {socios.length > 0 ? (
              socios.map((s) => (
                <tr key={s.id} style={styles.row}>
                  <td style={styles.td}>{s.id}</td>
                  <td style={styles.td}>{s.nombre}</td>
                  <td style={styles.td}>{s.apellido}</td>
                  <td style={styles.td}>{s.dni}</td>
                  <td style={styles.td}>{s.categoria}</td>
                  <td style={styles.td}>
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
                  style={{
                    textAlign: "center",
                    padding: "20px",
                    color: "#666",
                  }}
                >
                  Cargando socios... o lista vacía.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}; // 👈 ESTA es la llave que te faltaba cerrar antes del styles

const styles = {
  container: {
    marginTop: "20px",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    width: "100%",
    boxSizing: "border-box",
  },
  tableWrapper: {
    width: "100%",
    overflowX: "auto",
    marginTop: "10px",
    borderRadius: "8px",
    border: "1px solid #eee",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "600px",
  },
  header: {
    backgroundColor: "#f8f9fa",
    borderBottom: "2px solid #dee2e6",
  },
  th: {
    padding: "12px 15px",
    textAlign: "center",
    color: "#495057",
    fontWeight: "bold",
    fontSize: "0.9rem",
    textTransform: "uppercase",
  },
  td: {
    padding: "12px 15px",
    textAlign: "center",
    borderBottom: "1px solid #eee",
    color: "#333",
    fontSize: "0.95rem",
  },
  row: {
    transition: "background-color 0.2s",
  },
  deleteBtn: {
    backgroundColor: "#e74c3c",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "0.85rem",
    transition: "background 0.3s ease",
  },
};

export default TablaSocios;
