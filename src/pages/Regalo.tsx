import type React from "react"
import { useNavigate } from "react-router-dom"
import { FaGift, FaMoneyBillWave, FaArrowLeft } from "react-icons/fa"
import { useState } from "react"
import { motion } from "framer-motion"
import { CreditCard } from "lucide-react"

const GiftRegistry: React.FC = () => {
  const [showPhysicalGiftMessage, setShowPhysicalGiftMessage] = useState(false)
  const [showHoneymoonForm, setShowHoneymoonForm] = useState(false)
  const navigate = useNavigate()

  const handlePhysicalGiftClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setShowPhysicalGiftMessage(true)
    setShowHoneymoonForm(false)
  }

  const handleHoneymoonClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setShowHoneymoonForm(true)
    setShowPhysicalGiftMessage(false)
  }

  return (
    <div className="gift-registry">
      <button
        onClick={() => navigate("/invitacion")}
        className="back-button"
      >
        <FaArrowLeft />
      </button>

      <h2>Lluvia de sobres</h2>
      <p>
        Su presencia es nuestro mayor regalo; sin embargo, si desean honrarnos con un detalle, agradecemos de corazón su contribución en nuestra lluvia de sobres, pueden elegir entre:
      </p>
      <div className="registry-links">
        <a href="#" className="registry-link" onClick={handlePhysicalGiftClick}>
          <FaGift className="registry-icon" />
          <span>Sobre Físico</span>
        </a>
        <a href="#" className="registry-link" onClick={handleHoneymoonClick}>
          <FaMoneyBillWave className="registry-icon" />
          <span>Aporte digital</span>
        </a>
      </div>

      {showPhysicalGiftMessage && (
        <div className="gift-message">
          <p>
            ¡Muchas gracias por aportar a que nuestra luna de miel sea inolvidable! En la boda habrá un espacio designado para la entrega de sobres físicos.
            Te esperamos con mucho gusto.
          </p>
        </div>
      )}

      {showHoneymoonForm && (
        <div className="gift-message">
          <p className="honeymoon-message">
            ¡Muchas gracias por aportar a que nuestra luna de miel sea inolvidable!
          </p>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="gift-card"
          >
            <div className="gift-header">
              <CreditCard className="icon" />
              <h3>Opciones para su aporte</h3>
            </div>
            <div className="account-info">
              <p className="mono">Cuenta de Ahorros</p>
              <p className="mono">Bancolombia: 745-187530-90 </p>
              <p className="mono">A nombre de: Valentina Florez</p>
            </div>
            <div className="account-info">
              <p className="mono">Nequi: 3136651019 </p>
              <p className="mono">A nombre de: Valentina Florez</p>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default GiftRegistry
