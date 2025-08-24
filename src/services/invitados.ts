import { buildApiUrl, CONFIG } from "../config/config";

interface InvitadoData {
  name: string;
  phone: string;
  maxGuests: number;
}

interface FindInvitadoResponse {
  success: boolean;
  message?: string;
  invitado?: InvitadoData;
}

export const findInvitado = async (name: string, phone: string): Promise<FindInvitadoResponse> => {
  try {
    const url = buildApiUrl(CONFIG.ENDPOINTS.INVITADOS_FIND);
    const payload = { name, phone };
    
    console.log("🔍 Buscando invitado:", { url, payload });
    
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    console.log("📡 Respuesta del backend:", { 
      status: res.status, 
      statusText: res.statusText,
      ok: res.ok 
    });

    if (!res.ok) {
      console.error("❌ Error HTTP:", res.status, res.statusText);
      return {
        success: false,
        message: `Error del servidor: ${res.status} ${res.statusText}`
      };
    }

    const data = await res.json();
    console.log("📋 Datos recibidos:", data);
    
    return data;
  } catch (error) {
    console.error("💥 Error buscando invitado:", error);
    return {
      success: false,
      message: "Error de conexión"
    };
  }
};
