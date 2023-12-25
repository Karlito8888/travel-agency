import { useState } from 'react';

const useCitySelection = () => {
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedIso3, setSelectedIso3] = useState("");

    const handleCitySelect = (city) => {
    setSelectedCity(city);
  };
  const handleIso3Select = (iso3) => {
    setSelectedIso3(iso3);
  };

  return {
    selectedCity,
    selectedIso3,
    handleCitySelect,
    handleIso3Select,
  };
};

export default useCitySelection;