import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import before from "../assets/before.png";
import next from "../assets/next.png";
import dress_women from "../assets/dress-women.jpg";
import dress_men from "../assets/dress_men.jpg";
import { FaArrowLeft } from "react-icons/fa";

interface DressEvent {
  title: string;
  description: string;
  image: string;
}

interface DressCodeProps {
  events?: DressEvent[];
}

const dressEvents: DressEvent[] = [
  {
    title: "Damas",
    description:
      "Vestidos o conjuntos largos/midi. Evitar color blanco, beige, verde o muy claros. Pueden ser colores oscuros o con brillantes ya que el evento es de noche. Evitar jean y ropa desgastada.",
    image: dress_women,
  },
  {
    title: "Caballeros",
    description:
      "Camisa manga larga y pantalón de vestir. Zapatos de vestir o zapatillas blancas. Blazer opcional. Evitar jean, ropa deportiva y color verde.",
    image: dress_men,
  },
];

const DressCode: React.FC<DressCodeProps> = ({ events = dressEvents }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const navigate = useNavigate();

  const goToNext = () => {
    if (isSliding) return;
    setIsSliding(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
    setTimeout(() => setIsSliding(false), 500);
  };

  const goToPrevious = () => {
    if (isSliding) return;
    setIsSliding(true);
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + events.length) % events.length
    );
    setTimeout(() => setIsSliding(false), 500);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNext();
    }
    if (isRightSwipe) {
      goToPrevious();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <div className="dress-code">
      <button onClick={() => navigate("/invitacion")} className="back-button">
        <FaArrowLeft />
      </button>

      <h2>Código de Vestimenta</h2>
      <div className="timeline-wrapper">
        <button onClick={goToPrevious} className="timeline-button">
          <img src={before} alt="Anterior" className="arrow-icon" />
        </button>

        <div
          className="timeline-event"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <img
            src={events[currentIndex].image}
            alt={events[currentIndex].title}
            className={`timeline-image ${isSliding ? "sliding" : ""}`}
            style={{
              transform: isSliding ? "scale(0.95)" : "scale(1)",
              transition: "transform 0.5s ease",
            }}
          />
          <div className="event-text">
            <h3 className="message">{events[currentIndex].title}</h3>
            <p className="message">{events[currentIndex].description}</p>
          </div>
        </div>
        <button onClick={goToNext} className="timeline-button">
          <img src={next} alt="Siguiente" className="arrow-icon" />
        </button>
      </div>
    </div>
  );
};

export default DressCode;
