import React from "react";
import {
  get_access_token,
  get_refresh_token
} from "../MainApi/MainApi";
import { api_logout } from '../pages/js/logout'
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { setCurrentUser } from "../../redux/index.js";

export default function CustomButton(props) {
  const dispatch = useDispatch();
  const { logout } = bindActionCreators(setCurrentUser, dispatch);

  const user_logout = async () => {
    const r_token = get_refresh_token();
    const a_token = get_access_token();
    await api_logout(r_token, a_token);
    logout();
  };
  return (
    <div>
      <button
        onClick={user_logout}
        className="text-gray-100 shadow px-7 py-2 rounded bg-blue-500 hover:bg-blue-600"
      >
        {props.name}
      </button>
    </div>
  );
}
