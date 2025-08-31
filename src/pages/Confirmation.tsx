import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { enviarRSVP } from "../services/rsvp";
import { findInvitado } from "../services/invitados";


interface RSVPProps {
  onSubmit?: (name: string, attending: string, guests?: number) => void;
  ticket?: string | null;
}

const Confirmation: React.FC<RSVPProps> = ({ ticket: externalTicket }) => {
  const [name, setName] = useState("");
  const [telefono, setTelefono] = useState("");
  const [attending, setAttending] = useState("");
  const [guests, setGuests] = useState(0);
  const [ticket, setTicket] = useState<string | null>(externalTicket || null);

  const [loading, setLoading] = useState(false);
  // ✅ Ahora sí, dentro del componente
  const [numeroPermitidos, setNumeroPermitidos] = useState<number | null>(null);

  const navigate = useNavigate();

  const handleRSVP = (attendingValue: string) => {
    const ticketNumber = Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, "0");

    if (attendingValue === "yes") {
      setTicket(`INVITACIÓN-${ticketNumber} (${guests} personas)`);
    } else {
      setTicket(`DECLINACIÓN-${ticketNumber}`);
    }
  };
//Validacion de asistencia
  const handleAttendingChange = async (value: string) => {
  setAttending(value);

  if (value === "yes") {
    if (!name.trim() || !telefono.trim()) {
      alert("Por favor ingresa tu nombre y teléfono antes de continuar");
      setAttending(""); // resetea la selección
      return;
    }
    setLoading(true); // 👈 empieza la búsqueda
    try {
      console.log("🔍 Iniciando búsqueda de invitado:", { name, telefono });
      
      const data = await findInvitado(name, telefono);

      console.log("📋 Resultado de búsqueda:", data);

      if (data.success && data.invitado) {
        console.log("✅ Invitado encontrado:", data.invitado);
        setNumeroPermitidos(data.invitado.maxGuests);
        setGuests(1);
      } else {
        console.log("❌ Invitado no encontrado:", data.message);
        alert(`No encontramos tu invitación: Revisa nombre y teléfono.`);
        setNumeroPermitidos(null);
        setGuests(0);
      }
    } catch (err) {
      console.error("💥 Error en búsqueda:", err);
      alert(`Tuvimos un problema al buscar tu invitación. Intenta de nuevo en unos minutos`);
      setNumeroPermitidos(null);
      setGuests(0);
    } finally {
      setLoading(false); // 👈 termina la búsqueda
    }
  } else {
    setNumeroPermitidos(null);
    setGuests(0);
    setLoading(false); // asegurarse de limpiar si cambia a "no"
  }
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !attending) {
      alert("Por favor ingresa tu nombre y selecciona si asistirás o no.");
      return;
    }
    try {
      const payload: any = {
        name,
        phone: telefono,
        attending: attending === "yes",
      };

      if (attending === "yes") {
        payload.guests = guests;
      }

      const data = await enviarRSVP(payload);
      if (data.success) {
        handleRSVP(attending);
      } else {
        alert("Error al enviar tu confirmación: " + data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Error al enviar tu confirmación");
    }
  };

  return (
    <div className="rsvp">
      <button onClick={() => navigate("/invitacion")} className="back-button">
        <FaArrowLeft />
      </button>

      <h2>Confirmación de Asistencia</h2>
      
      <form className="rsvp-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ej: María José González"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="telefono">Teléfono</label>
          <input
            type="tel"
            id="telefono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            placeholder="Ej: 3001234567"
            required
          />
          <small className="form-help">
            Ingresa solo los números del teléfono, sin espacios ni guiones
          </small>
        </div>

        <div className="ask-asistir">
          <label>¿Asistirás?</label>
        </div>
        <div className="container-asistir">
          <div className="check-asistir">
            <div className="si-asistir">
              <input
                type="radio"
                id="attending-yes"
                name="attending"
                value="yes"
                checked={attending === "yes"}
                onChange={(e) => handleAttendingChange(e.target.value)}
              />
              <label htmlFor="attending-yes">Sí, asistiré</label>
            </div>
            <div className="no-asistir">
              <input
                type="radio"
                id="attending-no"
                name="attending"
                value="no"
                checked={attending === "no"}
                onChange={(e) => handleAttendingChange(e.target.value)}
              />
              <label htmlFor="attending-no">No podré asistir</label>
            </div>
          </div>
        </div>

        {loading && (
          <small className="form-search">🔍Buscando su invitación, espere un momento...</small>
        )}

        {attending === "yes" && numeroPermitidos !== null && (
          <div className="form-group">
            <p className="msn">
              "Queremos que este día sea especial para todos. Por favor, no
              llevar niños (es un espacio para que disfruten los adultos),
              llegar puntuales y seguir el código de vestimenta indicado.
              ¡Gracias por su comprensión!"
            </p>
            <label htmlFor="guests">Número de Acompañantes</label>
            <select
              id="guests"
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
            >
              <option value={1}>Solo yo</option>
              {numeroPermitidos === 2 && (
                <option value={2}>Yo + 1 acompañante</option>
              )}
            </select>
          </div>
        )}

        <button type="submit" className="submit-btn">
          Confirmar
        </button>
      </form>

      {ticket && attending === "yes" && (
        <div className="ticket">
          <h3>¡Gracias por confirmar tu asistencia!</h3>
          <p className="ticket-number">{name}</p>
          <p>
            Nos alegra mucho que puedas acompañarnos en este día tan especial.
          </p>
          <p>Asistirán {guests} personas.</p>
          <div className="ticket-message">
            <p>Con cariño,</p>
            <p className="signature">Valentina & Yeison</p>
          </div>
        </div>
      )}

      {ticket && attending === "no" && (
        <div className="ticket decline-ticket">
          <h3>Gracias por tu respuesta</h3>
          <p>
            Lamentamos mucho que no puedas acompañarnos en este día tan
            especial.
          </p>
          <p>Tu presencia siempre estará en nuestros corazones.</p>
          <div className="ticket-message">
            <p>Con cariño,</p>
            <p className="signature">Valentina & Yeison</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Confirmation;
