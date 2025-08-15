import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirige automáticamente a la página sobre
    navigate("/sobre");
  }, [navigate]);

  return (
    <div className="home">
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ color: '#4b5563', fontFamily: 'serif' }}>Cargando invitación...</h1>
      </div>
    </div>
  );
} 