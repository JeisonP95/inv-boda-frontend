// src/pages/LocationPage.tsx
import React from "react"
import Location from "../pages/Location"

const LocationPage: React.FC = () => {
  return (
    <Location
      name="Casa del rio"
      address="Cll 2a con Cra 2, Barrio Belen, Santander de Quilichao"
      googleMapsLink="https://maps.app.goo.gl/qnfgV4Gs6BjLJRWS6"
    />
  )
}

export default LocationPage
