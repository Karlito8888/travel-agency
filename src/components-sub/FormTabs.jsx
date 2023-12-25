import React, { useState } from "react";
import FlightTab from "./FlightTab";
import StayTab from "./StayTab";
import FlightStayTab from "./FlightStayTab";
import CarTab from "./CarTab";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faPlane, faCarSide } from "@fortawesome/free-solid-svg-icons";

function FormTabs() {
  const [activeTab, setActiveTab] = useState("vol");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="tabs">
      <div className="tab-buttons">
        <div
          className={`tab-icon ${activeTab === "vol" ? "active" : ""}`}
          onClick={() => handleTabClick("vol")}
        >
          <FontAwesomeIcon icon={faPlane} />
        </div>

        <div
          className={`tab-icon ${activeTab === "sejour" ? "active" : ""}`}
          onClick={() => handleTabClick("sejour")}
        >
          <FontAwesomeIcon icon={faBed} />
        </div>

        <div
          className={`tab-icon ${activeTab === "volsejour" ? "active" : ""}`}
          onClick={() => handleTabClick("volsejour")}
        >
          <FontAwesomeIcon icon={faPlane} /> +
          <FontAwesomeIcon icon={faBed} />
        </div>

        <div
          className={`tab-icon ${activeTab === "voiture" ? "active" : ""}`}
          onClick={() => handleTabClick("voiture")}
        >
          <FontAwesomeIcon icon={faCarSide} />
        </div>
      </div>

      {activeTab === "vol" && <FlightTab activeTab={activeTab} />}
      {activeTab === "sejour" && <StayTab activeTab={activeTab} />}
      {activeTab === "volsejour" && <FlightStayTab activeTab={activeTab} />}
      {activeTab === "voiture" && <CarTab activeTab={activeTab} />}
    </div>
  );
}

export default FormTabs;
