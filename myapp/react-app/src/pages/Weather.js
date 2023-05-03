import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/Weather.css';
import sun from '../pages/img/sun.png';
import rain from '../pages/img/rain.png';
import rainrain from '../pages/img/rainrain.png';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [airQualityData, setAirQualityData] = useState(null);

  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    return `${year}${month}${day}`;
  };

  const getPreviousDate = () => {
    const now = new Date();
    now.setDate(now.getDate() - 1);
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    return `${year}${month}${day}`;
  };

  const getCurrentHour = () => {
    const now = new Date();
    return String(now.getHours()).padStart(2, '0') + '00';
  };

  const filterData = (data, currentDate) => {
    const currentHour = getCurrentHour();
    const targetCategories = ['TMP', 'SKY', 'REH', 'PTY', 'POP','WSD'];
    const tmxCategory = 'TMX';
    const tmnCategory = 'TMN';
  
    const filteredData = data.reduce((acc, item) => {
      const { category, fcstTime, fcstDate } = item;
  
      const conditions = [
        targetCategories.includes(category) && fcstDate === currentDate,
        category === tmxCategory && fcstDate === currentDate,
        category === tmnCategory,
      ];
  
      if (conditions.some(Boolean) && !acc.find((x) => x.category === item.category && x.fcstDate === item.fcstDate)) {
        acc.push(item);
      }
  
      return acc;
    }, []);
  
    // Remove duplicates
    const uniqueData = Array.from(
      new Set(filteredData.map((item) => JSON.stringify(item)))
    ).map((item) => JSON.parse(item));
  
    return uniqueData;
  };

  const fetchWeatherData = async () => {
    const apiKey = 's2eMCzdkGrxPMhVr%2Bhv2U3bF%2Bj3ui%2B7qUS4r0tJKms0%2Bm%2FDN2TCj76L0o%2BacXVPei8K2lxKVFICQraz0iZgJ5g%3D%3D';
    const baseDate = getPreviousDate();
    const fcstDate = getCurrentDate();
    const time = '0500';
    const url = `/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${apiKey}&pageNo=1&numOfRows=500&dataType=JSON&base_date=${baseDate}&base_time=${time}&nx=59&ny=126&fcst_date=${fcstDate}`;

    try {
      const response = await axios.get(url);
      const filteredData = filterData(response.data.response.body.items.item, fcstDate);
      setWeatherData(filteredData);
      console.log(filteredData);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);
  const API_KEY = '4759e854accb6f09e99bab8c5d423d6e2f98284d';
  const BASE_URL = '/feed/seoul';

  const fetchAirQualityData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/?token=${API_KEY}`);
      setAirQualityData(response.data);
    } catch (error) {
      console.error('Error fetching air quality data:', error);
    }
  };

  useEffect(() => {
    fetchWeatherData();
    fetchAirQualityData();
  }, []);

  const getSkyText = (value) => {
    if (value >= 0 && value <= 5) {
      return "맑음";
    } else if (value >= 6 && value <= 8) {
      return "구름많음";
    } else if (value >= 9 && value <= 10) {
      return "흐림";
    } else {
      return "";
    }
  };

  const getBackgroundImage = (value) => {
    switch (value) {
      case 0:
        return "/img/sun.png";
      case 1:
        return "/img/rain.png";
      case 4:
        return "/img/rainrain.png";
      default:
        return "";
    }
  };
  const getAirQualityText = (value) => {
    if (value >= 0 && value <= 15) {
      return '좋음';
    } else if (value > 15 && value <= 35) {
      return '보통';
    } else if (value > 35 && value <= 75) {
      return '나쁨';
    } else if (value > 75) {
      return '매우 나쁨';
    } else {
      return '로딩 중';
    }
  };

  const getAirQualityImage = (value) => {
    if (value >= 0 && value <= 15) {
      return '/img/good.png';
    } else if (value > 15 && value <= 35) {
      return '/img/normal.png';
    } else if (value > 35 && value <= 75) {
      return '/img/bad.png';
    } else if (value > 75) {
      return '/img/verybad.png';
    } else {
      return '';
    }
  };

  return (
    <>
   <div className="weather-wrap">
   <div
          className="wimg"
          style={{
            backgroundImage: weatherData
              ? `url(${getBackgroundImage(Number(weatherData[3]?.fcstValue))})`
              : "",
          }}
        ></div>
      <div className='wimg-text'>{weatherData && getSkyText(weatherData[2].fcstValue)}</div>
      <div className='temp'>{weatherData && Math.round(weatherData[0].fcstValue)}°</div>
      <div className='temp-l-img'></div>
      <div className='temp-l'>{weatherData && Math.round(weatherData[6].fcstValue)}°</div>
      <div className='temp-h-img'></div>
      <div className='temp-h'>{weatherData && Math.round(weatherData[7].fcstValue)}°</div>
    <div className='bottom-wrap'>
      <div className='dust-box'>
      <div
        className='dust-img'
        style={{
          backgroundImage: airQualityData
            ? `url(${getAirQualityImage(airQualityData.data.iaqi.pm25?.v)})`
            : '',
        }}
      ></div>
        <div className='dust-text'>{airQualityData ? getAirQualityText(airQualityData.data.iaqi.pm25?.v) : '로딩 중'}</div>
        <div className='dust-text2'>미세먼지</div>
      </div>

      <div className='wind-box'>
        <div className='wind-img'></div>
        <div className='wind-text'>{weatherData && Math.round(weatherData[1].fcstValue)}m/s</div>
        <div className='wind-text2'>바람</div>
      </div>
      
      <div className='sup-box'>
        <div className='sup-img'></div>
        <div className='sup-text'>{weatherData && Math.round(weatherData[5].fcstValue)}%</div>
        <div className='sup-text2'>습도</div>
      </div> 

      <div className='rain-box'>
        <div className='rain-img'></div>
        <div className='rain-text'>{weatherData && Math.round(weatherData[4].fcstValue)}%</div>
        <div className='rain-text2'>강수확률</div>
      </div>
      
    </div>
  </div>
    </>
  );
};

export default Weather;

