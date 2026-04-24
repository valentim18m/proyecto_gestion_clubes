import React from 'react';

const Perfil = () => {
  // Después acá vamos a recibir los datos del usuario logueado
  // Por ahora ponemos datos de prueba para maquetar
  const usuario = {
    nombre: "Juan Pérez",
    email: "juan@ejemplo.com",
    rol: "Socio"
  };

  return (
    <div className="perfil-contenedor">
      <h2>Perfil de Usuario</h2>
      
      <div className="perfil-tarjeta">
        {/* Acá iría el avatar de fútbol que elijan */}
        <div className="avatar-placeholder">
          ⚽
        </div>
        
        <div className="datos-usuario">
          <p><strong>Nombre:</strong> {usuario.nombre}</p>
          <p><strong>Email:</strong> {usuario.email}</p>
          <p><strong>Rol:</strong> {usuario.rol}</p>
        </div>
      </div>
    </div>
  );
};

export default Perfil;