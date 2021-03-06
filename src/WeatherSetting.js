import React from 'react';
import styled from '@emotion/styled';
import { availableLocations } from './utils';

const locations = availableLocations.map((location) => location.cityName);
const WeatherSettingWrapper = styled.div`
  position: relative;
  min-width: 360px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  background-color: ${({ theme }) => theme.foregroundColor};
  box-sizing: border-box;
  padding: 20px;
`;

const Title = styled.div`
  font-size: 28px;
  color: ${({ theme }) => theme.titleColor};
  margin-bottom: 30px;
`;

const StyledLabel = styled.label`
  display: block;
  font-size: 16px;
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 15px;
`;

const StyledSelect = styled.select`
  display: block;
  box-sizing: border-box;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.textColor};
  outline: none;
  width: 100%;
  max-width: 100%;
  color: ${({ theme }) => theme.textColor};
  font-size: 16px;
  padding: 7px 10px;
  margin-bottom: 40px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  > button {
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    user-select: none;
    margin: 0;
    letter-spacing: 0.3px;
    line-height: 1;
    cursor: pointer;
    overflow: visible;
    text-transform: none;
    border: 1px solid transparent;
    background-color: transparent;
    height: 35px;
    width: 80px;
    border-radius: 5px;

    &:focus,
    &.focus {
      outline: 0;
      box-shadow: none;
    }

    &::-moz-focus-inner {
      padding: 0;
      border-style: none;
    }
  }
`;

const Back = styled.button`
  && {
    color: ${({ theme }) => theme.textColor};
    border-color: ${({ theme }) => theme.textColor};
  }
`;

const Save = styled.button`
  && {
    color: white;
    background-color: #40a9f3;
  }
`;

const WeatherSetting = (props) => {
  const {setCurrentPage,setCurrentCity,currentCity} =props
  const inputLocationRef = React.useRef(null);
  const handleSave =()=>{
    const locationName = inputLocationRef.current.value;
    if (locations.includes(locationName)) {
      // TODO: ??????????????????...
      console.log(`???????????????????????????${locationName}`);
      setCurrentCity(locationName)
      // STEP 3????????? setCurrentPage ?????????????????????
      setCurrentPage('WeatherCard');
    } else {
      // STEP 4?????????????????? locations ???????????????????????????
      alert(`??????????????????????????? ${locationName} ?????????????????????`);
      return;
    }
  }
    return (
        <WeatherSettingWrapper>
          <Title>??????</Title>
          <StyledLabel htmlFor="location">??????</StyledLabel>
          <StyledSelect
              id="location" name="location" ref={inputLocationRef} defaultValue={currentCity}>
              {locations.map((location) => (
                <option value={location} key={location}>
                  {location}
                </option>
              ))}
          </StyledSelect>
          <ButtonGroup>
            <Back onClick={()=>{props.setCurrentPage('WeatherCard')}}>??????</Back>
            <Save onClick={handleSave}>??????</Save>
          </ButtonGroup>
        </WeatherSettingWrapper>
      );
};

export default WeatherSetting;