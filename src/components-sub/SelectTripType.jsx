import React, { useEffect } from "react";
import Select from "react-select";

const SelectTripType = ({ setTripType, defaultOption, label }) => {
  const tripTypes = [
    { value: "aller-retour", label: "Aller - Retour" },
    { value: "aller-simple", label: "Aller - Simple" },
    { value: "multi-destinations", label: "Multi - Destinations" },
  ];

  useEffect(() => {
    const storedTripType = localStorage.getItem("selectedTripType");
    if (
      !storedTripType ||
      !tripTypes.some((trip) => trip.value === storedTripType)
    ) {
      localStorage.setItem("selectedTripType", "aller-retour");
      setTripType("aller-retour");
    } else {
      setTripType(storedTripType);
    }
  }, [setTripType, tripTypes]);

  const handleSelectChange = (option) => {
    setTripType(option.value);
    localStorage.setItem("selectedTripType", option.value);
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
      fontSize: "0.8rem",
      textAlign: "left",
    }),
  };

  return (
    <div className="select-flight">
      <Select
        styles={customStyles}
        defaultValue={defaultOption}
        onChange={handleSelectChange}
        options={tripTypes}
      />
    </div>
  );
};

export default SelectTripType;
