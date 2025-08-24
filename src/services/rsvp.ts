import { buildApiUrl, CONFIG } from "../config/config";

interface RSVPData {
  name: string;
  phone: string;
  attending: boolean;
  guests?: number;
}

export const enviarRSVP = async (data: RSVPData) => {
  const res = await fetch(buildApiUrl(CONFIG.ENDPOINTS.RSVP), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
};

export const obtenerRSVPs = async () => {
  const res = await fetch(buildApiUrl(CONFIG.ENDPOINTS.RSVP));
  return res.json();
};
