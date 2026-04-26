const Navbar = ({ setVista, vistaActual, cerrarSesion }) => {
  const botones = [
    { id: "inicio", label: "Inicio" },
    { id: "socios", label: "Socios" },
    { id: "resultados", label: "Resultados" },
    { id: "comunidad", label: "Comunidad" },
    { id: "muro", label: "Muro" },
  ];

  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>C.A. Valentin ⚽</div>
      <ul style={styles.menu}>
        {botones.map((btn) => (
          <li
            key={btn.id}
            onClick={() => setVista(btn.id)}
            style={{
              ...styles.item,
              backgroundColor:
                vistaActual === btn.id
                  ? "rgba(255,255,255,0.1)"
                  : "transparent",
              color: vistaActual === btn.id ? "#3498db" : "white",
              fontWeight: vistaActual === btn.id ? "bold" : "500",
            }}
          >
            {btn.label}
          </li>
        ))}
        <li onClick={cerrarSesion} style={styles.logout}>
          Salir
        </li>
      </ul>
    </nav>
  );
};

// 👇 ESTO ES LO QUE TE FALTABA (O SE HABÍA BORRADO)
const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#2c3e50",
    color: "white",
    padding: "10px 20px",
    borderRadius: "8px",
    marginBottom: "20px",
    flexWrap: "wrap",
  },
  logo: { fontWeight: "bold", fontSize: "1.2rem" },
  menu: {
    display: "flex",
    listStyle: "none",
    gap: "15px",
    margin: 0,
    padding: 0,
    flexWrap: "wrap",
  },
  item: {
    cursor: "pointer",
    fontSize: "0.9rem",
    fontWeight: "500",
    padding: "5px 10px",
    borderRadius: "4px",
    transition: "0.3s",
  },
  logout: {
    cursor: "pointer",
    color: "#e74c3c",
    fontWeight: "bold",
    marginLeft: "10px",
  },
};

export default Navbar;
