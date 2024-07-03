// pages/weather.js

import fetch from "node-fetch";

export async function getServerSideProps(context) {
  const clientIp =
    context.req.headers["x-forwarded-for"] || context.req.socket.remoteAddress;

  if (!clientIp) {
    return {
      notFound: true,
    };
  }

  try {
    // Use a geolocation API to get the location
    const geoResponse = await fetch(`https://ipapi.co/${clientIp}/json/`);
    if (!geoResponse.ok) {
      throw new Error("Failed to fetch geolocation data");
    }
    const geoData = await geoResponse.json();
    const country = geoData.country_name || "Unknown Country";

    // Use a weather API to get the temperature
    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${geoData.latitude}&longitude=${geoData.longitude}&current_weather=true`
    );
    if (!weatherResponse.ok) {
      throw new Error("Failed to fetch weather data");
    }
    const weatherData = await weatherResponse.json();
    const temperature = weatherData.current_weather.temperature;

    return {
      props: {
        clientIp,
        country,
        temperature,
      },
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return {
      notFound: true,
    };
  }
}

export default function WeatherPage({ clientIp, country, temperature }) {
  return (
    <div>
      <h2>Weather Information</h2>
      <p>Client IP: {clientIp}</p>
      <p>Country: {country}</p>
      <p>Temperature: {temperature} °C</p>
    </div>
  );
}
