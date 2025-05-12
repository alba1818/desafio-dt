import sensores from '../mock/sensors.json';

export const fetchSensoresMock = async () => {
  return sensores;
};

export const fetchSensorHistorico = async (id) => {
  const sensor = sensores.find((s) => s.id === id);
  return sensor ? sensor.historico : [];
};
