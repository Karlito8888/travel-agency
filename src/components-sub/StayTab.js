import React, { useState } from "react";
import DateInputStay from "./DateInputStay";
import CityList from "./CityList";

const StayTab = () => {

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div id="sejour" className="tab-content">
      <h3>Réservez votre hôtel</h3>
      <form id="sejour-form" onSubmit={handleFormSubmit}>
        <React.Fragment>
          <div className="input-group input-hotel-destination">
            <CityList />
          </div>
          <DateInputStay />
        </React.Fragment>
        <button type="submit">Rechercher</button>
      </form>
    </div>
  );
};

export default StayTab;
