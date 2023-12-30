import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "antd";
import useCitySelection from "./useCitySelection";

const CityList = () => {
  const [allCities, setAllCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [suggestionsVisible, setSuggestionsVisible] = useState(true);

  const { selectedCity, selectedIso3, handleCitySelect, handleIso3Select } =
    useCitySelection();

  useEffect(() => {
    axios.get("https://countriesnow.space/api/v0.1/countries").then((res) => {
      const allCities = [];

      res.data.data.forEach((countryData) => {
        if (countryData.cities && Array.isArray(countryData.cities)) {
          const citiesWithISO3 = countryData.cities.map((city) => ({
            name: city,
            iso3: countryData.iso3,
          }));
          allCities.push(...citiesWithISO3);
        }
      });
      // console.log(allCities);

      setAllCities(allCities);
      setFilteredCities(allCities);
    });
  }, []);

  useEffect(() => {
    if (searchTerm.length >= 3) {
      const filtered = allCities.filter(
        (city) =>
          city.name &&
          typeof city.name === "string" &&
          city.name.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
      setFilteredCities(filtered);
    } else {
      setFilteredCities(allCities);
    }
  }, [searchTerm, allCities]);

  

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };


  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setInputValue(value);

    if (value.length >= 3) {
      setSuggestionsVisible(true);
    }
  };

  const handleSuggestionClick = (selectedCity, iso3) => {
    setInputValue(`${selectedCity}, ${iso3}`);
    setSuggestionsVisible(false);

    handleCitySelect(selectedCity);
    handleIso3Select(iso3);

    localStorage.setItem("selectedCity", selectedCity);
    localStorage.setItem("selectedIso3", iso3);
  };

  return (
    <div className="input-group input-hotel-destination">
      <label htmlFor="cityInput"></label>
      <Input
        type="text"
        id="cityInput"
        placeholder="Destination ou Nom de l'Hôtel"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        autoComplete="off"
      />
      {searchTerm.length >= 3 && suggestionsVisible && (
        <div className="suggestions">
          <ul>
            {filteredCities &&
              filteredCities.slice(0, 3).map((cityData, index) => (
                <li
                  key={index}
                  onClick={() =>
                    handleSuggestionClick(cityData.name, cityData.iso3)
                  }
                >
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CityList;