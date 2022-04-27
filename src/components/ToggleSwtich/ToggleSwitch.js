import React from "react";
import "./ToogleSwitch.css";

const ToogleSwitch = function (props) {
  return (
    <div className="flex space-x-2.5 justify-center">
      <span className="items-center dark:text-gray-100 transition duration-500 ease-in-out">
        {props.status ? (
          <i className="bi bi-sun-fill"></i>
        ) : (
          <i className="bi bi-moon-fill"></i>
        )}{" "}
      </span>
      <div className="checked:bg-blue-600 relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
        <input
          checked={props.status}
          onChange={props.toggleState}
          type="checkbox"
          onClick={props.toggle}
          name="toggle"
          id="toggle"
          className="toggle-checkbox absolute block w-6 h-6 border border-gray-300 rounded-full bg-gray-100 appearance-none cursor-pointer"
        />
        <label
          htmlFor="toggle"
          className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-500 dark:bg-blue-500 cursor-pointer"
        ></label>
      </div>
    </div>
  );
};

export default ToogleSwitch;
