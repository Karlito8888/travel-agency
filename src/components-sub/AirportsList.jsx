import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import AsyncSelect from "react-select/async";

const AirportsList = ({ flightNumber, inputType, required }) => {
  const [allAirports, setAllAirports] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [inputLength, setInputLength] = useState(0);

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

  const filteredAirports = useMemo(() => {
    return allAirports.filter(
      (airport) =>
        airport.city.toLowerCase().includes(inputValue.toLowerCase()) ||
        airport.name.toLowerCase().includes(inputValue.toLowerCase()) ||
        airport.iata_code.toLowerCase().includes(inputValue.toLowerCase()) ||
        airport.country.toLowerCase().includes(inputValue.toLowerCase())
    );
  }, [inputValue, allAirports]);

  const handleChange = (selectedOption) => {
    if (selectedOption) {
      const { city, name, iata_code, country } = selectedOption;

      setInputValue(`${city}, ${name} ${iata_code}`);

      localStorage.setItem(`${inputType}City${flightNumber}`, city);
      localStorage.setItem(`${inputType}Name${flightNumber}`, name);
      localStorage.setItem(`${inputType}IataCode${flightNumber}`, iata_code);
      localStorage.setItem(`${inputType}Country${flightNumber}`, country);
    } else {
      setInputValue("");
      localStorage.removeItem(`${inputType}City${flightNumber}`);
      localStorage.removeItem(`${inputType}Name${flightNumber}`);
      localStorage.removeItem(`${inputType}IataCode${flightNumber}`);
      localStorage.removeItem(`${inputType}Country${flightNumber}`);
    }
  };

  const loadOptions = (searchValue, callback) => {
    if (searchValue.length >= 2) {
      const filteredOptions = allAirports.filter(
        (airport) =>
          airport.city.toLowerCase().includes(searchValue.toLowerCase()) ||
          airport.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          airport.iata_code.toLowerCase().includes(searchValue.toLowerCase()) ||
          airport.country.toLowerCase().includes(searchValue.toLowerCase())
      );
      callback(filteredOptions);
    } else {
      callback([]);
    }
  };

  const handleInputChange = (newValue) => {
    setInputValue(newValue);
    setInputLength(newValue.length);
  };

  const customStyles = {
    control: (provided, state) => ({
      // provided conserve les styles de bases tout en ajoutant ou modifiant ceux qu'on souhaite personnaliser.
      // state permet de conditionner les styles en fonction de l'état de l'élément... state.isFocused, etc...
      ...provided,
      fontSize: "0.8rem",
      minWidth: "192px",
      marginBottom: "7px",
    }),
    option: (provided, state) => ({
      ...provided,
      fontSize: "0.7rem",
      textAlign: "left",
      position: "relative",
      top: "20px",
    }),
    menu: (provided, state) => ({
      ...provided,
      display: inputLength >= 2 ? "block" : "none",
    }),
  };

  return (
    <AsyncSelect
      styles={customStyles}
      menuPlacement={"bottom"}
      maxMenuHeight={"120px"}
      menuWidth={"300px"}
      cacheOptions
      loadOptions={loadOptions}
      onChange={handleChange}
      isClearable={true}
      getOptionLabel={(airport) =>
        `${airport.city}, ${airport.name} \u2768${airport.iata_code}\u2769 - ${airport.country}`
      }
      getOptionValue={(airport) => airport.iata_code}
      placeholder={`Ville de ${
        inputType === "departure" ? "départ" : "destination"
      } `}
      onInputChange={handleInputChange}
    />
  );
};

export default AirportsList;
