import React, {  useEffect } from "react";
import { Select } from "antd";

const { Option } = Select;

const SelectTripType = ({ selectedTripType, setTripType }) => {
  const tripTypes = ["aller-retour", "aller-simple", "multi-destinations"];

  function capFL(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  useEffect(() => {
    const storedTripType = localStorage.getItem("selectedTripType");
    if (!storedTripType || !tripTypes.includes(storedTripType)) {
      localStorage.setItem("selectedTripType", "aller-retour");
      setTripType("aller-retour");
    } else {
       setTripType(storedTripType);
    }
  }, [setTripType, tripTypes]);

  const handleTripTypeChange = (value) => {
    setTripType(value);
    localStorage.setItem("selectedTripType", value);

  }

  return (
    <div className="select-group">
      <label htmlFor="tripType"></label>
      <Select
        id="tripType"
        defaultValue={selectedTripType}
        // onChange={(value) => setTripType(value)}
        onChange={handleTripTypeChange}
        dropdownRender={(menu) => <div>{menu}</div>}
      >
        {tripTypes.map((trip) => (
          <Option key={trip} value={trip}>
            {capFL(trip)}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default SelectTripType;
