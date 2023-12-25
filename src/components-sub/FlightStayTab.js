import React, { useState } from "react";
import ClassSelector from "./ClassSelector";
import FlightComponent from "./FlightComponent";
import PassengerSelector from "./PassengerSelector";
import AddFlightButton from "./AddFlightButton";
import SubmitButton from "./SubmitButton";

function FlightStayTab({ activeTab }) {
  return (
    <div id="volsejour" className="tab-content">
      <h3>Organisez votre séjour</h3>
      <form id="flight-stay-form">
        <ClassSelector />
        <div className="flights" id="flight-stay-container">
          <FlightComponent activeTab={activeTab} />
        </div>
        <PassengerSelector />
        <SubmitButton />
      </form>
    </div>
  );
}

export default FlightStayTab;
