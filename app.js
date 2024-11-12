document.addEventListener('DOMContentLoaded', () => {
  const cityInput = document.getElementById('cityInput');
  const searchBtn = document.getElementById('searchBtn');
  const results = document.getElementById('results');
  const userTypeToggle = document.getElementById('userTypeToggle');
  const userTypeLabel = document.getElementById('userTypeLabel');

  searchBtn.addEventListener('click', () => {
      const city = cityInput.value.trim();
      if (city) {
          fetchCityData(city);
      }
  });

  userTypeToggle.addEventListener('change', () => {
      userTypeLabel.textContent = userTypeToggle.checked ? 'Resident' : 'Traveler';
      if (cityInput.value.trim()) {
          fetchCityData(cityInput.value.trim());
      }
  });

  async function fetchCityData(city) {
      try {
          const [weather, news, cityData, costOfLiving] = await Promise.all([
              fetch(`/api/weather/${city}`).then(res => res.json()),
              fetch(`/api/news/${city}`).then(res => res.json()),
              fetch(`/api/citydata/${city}`).then(res => res.json()),
              fetch(`/api/costoflivingdata/${city}`).then(res => res.json())
          ]);

          updateWeatherInfo(weather);
          updateNewsInfo(news);
          updateCityInfo(cityData);
          updateCostInfo(costOfLiving);

          results.classList.remove('hidden');
      } catch (error) {
          console.error('Error fetching data:', error);
      }
  }

  function updateWeatherInfo(data) {
      const weatherInfo = document.getElementById('weatherInfo');
      weatherInfo.innerHTML = `
          <p>Temperature: ${data.main.temp}°C</p>
          <p>Humidity: ${data.main.humidity}%</p>
          <p>Description: ${data.weather[0].description}</p>
      `;
  }

  function updateNewsInfo(data) {
      const newsInfo = document.getElementById('newsInfo');
      newsInfo.innerHTML = data.articles.slice(0, 3).map(article => `
          <div>
              <h3>${article.title}</h3>
              <p>${article.description}</p>
          </div>
      `).join('');
  }

  function updateCityInfo(data) {
      const cityInfo = document.getElementById('cityInfo');
      if (data.data && data.data.length > 0) {
          const city = data.data[0];
          cityInfo.innerHTML = `
              <p>Population: ${city.population}</p>
              <p>Country: ${city.country}</p>
              <p>Region: ${city.region}</p>
          `;
      } else {
          cityInfo.innerHTML = '<p>No city data available</p>';
      }
  }

  function updateCostInfo(data) {
      const costInfo = document.getElementById('costInfo');
      costInfo.innerHTML = `
          <p>Cost of Living Index: ${data.costOfLivingIndex}</p>
          <p>Rent Index: ${data.rentIndex}</p>
          <p>Groceries Index: ${data.groceriesIndex}</p>
          <p>Restaurant Price Index: ${data.restaurantPriceIndex}</p>
      `;
  }
});