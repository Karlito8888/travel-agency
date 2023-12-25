import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlaneUp } from "@fortawesome/free-solid-svg-icons";
import { Input } from "antd";


const AirportsList = ({ flightNumber, inputType, required }) => {
  const [allAirports, setAllAirports] = useState([]);
  const [filteredAirports, setFilteredAirports] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [suggestionsVisible, setSuggestionsVisible] = useState(true);

  useEffect(() => {
    axios
      .get("./data/db.json")
      .then((res) => {
        const newData = res.data.airports.map((airport) => ({
          city: airport.city,
          name: airport.name,
          iata_code: airport.iata_code,
          country: airport.country,
        }));
        setAllAirports(newData);
      })
      .catch((error) => console.error("Error fetching data", error));
  }, []);

  useEffect(() => {
    if (searchTerm.length >= 3) {
      const filtered = allAirports.filter((airport) => {
        const searchRegex = new RegExp(searchTerm, "i");
        return (
          searchRegex.test(airport.city) ||
          searchRegex.test(airport.name) ||
          searchRegex.test(airport.iata_code) ||
          searchRegex.test(airport.country) ||
          airport.city.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
          airport.name.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
          airport.iata_code
            .toLowerCase()
            .startsWith(searchTerm.toLowerCase()) ||
          airport.country.toLowerCase().startsWith(searchTerm.toLowerCase())
        );
      });
      setFilteredAirports(filtered);
      setSuggestionsVisible(true);
    } else {
      setFilteredAirports(allAirports);
      setSuggestionsVisible(false);
    }
  }, [searchTerm, allAirports]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
    if (e.key === "Delete" || e.key === "Backspace") {
        setInputValue("");
        setSuggestionsVisible(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setInputValue(value);

    if (value.length >= 3) {
      setSuggestionsVisible(true);
    } else {
      setSuggestionsVisible(false);
      localStorage.removeItem(`${inputType}City${flightNumber}`);
      localStorage.removeItem(`${inputType}Name${flightNumber}`);
      localStorage.removeItem(`${inputType}IataCode${flightNumber}`);
      localStorage.removeItem(`${inputType}Country${flightNumber}`);
    }
  };

  const handleSuggestionClick = (airportData) => {
    const { city, name, iata_code, country } = airportData;
    
    setInputValue(`${city}, ${name} ${iata_code}`);
    setSuggestionsVisible(false);

    localStorage.setItem(`${inputType}City${flightNumber}`, city);
    localStorage.setItem(`${inputType}Name${flightNumber}`, name);
    localStorage.setItem(`${inputType}IataCode${flightNumber}`, iata_code);
    localStorage.setItem(`${inputType}Country${flightNumber}`, country);
  };

  return (
    <React.Fragment>
      <Input
        type="text"
        id={`${inputType}-city-${flightNumber}`}
        name={`${inputType}-city`}
        placeholder={`Ville de ${
          inputType === "departure" ? "départ" : "destination"
        }`}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        autoComplete="off"
        allowClear
        required
      />
      {searchTerm.length >= 3 && suggestionsVisible && (
        <div className="suggestions">
          {filteredAirports.length > 0 ? (
            <ul>
              {filteredAirports &&
                filteredAirports.slice(0, 3).map((airportData, index) => (
                  <li
                    key={index}
                    onClick={() => handleSuggestionClick(airportData)}
                  >
                    <FontAwesomeIcon icon={faPlaneUp} />
                    &nbsp;{airportData.city},&nbsp;{airportData.name}
                    &nbsp;&#x2768;
                    {airportData.iata_code}&#x2769;&nbsp;-&nbsp;{airportData.country}
                  </li>
                ))}
            </ul>
          ) : (
            <p>Aucune suggestion trouvée</p>
          )}
        </div>
      )}
    </React.Fragment>
  );
};

export default AirportsList;
