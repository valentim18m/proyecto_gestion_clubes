import { useState } from "react";

export default function Login({ setUsuario }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const manejarSubmit = async (e) => {
    e.preventDefault(); // Evita que la página se recargue

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // 1. Guardamos la sesión en el navegador (Persistencia)
        localStorage.setItem("token", data.token);
        localStorage.setItem("usuario", JSON.stringify(data.usuario));

        // 2. Avisamos a App.jsx que ya hay un usuario
        setUsuario(data.usuario);

        alert("¡Bienvenido al club!");
      } else {
        alert(data.mensaje || "Error al entrar");
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      alert("Che, fijate si el backend está prendido.");
    }
  }; // <--- AQUÍ se cierra la función manejarSubmit

  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        color: "white",
        backgroundColor: "#1a1a1a", // Le agregué fondo oscuro para que combine
      }}
    >
      <h3 style={{ textAlign: "center" }}>Iniciar Sesión (Entrar)</h3>
      <form onSubmit={manejarSubmit}>
        <input
          type="email"
          placeholder="Tu Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          type="password"
          placeholder="Tu Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
            cursor: "pointer",
            padding: "10px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "4px",
            fontWeight: "bold",
          }}
        >
          Entrar al Sistema
        </button>
      </form>
    </div>
  );
} // <--- AQUÍ se cierra el componente principal
