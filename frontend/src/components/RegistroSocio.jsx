import { useState } from "react";

export const Registro = () => {
  const [datos, setDatos] = useState({ nombre: "", email: "", password: "" });

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
        alert("¡Usuario registrado! Ahora ya podés probar el Login.");
      } else {
        alert(res.error || "Error al registrar");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div
      style={{ padding: "20px", border: "1px solid #ccc", marginTop: "20px" }}
    >
      <h3>Registro de Nuevo Usuario</h3>
      <form onSubmit={enviarRegistro}>
        <input
          name="nombre"
          placeholder="Nombre"
          onChange={manejarCambio}
          required
          style={{ display: "block", marginBottom: "5px" }}
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={manejarCambio}
          required
          style={{ display: "block", marginBottom: "5px" }}
        />
        <input
          name="password"
          type="password"
          placeholder="Contraseña"
          onChange={manejarCambio}
          required
          style={{ display: "block", marginBottom: "5px" }}
        />
        <button type="submit">Registrarme</button>
      </form>
    </div>
  );
};
