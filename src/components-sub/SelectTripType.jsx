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

  return (
    <div className="select-flight" style={{ position: "relative" }}>
      <label
        style={{
          position: "absolute",
          top: "-12px",
          left: "10px",
          fontSize: "0.8rem",
          padding: "3px 10px",
          color: "#777",
          zIndex: "2",
          backgroundColor: "#eee",
          borderRadius: "10px",
        }}
      >
        {label}
      </label>
      <Select
        defaultValue={defaultOption}
        onChange={handleSelectChange}
        options={tripTypes}
      />
      
    </div>
  );
};

export default SelectTripType;
