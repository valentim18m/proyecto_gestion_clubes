export const Inicio = ({ nombreUsuario }) => {
  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <h1>¡Bienvenido al Club, {nombreUsuario}!</h1>
        <p>Gestioná tu pasión desde un solo lugar.</p>
      </div>

      <div style={styles.info}>
        <h3>Propósito del Sistema</h3>
        <p>
          Este sistema ha sido diseñado para centralizar la administración de
          nuestro club. Aquí podrás consultar el listado de socios, seguir los
          resultados de todas las categorías en tiempo real y participar
          activamente en el muro de novedades.
        </p>
      </div>

      <div style={styles.cardsGrid}>
        <div style={styles.card}>
          <h4>📢 Muro</h4>
          <small>Enterate de las últimas noticias y avisos parroquiales.</small>
        </div>
        <div style={styles.card}>
          <h4>🏆 Resultados</h4>
          <small>Tablas y resultados de los partidos del fin de semana.</small>
        </div>
        <div style={styles.card}>
          <h4>👥 Comunidad</h4>
          <small>
            Conocé a los miembros que hacen grande a nuestra institución.
          </small>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { textAlign: "center", padding: "20px" },
  hero: {
    backgroundColor: "#3498db",
    color: "white",
    padding: "40px 20px",
    borderRadius: "15px",
    marginBottom: "30px",
  },
  info: {
    maxWidth: "700px",
    margin: "0 auto 40px",
    lineHeight: "1.6",
    color: "#444",
  },
  cardsGrid: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  card: {
    flex: "1 1 200px",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    backgroundColor: "#fff",
  },
};
