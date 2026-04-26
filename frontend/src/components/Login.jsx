import { useState } from "react";

export default function Login({ setUsuario }) {
  // 1. Estados para los inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 2. Función que se ejecuta al darle al botón
  const manejarSubmit = async (e) => {
    e.preventDefault(); // 🛡️ Evita que la página recargue

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Mandamos lo que el usuario escribió en los inputs
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Guardamos la sesión
        localStorage.setItem("token", data.token);
        localStorage.setItem("usuario", JSON.stringify(data.usuario));

        // Avisamos a App.jsx
        setUsuario(data.usuario);
      } else {
        alert(data.mensaje || "Credenciales incorrectas");
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      alert("Che, fijate si el backend está prendido.");
    }
  };

  return (
    <>
      <form onSubmit={manejarSubmit}>
        {/* 3. Inputs CONECTADOS a los estados */}
        <input
          type="email"
          placeholder="Correo electrónico (Email)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="btn-login">
          Iniciar Sesión
        </button>
      </form>
    </>
  );
}
