import { useState } from "react";

export const Registro = () => {
  // 1. Agregamos 'rol' al estado inicial
  const [datos, setDatos] = useState({
    nombre: "",
    email: "",
    password: "",
    rol: "socio", // <--- Por defecto son usuarios comunes
  });

  const manejarCambio = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const enviarRegistro = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      });

      const res = await response.json();
      if (response.ok) {
        alert("¡Usuario registrado con éxito! Ya podés iniciar sesión.");
        // Limpiamos el formulario (opcional)
        setDatos({ nombre: "", email: "", password: "", rol: "usuario" });
      } else {
        alert(res.error || "Error al registrar");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error de conexión con el servidor");
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9", // Un gris clarito para diferenciarlo del login
        marginTop: "20px",
      }}
    >
      <h3 style={{ color: "#333", textAlign: "center" }}>
        Registro de Socio ⚽
      </h3>
      <form onSubmit={enviarRegistro}>
        <input
          name="nombre"
          placeholder="Nombre completo"
          value={datos.nombre} // Controlamos el input
          onChange={manejarCambio}
          required
          style={{
            display: "block",
            marginBottom: "10px",
            width: "100%",
            padding: "8px",
            boxSizing: "border-box",
          }}
        />
        <input
          name="email"
          type="email"
          placeholder="Email de contacto"
          value={datos.email}
          onChange={manejarCambio}
          required
          style={{
            display: "block",
            marginBottom: "10px",
            width: "100%",
            padding: "8px",
            boxSizing: "border-box",
          }}
        />
        <input
          name="password"
          type="password"
          placeholder="Crear Contraseña"
          value={datos.password}
          onChange={manejarCambio}
          required
          style={{
            display: "block",
            marginBottom: "10px",
            width: "100%",
            padding: "8px",
            boxSizing: "border-box",
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Registrarme en el Club
        </button>
      </form>
    </div>
  );
};
