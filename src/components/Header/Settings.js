import React from "react";
import "./header.css";
import ToogleSwitch from "../ToggleSwtich/ToggleSwitch.jsx";
import Theme from "./Theme";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { darkMode } from "../../redux/index";
import CustomButton from "../customButton/customButton";

function Settings() {
  const current_user = useSelector((state) => state.user).currentUser;
  const authUser = useSelector((state) => state.user).isAuthUser;

  const status = useSelector((state) => state.toggle);
  const dispatch = useDispatch();
  const { darkOn, darkOff } = bindActionCreators(darkMode, dispatch);

  const toggleState = function () {
    if (status) {
      darkOff(false);
    } else {
      darkOn(true);
    }
  };

  if (status) {
    document.documentElement.classList.add("dark");
    localStorage.theme = "dark";
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.theme = "light";
  }

  return (
    <div>
      <div className="z-20 relative flex items-center mr-2">
        <i
          id="gear"
          className="mr-5 bi bi-gear-fill cursor-pointer text-2xl"
        ></i>
        <div
          id="settings"
          className="hidden space-y-3 top-11 right-2 absolute w-30 bg-gray-100 dark:bg-gray-800 shadow-lg border-2 border-gray-300 dark:border-gray-700 rounded-lg"
        >
          <i className="text-1xl absolute -top-4 right-4 text-gray-300 dark:text-gray-700 bi bi-caret-up-fill"></i>
          {!!authUser ? (
            <div className="flex flex-col space-y-3 py-5 text-center">
              {current_user.provider === "email" ? (
                <i className="text-4xl bi bi-person-circle"></i>
              ) : (
                <img
                  className="mx-auto w-11 rounded-full border-2 border-white shadow"
                  src={current_user.imageUrl}
                  alt=""
                />
              )}
              <p className="font-bold">{current_user.givenName}</p>
              <a
                href="/Profile"
                className="mx-auto px-7 py-3 rounded border-2 border-gray-400 hover:text-gray-100 hover:bg-gray-400 dark:hover:bg-gray-500 dark:border-gray-500 font-bold"
              >
                View Profile
              </a>
              <div className="pt-5">
                <CustomButton name="Logout" />
              </div>
            </div>
          ) : (
            <div>
              <i className="mt-5 py-5 flex justify-center text-4xl bi bi-person-circle"></i>
              <div className="flex justify-center px-3 items-center">
                <a
                  className="shadow bg-blue-500 hover:bg-blue-600 text-gray-100 font-bold py-2 px-4 rounded"
                  href="/login"
                >
                  Login
                </a>
              </div>
            </div>
          )}
          <div className="border-t border-gray-300 dark:border-gray-700  py-5 px-20 rounded-b-lg">
            <ToogleSwitch
              status={status}
              toggleState={() => toggleState()}
              toggle={Theme.ToggleCheck}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
