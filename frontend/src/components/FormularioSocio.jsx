import { useState } from "react";

const FormularioSocio = ({ recargarSocios }) => {
  const [nuevoSocio, setNuevoSocio] = useState({
    nombre: "", apellido: "", dni: "", categoria: "",
  });

  const handleChange = (e) => {
    setNuevoSocio({ ...nuevoSocio, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/socios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoSocio),
      });

      if (response.ok) {
        setNuevoSocio({ nombre: "", apellido: "", dni: "", categoria: "" });
        recargarSocios(); // Le avisa al componente padre que actualice la tabla
      }
    } catch (error) {
      console.error("Error al agregar socio:", error);
    }
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>Registrar Nuevo Socio</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input name="nombre" placeholder="Nombre" value={nuevoSocio.nombre} onChange={handleChange} required style={styles.input} />
        <input name="apellido" placeholder="Apellido" value={nuevoSocio.apellido} onChange={handleChange} required style={styles.input} />
        <input name="dni" placeholder="DNI" value={nuevoSocio.dni} onChange={handleChange} required style={styles.input} />
        <input name="categoria" placeholder="Categoría" value={nuevoSocio.categoria} onChange={handleChange} required style={styles.input} />
        <button type="submit" style={styles.button}>Guardar Socio</button>
      </form>
    </div>
  );
};

// Estilos separados abajo para no ensuciar el HTML
const styles = {
  card: { padding: "20px", backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)", marginBottom: "20px" },
  title: { marginTop: 0, color: "#333" },
  form: { display: "flex", gap: "10px", flexWrap: "wrap" },
  input: { flex: 1, padding: "8px", border: "1px solid #ccc", borderRadius: "4px" },
  button: { backgroundColor: "#28a745", color: "white", border: "none", padding: "10px 15px", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }
};

export default FormularioSocio;