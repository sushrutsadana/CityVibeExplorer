import axios from 'axios';

export default async (req, res) => {
  const { city } = req.query;
  try {
    const response = await axios.get(`https://newsapi.org/v2/everything?q=${city}&apiKey=${process.env.NEWS_API_KEY}&pageSize=5`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching news data' });
  }
};