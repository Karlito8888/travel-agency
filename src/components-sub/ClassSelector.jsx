import React, { useEffect } from "react";
import Select from "react-select";

const ClassSelector = ({ setSelectedClass, defaultOption, label }) => {
  const classes = [
    { value: "économique", label: "Classe Economique" },
    { value: "business", label: "Classe Business" },
    { value: "première", label: "Classe Première" },
  ];

  function capFL(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  useEffect(() => {
    const storedClass = localStorage.getItem("selectedClass");
    if (!storedClass || !classes.includes(storedClass)) {
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
  return (
    <div className="select-class" style={{ position: "relative" }}>
      <label
        style={{
          position: "absolute",
          top: "-12px",
          left: "10px",
          fontSize: "0.8rem",
          padding: "3px 10px",
          color: "#777",
          zIndex: "2",
          backgroundColor: "#eee",
          borderRadius: "10px",
        }}
      >
        {label}
      </label>
      <Select
        defaultValue={defaultOption}
        options={classes}
        onChange={handleClassChange}
      />
    </div>
  );
};

export default ClassSelector;
