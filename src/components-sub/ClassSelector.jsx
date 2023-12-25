import React, { useEffect } from "react";
import { Select } from "antd";

const { Option } = Select;

const ClassSelector = ({ selectedClass, setSelectedClass }) => {
  const classes = ["économique", "affaires", "première"];

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

  const handleClassChange = (value) => {
    setSelectedClass(value);
    localStorage.setItem("selectedClass", value);
  }
  return (
    <div className="select-group select-class">
      <label htmlFor="classe"></label>
      <Select
        id="classe"
        value={selectedClass}
        onChange={handleClassChange}
        dropdownRender={(menu) => (
          <div>
            {menu}
          </div>
        )}
      >
        {classes.map((classe) => (
          <Option key={classe} value={classe}>
            Classe&nbsp;{capFL(classe)}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default ClassSelector;
