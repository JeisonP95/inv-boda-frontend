import type React from "react"
import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import before from "../assets/before.png"
import next from "../assets/next.png"
import cancion from "../assets/cancion.mp3"
import img from "../assets/IMG-20250810-WA0109.jpg"
import img2 from "../assets/IMG-20250810-WA0110.jpg"
import img3 from "../assets/IMG-20250810-WA0111.jpg"
import img4 from "../assets/IMG-20250810-WA0112.jpg"
import img5 from "../assets/IMG-20250810-WA0113.jpg"
import img6 from "../assets/IMG-20250810-WA0114.jpg"
import img7 from "../assets/IMG-20250810-WA0115.jpg"
import img8 from "../assets/IMG-20250810-WA0116.jpg"

import { FaPlay, FaPause, FaStepBackward, FaStepForward, FaRandom, FaRedo, FaArrowLeft } from "react-icons/fa"

const storyEvents = [
  { title: "Nuestro primer encuentro", image: img },
  { title: "Primer viaje juntos", image: img2 },
  { title: "La propuesta", image: img3 },
  { title: "", image: img4 },
  { title: "", image: img5 },
  { title: "", image: img6 },
  { title: "", image: img7 },
  { title: "", image: img8 }

]

const OurStory: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isSliding, setIsSliding] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load()
    }
  }, [])

  const goToNext = () => {
    if (isSliding) return
    setIsSliding(true)
    setCurrentIndex((prev) => (prev + 1) % storyEvents.length)
    setTimeout(() => setIsSliding(false), 500)
  }

  const goToPrevious = () => {
    if (isSliding) return
    setIsSliding(true)
    setCurrentIndex((prev) => (prev - 1 + storyEvents.length) % storyEvents.length)
    setTimeout(() => setIsSliding(false), 500)
  }

  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX)
  const handleTouchMove = (e: React.TouchEvent) => setTouchEnd(e.touches[0].clientX)
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    if (distance > 50) goToNext()
    if (distance < -50) goToPrevious()
    setTouchStart(null)
    setTouchEnd(null)
  }

  const togglePlay = async () => {
    if (audioRef.current) {
      try {
        if (isPlaying) {
          await audioRef.current.pause()
        } else {
          await audioRef.current.play()
        }
        setIsPlaying(!isPlaying)
      } catch (error) {
        console.error("Error al reproducir el audio:", error)
        setIsPlaying(false)
      }
    }
  }

  return (
    <div className="our-story">
      <button 
        onClick={() => navigate("/invitacion")} 
        className="back-button"
      >
        <FaArrowLeft />
      </button>
      
      <h2>Photoshoot</h2>
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
            src={storyEvents[currentIndex].image}
            alt={storyEvents[currentIndex].title}
            className={`timeline-image ${isSliding ? 'sliding' : ''}`}
            style={{
              transform: isSliding ? 'scale(0.95)' : 'scale(1)',
              transition: 'transform 0.5s ease'
            }}
          />
        </div>
        <button onClick={goToNext} className="timeline-button">
          <img src={next} alt="Siguiente" className="arrow-icon" />
        </button>
      </div>

      <div className="music-controls">
        <p className="song-message">Presiona el botón para escuchar nuestra canción</p>
        <div className="music-player">
          <button className="control-button"><FaRandom /></button>
          <button className="control-button"><FaStepBackward /></button>
          <button onClick={togglePlay} className="play-button">
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <button className="control-button"><FaStepForward /></button>
          <button className="control-button"><FaRedo /></button>
        </div>
        <audio ref={audioRef} src={cancion} onEnded={() => setIsPlaying(false)} preload="auto" />
      </div>
    </div>
  )
}

export default OurStory
