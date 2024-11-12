const express = require('express');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

// Weather API route
app.get('/api/weather/:city', async (req, res) => {
  try {
    const { city } = req.params;
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching weather data' });
  }
});

// News API route
app.get('/api/news/:city', async (req, res) => {
  try {
    const { city } = req.params;
    const response = await axios.get(`https://newsapi.org/v2/everything?q=${city}&apiKey=${process.env.NEWS_API_KEY}&pageSize=5`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching news data' });
  }
});

// City data API route
app.get('/api/citydata/:city', async (req, res) => {
  try {
    const { city } = req.params;
    const response = await axios.get(`http://geodb-free-service.wirefreethought.com/v1/geo/cities?namePrefix=${city}&limit=1&offset=0&hateoasMode=false`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching city data' });
  }
});

// Cost of living API route (using a mock response for this example)
app.get('/api/costoflivingdata/:city', async (req, res) => {
  // In a real scenario, you would make an API call here
  // For this example, we'll return mock data
  const mockData = {
    city: req.params.city,
    costOfLivingIndex: Math.floor(Math.random() * 100) + 50,
    rentIndex: Math.floor(Math.random() * 100) + 30,
    groceriesIndex: Math.floor(Math.random() * 100) + 40,
    restaurantPriceIndex: Math.floor(Math.random() * 100) + 35,
  };
  res.json(mockData);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});