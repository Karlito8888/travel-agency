import React, { useState, useEffect } from "react";
import { Button, InputNumber } from "antd";
import { DownOutlined } from "@ant-design/icons";

function PassengerSelector() {
  const [isPassengerSelectorVisible, setPassengerSelectorVisible] =
    useState(false);

  const togglePassengerSelector = (e) => {
    e.preventDefault();
    setPassengerSelectorVisible(!isPassengerSelectorVisible);
  };

  const [counts, setCounts] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  });

  useEffect(() => {
    localStorage.setItem("numAdults", counts.adults.toString());
    localStorage.setItem("numChildren", counts.children.toString());
    localStorage.setItem("numInfants", counts.infants.toString());
  }, [counts]);

  useEffect(() => {
    const storedNumAdults = localStorage.getItem("numAdults");
    if (storedNumAdults) {
      setCounts((prevCounts) => ({
        ...prevCounts,
        adults: parseInt(storedNumAdults, 10),
      }));
    }
  }, []);

  const totalPassengers = counts.adults + counts.children + counts.infants;

  const passengerLabels = {
    adults: "Adulte",
    children: "Enfant",
    infants: "Bébé",
  };

  const handleCountChange = (type, value) => {
    setCounts((prevCounts) => ({ ...prevCounts, [type]: value }));
  }

  return (
    <>
      <Button
        size="large"
        id="toggle-passenger-selector"
        onClick={(e) => togglePassengerSelector(e)}
      >
        {`${totalPassengers} voyageur${totalPassengers !== 1 ? "s" : ""}`}&nbsp;
        <DownOutlined />
      </Button>
      {isPassengerSelectorVisible && (
        <div id="passenger-selector">
          {Object.entries(counts).map(([type, count]) => (
            <InputNumber
              key={type}
              addonBefore={`${passengerLabels[type]}${count > 1 ? "s" : ""}`}
              size="small"
              min={0}
              max={10}
              defaultValue={type === "adults" ? 1 : 0}
              onChange={(value) => {
                if (value !== null) {
                  handleCountChange(type, value);
                }
              }}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default PassengerSelector;
