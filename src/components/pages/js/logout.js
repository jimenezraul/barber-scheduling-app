import Cookies from "js-cookie";
import { getCsrfToken, deleteCookies } from "../../MainApi/MainApi";

const URL = "http://localhost:8000";

export async function api_logout() {
    try {
        const res = await fetch(URL + "/auth/logout/", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "X-CSRFToken": await getCsrfToken(),
            },
            credentials: "include",
            mode: "cors",
        });

        console.log(res.ok)
        if (res.ok) {
            const data = await res.json();
            console.log(data)
            deleteCookies();
            console.log(data)
            return data;
        }
        const data = await res.json();
        console.log(data)
        return data;
    } catch (error) {
        return error;
    }
}