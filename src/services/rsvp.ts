interface RSVPData {
  name: string;
  phone: string;
  attending: boolean;
  guests?: number;
}

export const enviarRSVP = async (data: RSVPData) => {
  const res = await fetch("http://localhost:5000/api/rsvp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
};

export const obtenerRSVPs = async () => {
  const res = await fetch("http://localhost:5000/api/rsvp");
  return res.json();
};
