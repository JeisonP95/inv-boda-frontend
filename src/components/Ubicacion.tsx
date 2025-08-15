// src/pages/LocationPage.tsx
import React from "react"
import Location from "../pages/Location"

const LocationPage: React.FC = () => {
  return (
    <Location
      name="Casa del rio"
      address="Av. Jardines 123, Col. Flores, Santander de Quilichao"
      googleMapsLink="https://maps.app.goo.gl/qnfgV4Gs6BjLJRWS6"
    />
  )
}

export default LocationPage
