import axios from 'axios';

export default async (req, res) => {
  const { city } = req.query;
  try {
    const response = await axios.get('https://cities-data-lookup-apiverve.p.rapidapi.com/v1/citieslookup', {
      params: { city },
      headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY,
        'x-rapidapi-host': 'cities-data-lookup-apiverve.p.rapidapi.com',
        Accept: 'application/json'
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching city data' });
  }
};