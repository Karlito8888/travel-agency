import React from 'react';
import DateInputStay from './DateInputStay';
// import CityList from './CityList';

const CarTab = () => {
  return (
    <div id="voiture" className="tab-content">
      <h3>Réservez votre véhicule</h3>
      <form id="car-form">
        <React.Fragment>
          {/* <CityList /> */}
          <DateInputStay />
        </React.Fragment>
        <button type="submit">Rechercher</button>
      </form>
    </div>
  );
};

export default CarTab;