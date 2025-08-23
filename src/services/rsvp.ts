interface RSVPData {
  name: string;
  phone: string;
  attending: boolean;
  guests?: number;
}

const API_URL = "https://inv-boda-backend.onrender.com/api/rsvp";

export const enviarRSVP = async (data: RSVPData) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
};

export const obtenerRSVPs = async () => {
  const res = await fetch(API_URL);
  return res.json();
};
