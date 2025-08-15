import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import sello from "../assets/Sello-sobre-removebg-preview.png";

function Sobre() {
  const sobreRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const abrirSobre = () => {
    if (sobreRef.current) {
      sobreRef.current.classList.add("abrir");

      // Redirige después de 3.5 segundos
      setTimeout(() => {
        navigate("/invitacion");
      }, 3500);
    }
  };

  return (
    <div className="body-sobre">
      <div className="cont-sobre">
        <h1 className="sobre-title">¡Nos casamos!</h1>
        <div className="sobre" ref={sobreRef}>
          <button className="sello" onClick={abrirSobre}>
            <div className="sello-icon">
            <img
              src={sello}
              alt="Sello"
              width="60px"
            />
            </div>
          </button>
          <div className="flap"></div>
          <div className="paper">
            <div className="content-text">
              <h2>Valentina & Yeison</h2>
              <p>11 de Octubre 2025</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sobre;