import React, { useEffect } from "react";
import Select from "react-select";

const ClassSelector = ({ setSelectedClass, defaultOption, label }) => {
  const classes = [
    { value: "économique", label: "Classe Economique" },
    { value: "business", label: "Classe Business" },
    { value: "première", label: "Classe Première" },
  ];

  // function capFL(string) {
  //   return string.charAt(0).toUpperCase() + string.slice(1);
  // }

  useEffect(() => {
    const storedClass = localStorage.getItem("selectedClass");
    const classValues = classes.map((classObj) => classObj.value);

    if (!storedClass || !classValues.includes(storedClass)) {
      localStorage.setItem("selectedClass", "économique");
      setSelectedClass("économique");
    } else {
      setSelectedClass(storedClass);
    }
  }, [setSelectedClass, classes]);

  const handleClassChange = (option) => {
    setSelectedClass(option.value);
    localStorage.setItem("selectedClass", option.value);
  };

  const customStyles = {
    control: (provided, state) => ({
      // provided conserve les styles de bases tout en ajoutant ou modifiant ceux qu'on souhaite personnaliser.
      // state permet de conditionner les styles en fonction de l'état de l'élément... state.isFocused, etc...
      ...provided,
      fontSize: "0.8rem",
      minWidth: "192px",
    }),
    option: (provided, state) => ({
      ...provided,
      fontSize: "0.8rem",
      textAlign: "left",
    }),
  };

  return (
    <div className="select-class">
      <Select
        styles={customStyles}
        defaultValue={defaultOption}
        options={classes}
        onChange={handleClassChange}
      />
    </div>
  );
};

export default ClassSelector;
