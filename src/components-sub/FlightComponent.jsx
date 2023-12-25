import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import fr from "date-fns/locale/fr";
import AirportsList from "./AirportsList";

const FlightComponent = ({ flightNumber, tripType, activeTab }) => {
  const [departureDate, setDepartureDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
  const [minDate, setMinDate] = useState(new Date());
  const [tomorrowMinDate, setTomorrowMinDate] = useState(new Date());

  useEffect(() => {
    const today = new Date();
    setDepartureDate(today);
    setMinDate(today);

    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setReturnDate(tomorrow);
    setTomorrowMinDate(tomorrow);

     localStorage.setItem(`departureDate${flightNumber}`, today.toISOString());
      localStorage.setItem(`returnDate${flightNumber}`, tomorrow.toISOString());
    
  }, []);

  // useEffect(() => {
  //   const departureCity = localStorage.getItem(`departureCity${flightNumber}`);
  //   const departureName = localStorage.getItem(`departureName${flightNumber}`);
  //   const departureIataCode = localStorage.getItem(
  //     `departureIataCode${flightNumber}`
  //   );

  //   const destinationCity = localStorage.getItem(
  //     `destinationCity${flightNumber}`
  //   );
  //   const destinationName = localStorage.getItem(
  //     `destinationName${flightNumber}`
  //   );
  //   const destinationIataCode = localStorage.getItem(
  //     `destinationIataCode${flightNumber}`
  //   );
  // }, [flightNumber])

  useEffect(() => {
    const storedDepartureDate = localStorage.getItem(
      `departureDate${flightNumber}`
    );
    if (storedDepartureDate) {
      setDepartureDate(new Date(storedDepartureDate));
    }

    const storedReturnDate = localStorage.getItem(`returnDate${flightNumber}`);
    if (storedReturnDate) {
      setReturnDate(new Date(storedReturnDate));
    }
  }, [flightNumber]);

  const handleDepartureDateChange = (date) => {
    setDepartureDate(date);
    localStorage.setItem(`departureDate${flightNumber}`, date.toISOString());
    if (returnDate <= date) {
      let day = new Date(date);
      day.setDate(day.getDate() + 1);
      setReturnDate(day);
      localStorage.setItem(`returnDate${flightNumber}`, day.toISOString());
    }
  };

  const handleReturnDateChange = (date) => {
    setReturnDate(date);
    localStorage.setItem(`returnDate${flightNumber}`, date.toISOString());
    if (date <= departureDate) {
      let day = new Date(date);
      day.setDate(day.getDate() - 1);
      setDepartureDate(day);
      localStorage.setItem(`departureDate${flightNumber}`, day.toISOString());
    }
  };

  return (
    <div className={`flight${flightNumber}`} value={`flight${flightNumber}`}>
      <span
        className="numvol"
        id={`vol${flightNumber}`}
        style={{
          display: tripType !== "multi-destinations" ? "none" : "inline",
        }}
      >
        Vol {flightNumber} :
      </span>

      <div className="input-group">
        <div className="input-departure-city">
          <label htmlFor={`departure-city-${flightNumber}`}></label>
          <AirportsList
            flightNumber={flightNumber}
            inputType="departure"
          />
        </div>

        <div className="input-destination-city">
          <label htmlFor={`destination-city-${flightNumber}`}></label>
          <AirportsList
            flightNumber={flightNumber}
            inputType="destination"
          />
        </div>
      </div>

      <div className="fieldsets">
        <fieldset>
          <legend>Date de départ</legend>

          <DatePicker
            id={`departure_date_${flightNumber}`}
            name={`departure_date_${flightNumber}`}
            selected={departureDate}
            onChange={handleDepartureDateChange}
            minDate={minDate}
            dateFormat="dd/MM/yyyy"
            locale={fr}
          />
        </fieldset>

        {(activeTab === "volsejour" || tripType === "aller-retour") && (
          <fieldset>
            <legend>Date de retour</legend>

            <DatePicker
              id={`return_date_${flightNumber}`}
              name={`return_date_${flightNumber}`}
              selected={returnDate}
              onChange={handleReturnDateChange}
              minDate={tomorrowMinDate}
              dateFormat="dd/MM/yyyy"
              locale={fr}
            />
          </fieldset>
        )}
      </div>
    </div>
  );
};

export default FlightComponent;