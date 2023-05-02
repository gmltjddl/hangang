import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './css/Weather.module.css';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const apiKey = 's2eMCzdkGrxPMhVr%2Bhv2U3bF%2Bj3ui%2B7qUS4r0tJKms0%2Bm%2FDN2TCj76L0o%2BacXVPei8K2lxKVFICQraz0iZgJ5g%3D%3D';
      const base_url = '/1360000/VilageFcstInfoService/getVilageFcst';
      const queryParams = `?serviceKey=${apiKey}&pageNo=1&numOfRows=10&dataType=JSON&base_date=20230502&base_time=0500&nx=59&ny=126`;
      const url = `${base_url}${queryParams}`;

      try {
        const response = await axios.get(url);
        if (response.data) {
          console.log(response);
          setWeatherData(response.data.response.body.items.item);
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchData();
  }, []);

  const renderWeatherData = () => {
    const filteredData = weatherData.filter((data) =>
      ['SKY', 'TMN', 'TMX', 'PTY'].includes(data.category)
    );

    const categoryLabels = {
      SKY: 'Sky Condition',
      TMN: 'Minimum Temperature',
      TMX: 'Maximum Temperature',
      PTY: 'Precipitation Type',
    };

    return filteredData.map((data, index) => (
      <div key={index} className={styles.weatherItem}>
        <h3 className={styles.weatherCategory}>{categoryLabels[data.category]}</h3>
        <p>{data.fcstValue}</p>
      </div>
    ));
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Weather Forecast</h2>
      {weatherData ? (
        <div className={styles.weatherData}>{renderWeatherData()}</div>
      ) : (
        <p className={styles.loading}>Loading weather data...</p>
      )}
    </div>
  );
};

export default Weather;