import React from 'react';
import FormTabs from '../components-sub/FormTabs';

const Form = () => {
 const handleSave = (values) => {
   console.log({ values });
 };

  return (
    <div className="trip-formulaire">
      <FormTabs onSave={handleSave} />
    </div>
  );
};

export default Form;