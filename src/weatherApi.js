import {useState,useEffect,useCallback} from 'react'
import axios from 'axios'
const getDate = (cityName)=>{
    return axios.get(`https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-BF53B2E7-31FB-4B6D-82E7-F97E591C849F&locationName=${cityName}`).then(
      response =>{
        const localdata = response.data.records.location[0]
        const element = localdata.weatherElement.filter((item)=>{
          return (item.elementName==='Wx' || item.elementName==='PoP' ||item.elementName ==='CI')
        })
        return {
          description: element[0].time[0].parameter.parameterName ,
          weatherCode: element[0].time[0].parameter.parameterValue,
          rainPossibility: element[1].time[0].parameter.parameterName,
          comfortability: element[2].time[0].parameter.parameterName,
         }
      }     
    )
  };
  const reload = (locationName) =>{
    return axios.get(`https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=CWB-BF53B2E7-31FB-4B6D-82E7-F97E591C849F&locationName=${locationName}`).then(
     (response)=>{
       const localData =response.data.records.location[0]
       const element = localData.weatherElement.filter((item)=>{
         return (item.elementName==='WDSD' || item.elementName==='TEMP' ||item.elementName ==='HUMD')
       })
       return {
         observationTime: localData.time.obsTime,
         locationName: localData.locationName,
         temperature: element[1].elementValue,
         windSpeed: element[0].elementValue,
         humid: element[2].elementValue,
       }
     }
   ).catch((error)=>{console.log(error)})
  };
const useWeatherApi = (currentLocation)=>{
  const { locationName, cityName } = currentLocation
  console.log(cityName +'cityname')
    const [currentWeather, setCurrentWeather] = useState({
        observationTime: new Date(),
        locationName: '',
        humid: 0,
        temperature: 0,
        windSpeed: 0,
        description: '',
        weatherCode: 0,
        rainPossibility: 0,
        comfortability: '',
        isLoading: true,
      });
      const getallData = useCallback(()=>{
        const gettingallData = async() => {
          const  [currentWeather,weatherForecast] = await Promise.all([reload(locationName),getDate(cityName)])
          setCurrentWeather({
            ...currentWeather,
            ...weatherForecast,
            isLoading: false,
          })
        };
        setCurrentWeather((pre)=>({
          ...pre,
          isLoading: true,
        }));
        gettingallData()
      },[cityName,locationName]);
      useEffect(()=>{
        getallData()
     },[getallData]);
     return [currentWeather,getallData]
};
export default useWeatherApi