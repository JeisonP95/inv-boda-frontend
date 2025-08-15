import React from "react"
import Itinerary from "../pages/Itinerary"
import type { ItineraryEvent } from "../pages/Itinerary"

const itineraryEvents: ItineraryEvent[] = [
  { time: "16:00", event: "Ceremonia", type: "ceremony" },
  { time: "17:30", event: "Cóctel de bienvenida", type: "reception" },
  { time: "19:00", event: "Cena", type: "dinner" },
  { time: "20:30", event: "Primer baile", type: "dance" },
  { time: "21:00", event: "Fiesta", type: "dance" },
  { time: "01:00", event: "Fin del evento", type: "ceremony" },
]

const ItinerarioPage: React.FC = () => {
  return (
    <div className="itinerario-page">
      <Itinerary events={itineraryEvents} />
    </div>
  )
}

export default ItinerarioPage
