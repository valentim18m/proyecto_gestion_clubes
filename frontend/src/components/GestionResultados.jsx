import { useState, useEffect } from "react";

export const GestionResultados = ({ usuarioRol }) => {
  const [partidos, setPartidos] = useState([]);

  // 1. EL MOTOR: Carga los partidos apenas el componente aparece
  useEffect(() => {
    traerPartidos();
  }, []);

  const traerPartidos = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/partidos");
      const data = await res.json();
      setPartidos(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error al cargar partidos:", error);
    }
  };

  // 2. FUNCIÓN PARA ELIMINAR (Solo Admin)
  const eliminarPartido = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este partido?")) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/partidos/${id}?rol=${usuarioRol}`,
        {
          method: "DELETE",
        },
      );

      if (response.ok) {
        alert("Partido eliminado");
        traerPartidos(); // Refrescamos la lista
      }
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Resultados y Próximos Partidos 🏆</h2>

      <div style={styles.grid}>
        {partidos.length > 0 ? (
          partidos.map((p) => (
            <div
              key={p.id}
              style={{
                ...styles.card,
                background: p.estado === "finalizado" ? "#f8f9fa" : "#fffde7",
                border:
                  p.estado === "finalizado"
                    ? "1px solid #ddd"
                    : "1px solid #f1c40f",
              }}
            >
              <div style={styles.cardHeader}>
                <span style={styles.categoria}>{p.categoria}</span>
                <span>{new Date(p.fecha).toLocaleDateString()}</span>
              </div>

              <div style={styles.marcadorContainer}>
                <span style={styles.equipo}>{p.equipo_local}</span>
                <div style={styles.golesBox}>
                  {p.goles_local} - {p.goles_visitante}
                </div>
                <span style={styles.equipo}>{p.equipo_visitante}</span>
              </div>

              <div style={styles.cardFooter}>
                <span
                  style={{
                    ...styles.estado,
                    color: p.estado === "finalizado" ? "#27ae60" : "#f39c12",
                  }}
                >
                  ● {p.estado}
                </span>

                {/* 🛡️ Botón de eliminar solo para Admin */}
                {usuarioRol === "admin" && (
                  <button
                    onClick={() => eliminarPartido(p.id)}
                    style={styles.deleteBtn}
                    title="Eliminar partido"
                  >
                    🗑️
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", gridColumn: "1/-1", color: "#666" }}>
            No hay partidos programados por ahora.
          </p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: { marginTop: "40px", padding: "10px" },
  title: { textAlign: "center", color: "#2c3e50", marginBottom: "30px" },
  grid: {
    display: "grid",
    gap: "20px",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
  },
  card: {
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    transition: "transform 0.2s ease",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "0.85rem",
    color: "#7f8c8d",
    fontWeight: "bold",
  },
  categoria: { textTransform: "uppercase", color: "#3498db" },
  marcadorContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "15px 0",
  },
  equipo: { flex: 1, fontWeight: "bold", fontSize: "1rem", color: "#2c3e50" },
  golesBox: {
    background: "#2c3e50",
    color: "white",
    padding: "8px 15px",
    borderRadius: "8px",
    fontSize: "1.4rem",
    fontWeight: "bold",
    margin: "0 10px",
    minWidth: "60px",
    textAlign: "center",
  },
  cardFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "10px",
    borderTop: "1px solid #eee",
    paddingTop: "10px",
  },
  estado: {
    fontSize: "0.75rem",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  deleteBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "1.1rem",
    padding: "5px",
    borderRadius: "4px",
    transition: "background 0.2s",
  },
};
