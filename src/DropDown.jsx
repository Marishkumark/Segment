import React from "react";

const DropDown = ({ options, segment, addSegment, removeSegment }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="w-3 h-3 mr-2 bg-gray-400 rounded-full" />
      <select
        className="border border-gray-400 p-3 w-[85%] my-3"
        onChange={(e) => addSegment(e)}
      >
        {segment && <option value="">Add schema to segment</option>}
        {options &&
          options.map((opt, index) => (
            <option key={index} value={opt.value}>
              {opt.label}
            </option>
          ))}
      </select>
      <button
        onClick={() => {
          if (segment) {
            removeSegment("");
          } else {
            removeSegment(options[0].value);
          }
        }}
        className="flex justify-center w-10 h-10 m-auto ml-2 text-2xl bg-blue-100"
      >
        -
      </button>
    </div>
  );
};

export default DropDown;
