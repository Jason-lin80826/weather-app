import React from 'react';
import styled from '@emotion/styled';
// import { ReactComponent as CloudyIcon } from './img/day-cloudy.svg';
import { ReactComponent as DayThunderstorm } from './img/day-thunderstorm.svg';
import { ReactComponent as DayClear } from './img/day-clear.svg';
import { ReactComponent as DayCloudyFog } from './img/day-cloudy-fog.svg';
import { ReactComponent as DayCloudy } from './img/day-cloudy.svg';
import { ReactComponent as DayFog } from './img/day-fog.svg';
import { ReactComponent as DayPartiallyClearWithRain } from './img/day-partially-clear-with-rain.svg';
import { ReactComponent as DaySnowing } from './img/day-snowing.svg';
import { ReactComponent as NightThunderstorm } from './img/night-thunderstorm.svg';
import { ReactComponent as NightClear } from './img/night-clear.svg';
import { ReactComponent as NightCloudyFog } from './img/night-cloudy-fog.svg';
import { ReactComponent as NightCloudy } from './img/night-cloudy.svg';
import { ReactComponent as NightFog } from './img/night-fog.svg';
import { ReactComponent as NightPartiallyClearWithRain } from './img/night-partially-clear-with-rain.svg';
import { ReactComponent as NightSnowing } from './img/night-snowing.svg';

const IconContainer = styled.div`
  flex-basis: 30%;

  svg {
    max-height: 110px;
  }
`;
const weatherTypes = {
  isThunderstorm: [15, 16, 17, 18, 21, 22, 33, 34, 35, 36, 41],
  isClear: [1],
  isCloudyFog: [25, 26, 27, 28],
  isCloudy: [2, 3, 4, 5, 6, 7],
  isFog: [24],
  isPartiallyClearWithRain: [
    8, 9, 10, 11, 12,
    13, 14, 19, 20, 29, 30,
    31, 32, 38, 39,
  ],
  isSnowing: [23, 37, 42],
};
const weatherIcons = {
  day: {
    isThunderstorm: <DayThunderstorm />,
    isClear: <DayClear />,
    isCloudyFog: <DayCloudyFog />,
    isCloudy: <DayCloudy />,
    isFog: <DayFog />,
    isPartiallyClearWithRain: <DayPartiallyClearWithRain />,
    isSnowing: <DaySnowing />,
  },
  night: {
    isThunderstorm: <NightThunderstorm />,
    isClear: <NightClear />,
    isCloudyFog: <NightCloudyFog />,
    isCloudy: <NightCloudy />,
    isFog: <NightFog />,
    isPartiallyClearWithRain: <NightPartiallyClearWithRain />,
    isSnowing: <NightSnowing />,
  },
};

// STEP 2?????????????????????????????????????????? props ??????
const WeatherIcon = ({weatherCode,moment}) => {
   // STEP 3????????? useState ??????????????????????????????????????????????????? `isClear`
   const [currentWeatherIcon, setCurrentWeatherIcon] = React.useState('isClear');
   React.useEffect(()=>{
    const weatherCode2Type = (weatherCode) => {
      const [weatherType] =
        Object.entries(weatherTypes).find(([weatherType, weatherCodes]) =>
          weatherCodes.includes(Number(weatherCode))
        ) || [];
    
      return weatherType;
    };
    const currentWeatherIcon = weatherCode2Type(weatherCode)
    setCurrentWeatherIcon(currentWeatherIcon)
  },[weatherCode])
  return (
    <IconContainer>
      {
        weatherIcons[moment][currentWeatherIcon]
      }
    </IconContainer>
  );
};

export default WeatherIcon;