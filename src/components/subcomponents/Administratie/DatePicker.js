import React from "react";
import RangeSelector from "./RangeSelector.js";
import "react-day-picker/lib/style.css";
import "../CSS/Default.css";

export default function DatePicker() {
  return (
    <div className="DefaultCardLayer2">
      <RangeSelector></RangeSelector>
    </div>
  );
}
