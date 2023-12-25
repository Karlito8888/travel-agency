import React from "react";
import { Button } from "antd";

const SubmitButton = ({ onClick }) => {

//   const handleClick = (e) => {
//     e.preventDefault();
// }
  return (
    <Button
      id="submit"
      type="submit"
      onClick={onClick}
      // onSubmit={onSubmit}
    >
      Réserver
    </Button>
  );
}

export default SubmitButton;
