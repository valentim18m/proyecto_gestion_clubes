import React from "react";
export const Perfil = ({ usuario, email }) => {
  if ((!usuario, email)) {
    return null; // Si no hay usuario, no mostramos nada
  }
  return (
    <div
      style={{
        background: "#2c2c2c",
        color: "white",
        padding: "20px",
        borderRadius: "12px",
        maxWidth: "400px",
        margin: "20px auto",
        textAlign: "center",
        border: "1px solid #444",
      }}
    >
      <h3 style={{ color: "#4caf50", marginBottom: "15px" }}>
        Mi Perfil de Socio
      </h3>

      <div style={{ textAlign: "left" }}>
        <p>
          <strong>Nombre:</strong> {usuario.nombre}
        </p>
        <p>
          <strong>Email:</strong> {usuario.email}
        </p>
        <p>
          <strong>Rol:</strong>
          <span
            style={{
              marginLeft: "10px",
              padding: "2px 8px",
              borderRadius: "4px",
              background: usuario.rol === "admin" ? "#ff5252" : "#44ff44",
              fontSize: "0.8rem",
              textTransform: "uppercase",
            }}
          >
            {usuario.rol}
          </span>
        </p>
        <p>
          <strong>ID de Socio:</strong> #{usuario.id}
        </p>
      </div>
    </div>
  );
};

export default Perfil;
