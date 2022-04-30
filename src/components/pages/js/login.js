import Cookies from "js-cookie";
import { getCsrfToken } from "../../MainApi/MainApi";

const URL = "http://localhost:8000";

export async function api_login(email, password) {
  try {
    const res = await fetch(URL + "/auth/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": await getCsrfToken(),
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    if (res.ok) {
      const data = await res.json();
      Cookies.set(
        "user",
        JSON.stringify({
          imageUrl: "",
          email: `${data.email}`,
          name: `${data.username}`,
          givenName: `${data.first_name}`,
          familyName: `${data.last_name}`,
          provider: "email",
        }),
        Cookies.set(
          "token",
          JSON.stringify({
            access: `${data.tokens.access}`,
            refresh: `${data.tokens.refresh}`,
          })
        )
      );
      console.log(data);
      return data;
    }
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}
