import { useState } from "react";

const FormularioSocio = ({ recargarSocios }) => {
  const [nuevoSocio, setNuevoSocio] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    categoria: "",
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
        // 1. Feedback visual de éxito
        alert("✅ ¡Socio guardado con éxito!");

        // 2. Limpiamos los campos para que quede listo para el siguiente
        setNuevoSocio({ nombre: "", apellido: "", dni: "", categoria: "" });

        // 3. ¡ESTA ES LA MAGIA! Avisamos al App.jsx que la tabla debe actualizarse
        if (recargarSocios) {
          recargarSocios();
        }
      } else {
        // 4. Si el servidor responde con error (ej: DNI duplicado)
        const errorData = await response.json();
        alert(
          "❌ Error: " + (errorData.mensaje || "No se pudo guardar el socio"),
        );
      }
    } catch (error) {
      console.error("Error al agregar socio:", error);
      alert("🚀 Error de conexión. Chequeá si el backend está prendido.");
    }
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>Registrar Nuevo Socio</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          name="nombre"
          placeholder="Nombre"
          value={nuevoSocio.nombre}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          name="apellido"
          placeholder="Apellido"
          value={nuevoSocio.apellido}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          name="dni"
          placeholder="DNI (Sin puntos)"
          value={nuevoSocio.dni}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          name="categoria"
          placeholder="Categoría (Ej: Infantil, Mayor)"
          value={nuevoSocio.categoria}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Guardar Socio
        </button>
      </form>
    </div>
  );
};

// Estilos para que se vea prolijo y profesional
const styles = {
  card: {
    padding: "25px",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    marginBottom: "30px",
    border: "1px solid #eee",
  },
  title: {
    marginTop: 0,
    color: "#2c3e50",
    fontSize: "1.5rem",
    textAlign: "center",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },
  input: {
    flex: "1 1 200px", // Se adapta al ancho disponible
    padding: "10px",
    border: "1px solid #dcdde1",
    borderRadius: "6px",
    fontSize: "1rem",
    outline: "none",
  },
  button: {
    backgroundColor: "#2ecc71",
    color: "white",
    border: "none",
    padding: "10px 25px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "1rem",
    transition: "background 0.3s ease",
    marginLeft: "auto",
  },
};

export default FormularioSocio;
