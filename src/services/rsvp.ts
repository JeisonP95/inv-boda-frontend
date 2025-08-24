import { buildApiUrl, CONFIG } from "../config/config";

interface RSVPData {
  name: string;
  phone: string;
  attending: boolean;
  guests?: number;
}

export const enviarRSVP = async (data: RSVPData) => {
  try {
    const url = buildApiUrl(CONFIG.ENDPOINTS.RSVP);
    
    console.log("📤 Enviando RSVP:", { url, data });
    
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    console.log("📡 Respuesta del backend (RSVP):", { 
      status: res.status, 
      statusText: res.statusText,
      ok: res.ok 
    });

    if (!res.ok) {
      console.error("❌ Error HTTP en RSVP:", res.status, res.statusText);
      throw new Error(`Error del servidor: ${res.status} ${res.statusText}`);
    }

    const responseData = await res.json();
    console.log("📋 RSVP enviado exitosamente:", responseData);
    
    return responseData;
  } catch (error) {
    console.error("💥 Error enviando RSVP:", error);
    throw error;
  }
};

export const obtenerRSVPs = async () => {
  try {
    const url = buildApiUrl(CONFIG.ENDPOINTS.RSVP);
    console.log("📥 Obteniendo RSVPs desde:", url);
    
    const res = await fetch(url);
    
    if (!res.ok) {
      throw new Error(`Error del servidor: ${res.status} ${res.statusText}`);
    }
    
    const data = await res.json();
    console.log("📋 RSVPs obtenidos:", data);
    
    return data;
  } catch (error) {
    console.error("💥 Error obteniendo RSVPs:", error);
    throw error;
  }
};
