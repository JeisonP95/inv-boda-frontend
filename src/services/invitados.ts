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
    const res = await fetch(buildApiUrl(CONFIG.ENDPOINTS.INVITADOS_FIND), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone }),
    });

    return res.json();
  } catch (error) {
    console.error("Error buscando invitado:", error);
    return {
      success: false,
      message: "Error de conexión"
    };
  }
};
