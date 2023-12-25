import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import fr from "date-fns/locale/fr";

const DateInputStay = () => {
  const [arriveDate, setArriveDate] = useState(new Date());
  const [departDate, setDepartDate] = useState(new Date());
  const [minDate, setMinDate] = useState(new Date());
  const [tomorrowMinDate, setTomorrowMinDate] = useState(new Date());

  useEffect(() => {
    const today = new Date();
    setArriveDate(today);
    setMinDate(today);

    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setDepartDate(tomorrow);
    setTomorrowMinDate(tomorrow);
  }, []);

  const handleArriveDateChange = (date) => {
    setArriveDate(date);
    if (departDate <= date) {
      let day = new Date(date);
      day.setDate(day.getDate() + 1);
      setDepartDate(day);
    }
  };

  const handleDepartDateChange = (date) => {
    setDepartDate(date);
    if (date <= arriveDate) {
      let day = new Date(date);
      day.setDate(day.getDate() - 1);
      setArriveDate(day);
    }
  };

  return (
    <div className="fieldsets">
      <fieldset>
        <legend>Date d'arrivée</legend>
        
        <DatePicker
          id="arrive_date"
          name="arrive_date"
          selected={arriveDate}
          onChange={handleArriveDateChange}
          minDate={minDate}
          dateFormat="dd/MM/yyyy"
          locale={fr}
        />
      </fieldset>
      <fieldset>
        <legend>Date de départ</legend>
        
        <DatePicker
          id="depart_date"
          name="depart_date"
          selected={departDate}
          onChange={handleDepartDateChange}
          minDate={tomorrowMinDate}
          dateFormat="dd/MM/yyyy"
          locale={fr}
        />
      </fieldset>
    </div>
  );
};

export default DateInputStay;
