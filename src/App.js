import React from 'react';
import styled from '@emotion/styled';
import { ThemeProvider } from '@emotion/react';
import useWeatherApi from './weatherApi'
import WeatherCard from './Weathercard'
import WeatherSetting from './WeatherSetting'
import sunriseAndSunsetData from './sunrise-sunset.json';
import { findLocation } from './utils';

const theme = {
  light: {
    backgroundColor: '#ededed',
    foregroundColor: '#f9f9f9',
    boxShadow: '0 1px 3px 0 #999999',
    titleColor: '#212121',
    temperatureColor: '#757575',
    textColor: '#828282',
  },
  dark: {
    backgroundColor: '#1F2022',
    foregroundColor: '#121416',
    boxShadow:
      '0 1px 4px 0 rgba(12, 12, 13, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.15)',
    titleColor: '#f9f9fa',
    temperatureColor: '#dddddd',
    textColor: '#cccccc',
  },
};
const Container = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const getMoment = (locationName) => {
  console.log(locationName)
  
  // STEP 2：從日出日落時間中找出符合的地區
  const location = sunriseAndSunsetData.find(
    (data) => data.locationName === locationName
  );
  // STEP 3：找不到的話則回傳 null
  if (!location) return null;
  // STEP 4：取得當前時間
  console.log(123)
  const now = new Date();

  // STEP 5：將當前時間以 "2019-10-08" 的時間格式呈現
  const nowDate = Intl.DateTimeFormat('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
    .format(now)
    .replace(/\//g, '-');

  // STEP 6：從該地區中找到對應的日期
  const locationDate =
    location.time && location.time.find((time) => time.dataTime === nowDate);

  // STEP 7：將日出日落以及當前時間轉成時間戳記（TimeStamp）
  const sunriseTimestamp = new Date(
    `${locationDate.dataTime} ${locationDate.sunrise}`
  ).getTime();
  const sunsetTimestamp = new Date(
    `${locationDate.dataTime} ${locationDate.sunset}`
  ).getTime();
  const nowTimeStamp = now.getTime();
  // STEP 8：若當前時間介於日出和日落中間，則表示為白天，否則為晚上
  return sunriseTimestamp <= nowTimeStamp && nowTimeStamp <= sunsetTimestamp
    ? 'day'
    : 'night';
};
// app組件
const App = () => {
  const storageCity = localStorage.getItem('cityName');
  const [currentCity, setCurrentCity] = React.useState(storageCity || '臺北市');
  const currentLocation =findLocation(currentCity) || {}
  const [currentWeather,getallData] = useWeatherApi(currentLocation)
  const [currentTheme, setCurrentTheme] = React.useState('light');
  const [currentPage, setCurrentPage] = React.useState('WeatherCard');
  // 透過 useMemo 避免每次都須重新計算取值，記得帶入 dependencies
  const moment = React.useMemo(() => getMoment(currentLocation.cityName), [
    currentLocation.cityName,
  ]);
  React.useEffect(() => {
    setCurrentTheme(moment === 'day' ? 'light' : 'dark');
    // 記得把 moment 放入 dependencies 中
  }, [moment]);
  React.useEffect(() => {
    localStorage.setItem('cityName', currentCity);
  }, [currentCity]);
  return (
    <ThemeProvider theme={theme[currentTheme]}>
    <Container>
      {currentPage === 'WeatherCard'? <WeatherCard currentWeather={currentWeather} moment={moment} 
      getallData={getallData} setCurrentPage={setCurrentPage} 
      currentCity={currentCity}/> :
      <WeatherSetting setCurrentPage={setCurrentPage} setCurrentCity={setCurrentCity}  currentCity={currentCity}/>}
    </Container>
    </ThemeProvider>
  )
};

export default App;