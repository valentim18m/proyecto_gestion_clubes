const Navbar = ({ setVista, usuarioRol, cerrarSesion }) => {
  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>C.A. Valentin ⚽</div>
      <ul style={styles.menu}>
        <li onClick={() => setVista("inicio")} style={styles.item}>
          Inicio
        </li>
        <li onClick={() => setVista("socios")} style={styles.item}>
          Socios
        </li>
        <li onClick={() => setVista("resultados")} style={styles.item}>
          Resultados
        </li>
        <li onClick={() => setVista("muro")} style={styles.item}>
          Muro
        </li>
        <li onClick={() => setVista("comunidad")} style={styles.item}>
          Comunidad
        </li>
        <li onClick={cerrarSesion} style={styles.logout}>
          Salir
        </li>
      </ul>
    </nav>
  );
};

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
