import { useState } from "react";

// 1. Recibimos setUsuario como prop
export default function Login({ setUsuario }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const manejarSubmit = async (e) => {
    e.preventDefault();

    try {
      // 2. Conectamos con el backend de tu amigo
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // 3. Si todo está OK, guardamos el token y el usuario
        localStorage.setItem("token", data.token); // Guardamos sesión
        setUsuario(data.usuario); // ¡ESTO activa el Muro y la Tabla!
        alert("¡Bienvenido al club!");
      } else {
        alert(data.mensaje || "Error al entrar");
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      alert("Che, fijate si el backend está prendido.");
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        color: "white",
      }}
    >
      <h3>Iniciar Sesión (Entrar)</h3>
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
          }}
        >
          Entrar al Sistema
        </button>
      </form>
    </div>
  );
}
