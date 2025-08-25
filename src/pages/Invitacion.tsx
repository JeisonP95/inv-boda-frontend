import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { MapPin, Camera, Gift, Clock, Shirt, Users } from "lucide-react"
import perfilImg from "../assets/IMG-20250810-WA0117.jpg"
import "../App.css"

export default function InvitationPage() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const navigate = useNavigate()
  const weddingDate = new Date("2025-10-11T18:30:00")

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = weddingDate.getTime() - now
      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        })
      }
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="invitation-wrapper">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="invitation-container"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
          className="decorative-circle"
        >
          <motion.img
            src={perfilImg}
            alt="Sobre"
            className="perfil-img"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
        </motion.div>


          <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="invitation-title">
            Valentina & Yeison
          </motion.h1>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="invitation-date">
            Sábado, <span className="text-4xl font-bold text-gray-700">11</span> de Octubre 2025
          </motion.div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="invitation-message">
            Porque eres una persona muy importante en nuestras vidas queremos que formes parte de este momento tan especial para nosotros.
          </motion.p>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="location-details">
            <p>Casa del río, Santander de Quilichao</p>
            <span>06:30 pm</span>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.8 }} className="countdown">
            <h2 className="countdown-title">Contando los días para nuestra boda</h2>
            <div className="countdown-grid">
              <div className="countdown-item">
                <div className="countdown-number">{timeLeft.days}</div>
                <div className="countdown-label">Días</div>
              </div>
              <div className="countdown-item">
                <div className="countdown-number">{timeLeft.hours}</div>
                <div className="countdown-label">Horas</div>
              </div>
              <div className="countdown-item">
                <div className="countdown-number">{timeLeft.minutes}</div>
                <div className="countdown-label">Minutos</div>
              </div>
              <div className="countdown-item">
                <div className="countdown-number">{timeLeft.seconds}</div>
                <div className="countdown-label">Segundos</div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.4 }} className="more-info">
            <h3 className="more-info-title">Más información</h3>
            <div className="info-buttons">
              <button onClick={() => navigate("/galeria")} className="info-button">
                <Camera className="icon" />
                <span>Galería</span>
              </button>
              <button onClick={() => navigate("/ubicacion")} className="info-button">
                <MapPin className="icon" />
                <span>Ubicación</span>
              </button>
              <button onClick={() => navigate("/vestimenta")} className="info-button">
                <Shirt className="icon" />
                <span>Vestimenta</span>
              </button>
              <button onClick={() => navigate("/itinerario")} className="info-button">
                <Clock className="icon" />
                <span>Itinerario</span>
              </button>
              <button onClick={() => navigate("/regalo")} className="info-button">
                <Gift className="icon" />
                <span>Regalos</span>
              </button>
              <button onClick={() => navigate("/registro")} className="info-button confirm-button">
                <Users className="icon" />
                <span>Confirmar</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
    </div>
  )
}
