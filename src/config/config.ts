// Configuración simple del frontend
export const CONFIG = {
  // URLs de la API
  API_BASE_URL: "https://inv-boda-backend.onrender.com",

  
  // Información de la aplicación
  APP_NAME: "Invitación de Boda",
  APP_VERSION: "1.0.0",
  
  // Endpoints de la API
  ENDPOINTS: {
    RSVP: "/api/rsvp",
    INVITADOS: "/api/invitados",
    INVITADOS_FIND: "/api/invitados/find"
  }
};

// Función para construir URLs completas de la API
export const buildApiUrl = (endpoint: string): string => {
  return `${CONFIG.API_BASE_URL}${endpoint}`;
};

// Función para verificar la conectividad con el backend
export const checkBackendConnection = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${CONFIG.API_BASE_URL}/health`);
    return response.ok;
  } catch (error) {
    console.error('Error conectando al backend:', error);
    return false;
  }
};
