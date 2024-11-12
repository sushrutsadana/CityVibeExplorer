export default async (req, res) => {
    const mockData = {
      city: req.query.city,
      costOfLivingIndex: Math.floor(Math.random() * 100) + 50,
      rentIndex: Math.floor(Math.random() * 100) + 30,
      groceriesIndex: Math.floor(Math.random() * 100) + 40,
      restaurantPriceIndex: Math.floor(Math.random() * 100) + 35,
    };
    res.json(mockData);
  };