import { useEffect, useState } from "react";
import FormularioSocio from "./components/FormularioSocio";
import TablaSocios from "./components/TablaSocios";

function App() {
  const [socios, setSocios] = useState([]);

  const obtenerSocios = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/socios");
      const data = await response.json();
      setSocios(data);
    } catch (error) {
      console.error("Error al obtener socios:", error);
    }
  };

  const eliminarSocio = async (id) => {
    if (window.confirm("¿Seguro que querés borrar este socio?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/socios/${id}`, {
          method: "DELETE",
        });
        if (response.ok) obtenerSocios();
      } catch (error) {
        console.error("Error al borrar:", error);
      }
    }
  };

  useEffect(() => {
    obtenerSocios();
  }, []);

  return (
    <div style={{ padding: "30px", fontFamily: "system-ui", backgroundColor: "#f0f2f5", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center", color: "#1a1a1a", marginBottom: "30px" }}>Gestión del Club ⚽</h1>
      
      {/* Acá inyectamos los componentes que creamos */}
      <FormularioSocio recargarSocios={obtenerSocios} />
      <TablaSocios socios={socios} eliminarSocio={eliminarSocio} />
      
    </div>
  );
}

export default App;