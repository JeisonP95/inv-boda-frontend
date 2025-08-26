import React from "react"
import Itinerary from "../pages/Itinerary"
import type { ItineraryEvent } from "../pages/Itinerary"

const itineraryEvents: ItineraryEvent[] = [
  { time: "6:30 PM", event: "Coctel de Bienvenida", type: "reception" },
  { time: "7:00 PM", event: "Ceremonia", type: "ceremony" },
  { time: "8:00 PM", event: "Paso al salón", type: "reception" },
  { time: "8:30 PM", event: "Palabras", type: "speech" },
  { time: "9:00 PM", event: "Brindis", type: "toast" },
  { time: "9:30 PM", event: "Baile", type: "dance" },
  { time: "10:00 PM", event: "Sesión de fotos", type: "photo" },
  { time: "10:30 PM", event: "Cena", type: "dinner" },
  { time: "11:00 PM", event: "Apertura de pista", type: "dance" },
  { time: "11:30 PM", event: "Plataforma 360", type: "platform" },
  { time: "12:00 AM", event: "Lanzamiento de ramo", type: "bouquet" },
]

const ItinerarioPage: React.FC = () => {
  return (
    <div className="itinerario-page">
      <Itinerary events={itineraryEvents} />
    </div>
  )
}

export default ItinerarioPage
