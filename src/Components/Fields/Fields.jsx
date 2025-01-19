import React,{useState} from "react";
import Generator from "./Generator";
import "./FieldsStyle.css";

export default function Fields({ formFields, checkValue }) {
  const [selectedDate, setSelectedDate] = useState(null);
  
  return (
    <div className="row">
      {formFields.map((field, index) => (
         <Generator key={index} formFields={field} checkValue={checkValue} />
      ))}
    </div>
  );
}
