import React from "react"
import { useNavigate } from "react-router-dom"
import {
  FaGlassCheers,
  FaUtensils,
  FaMusic,
  FaHeart,
  FaCamera,
  FaPrayingHands,
  FaArrowLeft,
  FaComments,
  FaGift,
  FaStar,
  FaCocktail,
  FaMapSigns,
  FaSmile
} from "react-icons/fa"
import "../App.css"

export interface ItineraryEvent {
  time: string
  event: string
  type:
    | "ceremony"
    | "reception"
    | "dinner"
    | "dance"
    | "photo"
    | "blessing"
    | "speech"
    | "toast"
    | "platform"
    | "bouquet"
}

interface ItineraryProps {
  events: ItineraryEvent[]
}

const getEventIcon = (eventName: string) => {
  switch (eventName) {
    case "Coctel de Bienvenida":
      return <FaCocktail className="event-icon" />
    case "Ceremonia":
      return <FaHeart className="event-icon" />
    case "Paso al salón":
      return <FaMapSigns className="event-icon" />
    case "Palabras":
      return <FaComments className="event-icon" />
    case "Brindis":
      return <FaGlassCheers className="event-icon" />
    case "Baile":
      return <FaMusic className="event-icon" />
    case "Sesión de fotos":
      return <FaCamera className="event-icon" />
    case "Cena":
      return <FaUtensils className="event-icon" />
    case "Apertura de pista":
      return <FaSmile className="event-icon" />
    case "Plataforma 360":
      return <FaStar className="event-icon" />
    case "Lanzamiento de ramo":
      return <FaGift className="event-icon" />
    default:
      return <FaPrayingHands className="event-icon" />
  }
}

const Itinerary: React.FC<ItineraryProps> = ({ events }) => {
  const navigate = useNavigate()

  return (
    <div className="itinerary">
      <button
        onClick={() => navigate("/invitacion")}
        className="back-button"
      >
        <FaArrowLeft />
      </button>

      <div className="itinerary-content">
        <h2>Itinerario</h2>
        <div className="itinerary-list">
          {events.map((event, index) => (
            <div key={index} className="itinerary-item">
              <div className="event-content">
                {getEventIcon(event.event)}
                <div className="itinerary-event">{event.event}</div>
              </div>
              <div className="itinerary-time">{event.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Itinerary
