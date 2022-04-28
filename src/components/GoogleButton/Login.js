import React from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { setCurrentUser } from "../../redux/index.js";
import Cookies from "js-cookie";
import {
  get_access_token,
  get_google_token,
  get_refresh_token,
  api_logout,
} from "../MainApi/MainApi.js";

const clientId =
  "759091763684-s8i5j4sq4fr84mqneo6vaq7de4sdu7hd.apps.googleusercontent.com";

function GLogin() {
  const dispatch = useDispatch();
  const { login, logout } = bindActionCreators(setCurrentUser, dispatch);
  const user = useSelector((state) => state.user);
  const provider = user.provider;
  const authUser = user.isAuthUser;
  const onSignoutSuccess = async () => {
    const r_token = get_refresh_token();
    const a_token = get_access_token();
    await api_logout(r_token, a_token);
    logout();
  };

  const onLoginSuccess = async (res) => {
    await get_google_token(res.tokenObj.id_token);
    const g_user = { ...res.profileObj, provider: "google" };
    
    Cookies.set("user", decodeURI(JSON.stringify({
      imageUrl: `${res.profileObj.imageUrl}`,
      email: `${res.profileObj.email}`,
      name: `${res.profileObj.name}`,
      givenName: `${res.profileObj.givenName}`,
      familyName: `${res.profileObj.familyName}`,
      provider: "google",
    })));
    login(g_user);
  };

  const onLoginFailure = (res) => {
    console.log("Login Failed:", res);
  };

  return (
    <div>
      {provider === "google" || provider === "" ? (
        <div>
          {!!authUser ? (
            <GoogleLogout
              clientId={clientId}
              buttonText="logout"
              onLogoutSuccess={onSignoutSuccess}
              theme={localStorage.theme}
            ></GoogleLogout>
          ) : (
            <GoogleLogin
              clientId={clientId}
              buttonText="Login"
              onSuccess={onLoginSuccess}
              onFailure={onLoginFailure}
              cookiePolicy={"single_host_origin"}
              autoLoad={false}
              theme={localStorage.theme}
            />
          )}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
export default GLogin;
