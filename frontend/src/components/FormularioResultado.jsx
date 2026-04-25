import { useState } from "react";

const FormularioResultado = ({ recargarPartidos, usuarioRol }) => {
  const [partido, setPartido] = useState({
    equipo_local: "",
    equipo_visitante: "",
    goles_local: 0,
    goles_visitante: 0,
    fecha: "",
    categoria: "Primera",
    estado: "programado",
  });

  const handleChange = (e) => {
    setPartido({ ...partido, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/api/partidos?rol=${usuarioRol}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(partido),
        },
      );

      if (response.ok) {
        alert("🏆 ¡Resultado guardado!");
        setPartido({
          equipo_local: "",
          equipo_visitante: "",
          goles_local: 0,
          goles_visitante: 0,
          fecha: "",
          categoria: "Primera",
          estado: "programado",
        });
        recargarPartidos(); // Avisa para actualizar la lista de abajo
      } else {
        alert("❌ Error al cargar resultado");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>Cargar Resultado / Partido</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          name="equipo_local"
          placeholder="Equipo Local"
          value={partido.equipo_local}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          name="goles_local"
          type="number"
          placeholder="Goles Local"
          value={partido.goles_local}
          onChange={handleChange}
          style={styles.inputSmall}
        />

        <div style={styles.vs}>VS</div>

        <input
          name="goles_visitante"
          type="number"
          placeholder="Goles Vis."
          value={partido.goles_visitante}
          onChange={handleChange}
          style={styles.inputSmall}
        />
        <input
          name="equipo_visitante"
          placeholder="Equipo Visitante"
          value={partido.equipo_visitante}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          name="fecha"
          type="date"
          value={partido.fecha}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <select
          name="estado"
          value={partido.estado}
          onChange={handleChange}
          style={styles.input}
        >
          <option value="programado">Programado</option>
          <option value="finalizado">Finalizado</option>
        </select>

        <button type="submit" style={styles.button}>
          Guardar Partido
        </button>
      </form>
    </div>
  );
};

const styles = {
  card: {
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    marginBottom: "30px",
  },
  title: { textAlign: "center", color: "#333", marginBottom: "20px" },
  form: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    flex: "1 1 150px",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  inputSmall: {
    width: "70px",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    textAlign: "center",
  },
  vs: { fontWeight: "bold", fontSize: "1.2rem", color: "#666" },
  button: {
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    width: "100%",
  },
};

export default FormularioResultado;
