import type React from "react"
import { useNavigate } from "react-router-dom"
import fotoUbi from "../assets/portada_dic.jpg"
import CustomIconButton from "../components/CustomIconButton"
import { FaMapMarkerAlt, FaArrowLeft } from "react-icons/fa";

interface LocationProps {
  name: string
  address: string
  
  googleMapsLink: string
}

const Location: React.FC<LocationProps> = ({ name, address ,googleMapsLink }) => {
  const navigate = useNavigate()

  return (
    <div className="location-section">
      <button 
        onClick={() => navigate("/invitacion")} 
        className="back-button"
      >
        <FaArrowLeft />
      </button>
      
      <h2>Ubicación</h2>
      <div className="location-name">{name}</div>
      <div className="location-address">{address}</div>
      <div className="location-map-container">
        <img src={fotoUbi} alt="Mapa de ubicación" className="location-map"/>
        <div className="map-button-overlay">
          <CustomIconButton 
            onClick={() => window.open(googleMapsLink, "_blank")}
            icon={<FaMapMarkerAlt />}
            text="Google Maps"
          />
        </div>
      </div>
      <div>
        <h3 className="location-name">Informacion</h3>
        <ul>
          <li><p>🚖 Contacto de taxi: 3238787183</p></li>
          <li></li>
        </ul>
      </div>
    </div>
  )
}

export default Location