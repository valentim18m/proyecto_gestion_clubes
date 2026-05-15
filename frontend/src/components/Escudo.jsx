// src/components/Escudo.jsx
import logoClub from "../assets/logoclub.png"; // Asegurate de guardarlo en assets

const Escudo = ({ size = "50px" }) => {
  return (
    <div className="escudo-container">
      <img
        src={logoClub}
        alt="Escudo del Club"
        style={{ width: size, height: "auto" }}
      />
    </div>
  );
};

export default Escudo;
