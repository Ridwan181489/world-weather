export default async function handler(req, res) {
  const city = req.query.city;

  // ===== VALIDATION =====
  if (!city) {
    return res.status(400).json({ error: "Please enter a city or country" });
  }

  const apiKey = process.env.API_KEY;

  try {
    // ===== API CALL =====
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`
    );

    const data = await response.json();

    // ===== ERROR HANDLE =====
    if (data.cod !== 200) {
      return res.status(400).json({
        error: data.message || "Wrong input"
      });
    }

    // ===== SUCCESS RESPONSE =====
    res.status(200).json({
      city: data.name,
      country: data.sys.country,
      temp: data.main.temp,
      feels_like: data.main.feels_like,
      humidity: data.main.humidity,
      wind: data.wind.speed,
      condition: data.weather[0].main,
      icon: data.weather[0].icon
    });

  } catch (err) {
    res.status(500).json({
      error: "API fetch failed"
    });
  }
}