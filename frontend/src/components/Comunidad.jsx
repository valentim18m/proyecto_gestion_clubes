export const Comunidad = () => {
  // Datos de la Comisión Directiva (Podés cambiar los nombres)
  const autoridades = [
    { puesto: "Presidente", nombre: "Pedro García", icono: "👔" },
    { puesto: "Vicepresidente", nombre: "Nombre Apellido", icono: "🤝" },
    { puesto: "Tesorero", nombre: "Nombre Apellido", icono: "💰" },
    { puesto: "Secretario", nombre: "Nombre Apellido", icono: "✍️" },
    { puesto: "Vocal 1", nombre: "Nombre Apellido", icono: "🗣️" },
    { puesto: "Vocal 2", nombre: "Nombre Apellido", icono: "🗣️" },
  ];

  return (
    <div style={styles.container}>
      <h2 style={styles.titulo}>Autoridades del Club 🏛️</h2>
      <p style={styles.subtitulo}>
        Conocé a quienes trabajan día a día por nuestra institución.
      </p>

      <div style={styles.grid}>
        {autoridades.map((autoridad, index) => (
          <div key={index} style={styles.card}>
            <div style={styles.icono}>{autoridad.icono}</div>
            <h4 style={styles.puesto}>{autoridad.puesto}</h4>
            <p style={styles.nombre}>{autoridad.nombre}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: { padding: "20px", textAlign: "center" },
  titulo: { color: "#2c3e50", marginBottom: "10px" },
  subtitulo: { color: "#7f8c8d", marginBottom: "30px" },
  grid: {
    display: "grid",
    gap: "20px",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
  },
  card: {
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    borderTop: "4px solid #3498db",
    transition: "transform 0.2s",
  },
  icono: { fontSize: "2.5rem", marginBottom: "10px" },
  puesto: {
    margin: "5px 0",
    color: "#3498db",
    textTransform: "uppercase",
    fontSize: "0.8rem",
    fontWeight: "bold",
  },
  nombre: { margin: 0, fontSize: "1.1rem", fontWeight: "500", color: "#333" },
};
