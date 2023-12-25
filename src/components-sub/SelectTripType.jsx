import React, { useEffect } from "react";
import { useController, useForm } from "react-hook-form";
import Select from "react-select";

const SelectTripType = ({ selectedTripType, setTripType, defaultOption }) => {
  const { register, control } = useForm();
  // const selectRef = useRef();

  const { field } = useController({ name: "tripType", control });

  const tripTypes = [
    { value: "aller-retour", label: "Aller - Retour" },
    { value: "aller-simple", label: "Aller - Simple" },
    { value: "multi-destinations", label: "Multi - Destinations" },
  ];

  useEffect(() => {
    const storedTripType = localStorage.getItem("selectedTripType");
    if (!storedTripType || !tripTypes.some((trip) => trip.value === storedTripType)) {
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
    <div className="select-group">
      <Select
        value={tripTypes.find(({ value }) => value === selectedTripType)}
        onChange={handleSelectChange}
        options={[defaultOption, ...tripTypes.map((trip) => ({
          value: trip.value,
          label: trip.label,
        }))]}
      />
    </div>
  );
};

export default SelectTripType;