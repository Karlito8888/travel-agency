import React, { useState, useRef } from "react";
import SelectTripType from "./SelectTripType";
import ClassSelector from "./ClassSelector";
import FlightComponent from "./FlightComponent";
import PassengerSelector from "./PassengerSelector";
import AddFlightButton from "./AddFlightButton";
import SubmitButton from "./SubmitButton";
import Swal from "sweetalert2";
import { FormProvider, useForm, useController } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { string, z } from "zod";

const FlightTab = ({ onSave }) => {
  const { handleSubmit, formState } =
    useForm();
    // {
    // resolver: zodResolver(schema),
    // }

  const handleSave = (formValues) => {
    onSave(formValues);
  };

  const { errors } = formState;

  const [tripType, setTripType] = useState("aller-retour");
  const [numFlights, setNumFlights] = useState(2);
  const [selectClass, setSelectClass] = useState("économique");
  const [formValid, setFormValid] = useState(true);
  const [success, setSuccess] = useState(false);

  const methods = useForm();

  const onSubmit = methods.handleSubmit((data) => {
    // fonction personnalisée qui utilise methods pour gérer la soumission du formulaire
    console.log(data);
    methods.reset();
    setSuccess(true);
  });

  const handleAddFlight = () => {
    const Alert = () => {
      Swal.fire({
        title: "Un voyage sur-mesure ?",
        text: "N'hésitez pas à contacter votre agence directement.",
        // icon: "warning",
        confirmButtonColor: "#ff7a00",
      });
    };
    if (numFlights < 3) {
      setNumFlights(numFlights + 1);
    } else {
      Alert();
    }
  };

  const getAllLocalStorageData = () => {
    const allData = {};
    const keys = [
      // Ajoutez ici toutes les clés que vous utilisez
      "selectedTripType",
      "selectedClass",
      "departureDate1",
      "returnDate1",
      "numAdults",
      "numChildren",
      "numInfants",
      "departureCity1",
      "departureCity2",
      "departureCity3",
      "departureIataCode1",
      "departureIataCode2",
      "departureIataCode3",
      "departureCountry1",
      "departureCountry2",
      "departureCountry3",
      "destinationCity1",
      "destinationCity2",
      "destinationCity3",
      "destinationIataCode1",
      "destinationIataCode2",
      "destinationIataCode3",
      "destinationCountry1",
      "destinationCountry2",
      "destinationCountry3",
      // ... autres clés
    ];

    keys.forEach((key) => {
      const value = localStorage.getItem(key);
      allData[key] = value;
      // console.log(`key: ${key}, value: ${value}`);
    });
    return allData;
  };

  // const validateForm = () => {
  //   const requiredFields = ["departureCity1", "destinationCity1"];

  //   const isValid = requiredFields.every((field) => {
  //     const value = localStorage.getItem(field);
  //     return value && value.trim() !== "";
  //   });

  //   setFormValid(isValid);
  //   // console.log();

  //   if (!isValid) {
  //     Swal.fire({
  //       // title: "Champs requis",
  //       text: "Veuillez remplir tous les champs obligatoires",
  //       // icon: "warning",
  //       confirmButtonColor: "#ff7a00",
  //     });
  //   }
  // };

  // const handleClick = (e) => {
  //   e.preventDefault();
  //   validateForm();
  //   if (formValid) {
  //     const formData = getAllLocalStorageData();
  //     console.log("Récapitulatif des données :", formData);
  //   } else {
  //     console.log("ERREUR !!!");
  //   }
  // };

  return (
    <div className="tab-content" id="vol">
      <h3>Réservez votre vol</h3>
      <FormProvider {...methods}>
        <form
          id="flight-form"
          onSubmit={handleSubmit(handleSave)}
          autoComplete="off"
        >
          <div className="select-group-one">
            <SelectTripType
              selectedTripType={tripType}
              setTripType={setTripType}
              defaultOption={{ value: "aller-retour", label: "Aller - Retour" }}
              label="Choisissez le type de vol"
            />

            <ClassSelector
              selectedClass={selectClass}
              setSelectedClass={setSelectClass}
              defaultOption={{
                value: "économique",
                label: "Classe Economique",
              }}
              label="Choisissez votre classe"
            />
          </div>
          <div className="flights" id="flight-container">
            {tripType !== "multi-destinations" && (
              <FlightComponent flightNumber={1} tripType={tripType} />
            )}
            {tripType === "multi-destinations" &&
              Array.from({ length: numFlights }).map((_, index) => (
                <React.Fragment key={index + 1}>
                  <FlightComponent
                    flightNumber={index + 1}
                    tripType={tripType}
                  />
                </React.Fragment>
              ))}
          </div>

          <PassengerSelector />
          {tripType === "multi-destinations" && (
            <AddFlightButton onClick={handleAddFlight} />
          )}
          <SubmitButton onClick={onSubmit} />
        </form>
      </FormProvider>
    </div>
  );
};

export default FlightTab;
