import axios from 'axios';

const apiKey = import.meta.env.VITE_API_KEY;

const getWeather = async (lat, lon) => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
  );
  return response.data;
};

export default { getWeather };