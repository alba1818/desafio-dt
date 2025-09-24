let apiUrl = 'http://localhost:8080'; // valor inicial, pode ser alterado via ConfigScreen

export const setApiBaseUrl = (url) => {
  apiUrl = url;
};

export const getApiBaseUrl = () => apiUrl;

// Buscar sensores únicos (última leitura de cada sensor)
export const fetchSensores = async () => {
  const res = await fetch(`${apiUrl}/api/readings`);
  const data = await res.json();
  // Agrupa por sensorId para mostrar apenas 1 leitura por sensor
  const uniqueSensors = Object.values(data.reduce((acc, item) => {
    acc[item.sensorId] = item;
    return acc;
  }, {}));
  return uniqueSensors;
};

// Buscar histórico de um sensor
export const fetchSensorHistorico = async (sensorId) => {
  const res = await fetch(`${apiUrl}/api/readings`);
  const data = await res.json();
  return data.filter(r => r.sensorId === sensorId);
};

// Registrar leitura nova
export const postReading = async (sensorId, valor) => {
  await fetch(`${apiUrl}/api/readings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      sensorId,
      sensorValue: valor,
      timestamp: new Date().toISOString()
    })
  });
};
