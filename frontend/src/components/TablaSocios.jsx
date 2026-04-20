const TablaSocios = ({ socios, eliminarSocio }) => {
  return (
    <div style={styles.card}>
      <h2 style={styles.title}>Listado de Socios</h2>
      <table style={styles.table}>
        <thead>
          <tr style={styles.headerRow}>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>DNI</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {socios?.map((s) => (
            <tr key={s.id} style={styles.row}>
              <td>{s.nombre}</td>
              <td>{s.apellido}</td>
              <td>{s.dni}</td>
              <td>{s.categoria}</td>
              <td>
                <button
                  onClick={() => eliminarSocio(s.id)}
                  style={styles.deleteBtn}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  card: {
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  title: { marginTop: 0, color: "#333" },
  table: { width: "100%", borderCollapse: "collapse", textAlign: "left" },
  headerRow: { backgroundColor: "#f8f9fa", borderBottom: "2px solid #dee2e6" },
  row: { borderBottom: "1px solid #eee" },
  deleteBtn: {
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default TablaSocios;
