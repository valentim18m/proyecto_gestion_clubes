import { useEffect, useState } from "react";

function App() {
  const [socios, setSocios] = useState([]);
  const [nuevoSocio, setNuevoSocio] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    categoria: "",
  });

  // 1. Traer socios del servidor
  const obtenerSocios = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/socios");
      const data = await response.json();
      setSocios(data);
    } catch (error) {
      console.error("Error al obtener socios:", error);
    }
  };

  useEffect(() => {
    obtenerSocios();
  }, []);

  // 2. Función para borrar un socio
  const eliminarSocio = async (id) => {
    if (window.confirm("¿Seguro que querés borrar este socio?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/socios/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          obtenerSocios(); // Recargamos la lista automáticamente
        }
      } catch (error) {
        console.error("Error al borrar:", error);
      }
    }
  };

  // 3. Manejar cambios en el formulario
  const handleChange = (e) => {
    setNuevoSocio({
      ...nuevoSocio,
      [e.target.name]: e.target.value,
    });
  };

  // 4. Enviar nuevo socio al backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/socios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoSocio),
      });

      if (response.ok) {
        alert("Socio agregado correctamente");
        setNuevoSocio({ nombre: "", apellido: "", dni: "", categoria: "" });
        obtenerSocios();
      }
    } catch (error) {
      console.error("Error al agregar socio:", error);
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial",
        backgroundColor: "#f4f4f4",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Gestión del Club ⚽</h1>

      {/* Formulario de Alta */}
      <section
        style={{
          marginBottom: "30px",
          border: "1px solid #ccc",
          padding: "15px",
          backgroundColor: "#fff",
          borderRadius: "8px",
        }}
      >
        <h2>Registrar Nuevo Socio</h2>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
        >
          <input
            name="nombre"
            placeholder="Nombre"
            value={nuevoSocio.nombre}
            onChange={handleChange}
            required
          />
          <input
            name="apellido"
            placeholder="Apellido"
            value={nuevoSocio.apellido}
            onChange={handleChange}
            required
          />
          <input
            name="dni"
            placeholder="DNI"
            value={nuevoSocio.dni}
            onChange={handleChange}
            required
          />
          <input
            name="categoria"
            placeholder="Categoría"
            value={nuevoSocio.categoria}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            style={{
              cursor: "pointer",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              padding: "5px 15px",
              borderRadius: "4px",
            }}
          >
            Guardar Socio
          </button>
        </form>
      </section>

      {/* Tabla de Socios */}
      <section
        style={{
          backgroundColor: "#fff",
          padding: "15px",
          borderRadius: "8px",
        }}
      >
        <h2>Listado de Socios</h2>
        <table
          border="1"
          style={{
            width: "100%",
            textAlign: "left",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#eee" }}>
              <th style={{ padding: "10px" }}>Nombre</th>
              <th style={{ padding: "10px" }}>Apellido</th>
              <th style={{ padding: "10px" }}>DNI</th>
              <th style={{ padding: "10px" }}>Categoría</th>
              <th style={{ padding: "10px" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {socios.map((s) => (
              <tr key={s.id}>
                <td style={{ padding: "10px" }}>{s.nombre}</td>
                <td style={{ padding: "10px" }}>{s.apellido}</td>
                <td style={{ padding: "10px" }}>{s.dni}</td>
                <td style={{ padding: "10px" }}>{s.categoria}</td>
                <td style={{ padding: "10px" }}>
                  <button
                    onClick={() => eliminarSocio(s.id)}
                    style={{
                      backgroundColor: "#dc3545",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default App;
