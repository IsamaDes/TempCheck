// pages/api/weather.js

import fetch from "node-fetch";

export default async function handler(req, res) {
  try {
    const clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    if (!clientIp) {
      throw new Error("Client IP not found");
    }

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

    res.status(200).json({
      client_ip: clientIp,
      country: country,
      temperature: temperature,
    });
  } catch (error) {
    console.error("Error in handler:", error);
    res.status(500).json({ error: error.message });
  }
}
