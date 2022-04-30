import { refreshToken } from "../Setmore/Setmore";
import Cookies from "js-cookie";
// const mainURL = "https://thirsty-cray-67581c.netlify.app";
// const URL = "https://thebarberapi.herokuapp.com";
const mainURL = "http://localhost:3000";
const URL = "http://localhost:8000";

let _csrfToken = null;

export async function getCsrfToken() {
  if (_csrfToken === null) {
    const response = await fetch(`${URL}/csrf/`, {
      credentials: "include",
      mode: "cors",
    });
    const data = await response.json();
    _csrfToken = data.csrfToken;
  }
  return _csrfToken;
}

export const get_refresh_token = () => {
  if (Cookies.get("token")) {
    return JSON.parse(Cookies.get("token")).refresh;
  }
  return null;
};

const refresh_token = async () => {
  var myHeaders = new Headers();
  const csrt = await getCsrfToken();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Cookie", csrt);
  var refresh_link = "/auth/token/refresh/";
  const refresh = get_refresh_token();
  var response = await fetch(URL + refresh_link, {
    method: "POST",
    headers: myHeaders,
    mode: "cors",
    body: JSON.stringify({
      refresh: `${refresh}`,
    }),
  });
  response = await response;
  return response;
};

export async function get_api_key(token) {
  var link = "/setmore/";
  async function get_res(token_key) {
    var res = await fetch(URL + link, {
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${token_key}`,
      },
    });
    return res;
  }
  let res = await get_res(token);

  if (res.status >= 400) {
    var response = await refresh_token();

    if (response.status >= 400) {
      return null;
    }
    response = await response.json();
    res = await get_res(response.access);
    document.cookie = "access=" + response.access;
    return res;
  }
  return res;
}

export async function get_google_token(token) {
  try {
    var myHeaders = new Headers();
    const csrt = await getCsrfToken();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", csrt);
    const link = "/social_auth/google/";
    var raw = JSON.stringify({
      auth_token: token,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    let res = await fetch(URL + link, requestOptions);
    if (res.ok) {
      res = await res.json();
      document.cookie = "token=" + JSON.stringify(res.tokens);
      get_tokens();
      await refreshToken();
      return res;
    } else {
      res = await res.json();
      return res;
    }
  } catch (error) {
    console.log(error);
  }
}

//get the refresh token and access token from cookies
export const get_tokens = () => {
  if (document.cookie && document.cookie !== "") {
    let cookie = document.cookie;
    cookie = cookie.split("; ");
    cookie = cookie.filter((i) => i.startsWith("token="));
    if (cookie.length) {
      cookie = JSON.parse(
        cookie.filter((i) => i.startsWith("token="))[0].split("token=")[1]
      );
      const accessToken = cookie.access;
      const refreshToken = cookie.refresh;
      document.cookie = "access=" + accessToken;
      document.cookie = "refresh=" + refreshToken;
      return { refresh: refreshToken, access: accessToken };
    }
    return null;
  }
  return null;
};

export const get_access_token = () => {
  if (Cookies.get("token")) {
    return JSON.parse(Cookies.get("token")).access;
  }
  return null;
};

export const get_setmore_token = () => {
  if (document.cookie && document.cookie !== "") {
    let cookie = document.cookie;
    cookie = cookie.split("; ");
    cookie = cookie.filter((i) => i.startsWith("setmore="));
    if (cookie.length) {
      cookie = cookie[0].split("setmore=")[1];
      return cookie;
    }
    return null;
  }
  return null;
};

export function deleteCookies() {
  Cookies.remove("access");
  Cookies.remove("user");
  Cookies.remove("csrftoken");
  const cookies_list = ["token", "access", "refresh"];
  cookies_list.forEach((name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"`;
  });
}

export function request_reset_password(email) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    email: `${email}`,
    redirect_url: mainURL + "/reset_password",
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  return fetch(URL + "/auth/request-reset-email/", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      return result;
    })
    .catch((error) => console.log("error", error));
}

export function password_reset_complete(pass, token, uid) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    password: `${pass}`,
    token: `${token}`,
    uidb64: `${uid}`,
  });

  var requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  return fetch(URL + "/auth/password-reset-complete", requestOptions)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((error) => console.log("error", error));
}

export async function register_user(
  user_email,
  user_password,
  user_name,
  user_lastname
) {
  async function post_register(email, password, name, lastname) {
    var myHeaders = new Headers();
    const csrt = await getCsrfToken();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", csrt);
    const link = "/auth/register/";
    var raw = JSON.stringify({
      email: email,
      password: password,
      first_name: name,
      last_name: lastname,
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    let res = await fetch(URL + link, requestOptions);
    return res;
  }

  let res = await post_register(
    user_email,
    user_password,
    user_name,
    user_lastname
  );

  return res;
}

export async function email_verify(token) {
  async function verify(t) {
    var myHeaders = new Headers();
    const csrt = await getCsrfToken();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", csrt);
    const link = "/auth/email-verify/";
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    let res = await fetch(URL + link + "?token=" + t, requestOptions);
    return res;
  }

  let res = await verify(token);

  return res;
}
