import type React from "react"
import { useNavigate } from "react-router-dom"
import { FaGlassCheers, FaUtensils, FaMusic, FaHeart, FaCamera, FaPrayingHands, FaArrowLeft } from "react-icons/fa"
import "../App.css"

export interface ItineraryEvent {
  time: string
  event: string
  type: 'ceremony' | 'reception' | 'dinner' | 'dance' | 'photo' | 'blessing'
}

interface ItineraryProps {
  events: ItineraryEvent[]
}


const getEventIcon = (type: ItineraryEvent['type']) => {
  switch (type) {
    case 'ceremony':
      return <FaHeart className="event-icon" />
    case 'reception':
      return <FaGlassCheers className="event-icon" />
    case 'dinner':
      return <FaUtensils className="event-icon" />
    case 'dance':
      return <FaMusic className="event-icon" />
    case 'photo':
      return <FaCamera className="event-icon" />
    case 'blessing':
      return <FaPrayingHands className="event-icon" />
    default:
      return null
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
                {getEventIcon(event.type)}
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
