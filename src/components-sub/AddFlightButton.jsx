import React from "react";

const AddFlightButton = ({ onClick }) => {
  const handleClick = (e) => {
    e.preventDefault();
    onClick()
     
  };


  return (
    <button id="add-flight-button" onClick={handleClick}>
      + Ajouter un vol
    </button>
  );
}

export default AddFlightButton;
