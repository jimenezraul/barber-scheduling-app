import { get_access_token, get_api_key } from "../MainApi/MainApi";

function getToken() {
  const serverToken = get_access_token();
  return serverToken;
}

const URL = "https://developer.setmore.com";

export async function refreshToken() {
  try {
    const serverToken = getToken();
    let setmoreToken = await get_api_key(serverToken);
    if (setmoreToken === null) {
      return null;
    }
    setmoreToken = await setmoreToken.json();
    setmoreToken = setmoreToken.results[0].key;
    // const setmoreToken = process.env.REACT_APP_SETMORE_TOKEN
    var link = "/api/v2/o/oauth2/token?refreshToken=" + setmoreToken;
    var res = await fetch(URL + link, {
      method: "GET",
    });
    res = await res.json();
    let new_token = res.data.token.access_token;
    document.cookie = "setmore=" + new_token;
    return new_token;
  } catch (error) {
    console.log(error);
  }
}

export async function getServices(token) {
  var link = "/api/v2/bookingapi/services";
  var res = await fetch(URL + link, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (res.ok) {
    token = await refreshToken();
    res = await fetch(URL + link, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    res = await res.json();
  } else {
    res = await res.json();
  }
  return res;
}

export async function getStaff(token) {
  var link = "/api/v1/bookingapi/staffs";
  var res = await fetch(URL + link, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (res.status >= 400) {
    token = await refreshToken();
    res = await fetch(URL + link, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    res = await res.json();
  } else {
    res = await res.json();
  }
  return res;
}

export async function getCategory(token) {
  var link = "/api/v1/bookingapi/services/categories";
  var res = await fetch(URL + link, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status >= 400) {
    token = await refreshToken();
    res = await fetch(URL + link, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    res = await res.json();
  } else {
    res = await res.json();
  }
  return res;
}

export async function createCustomer(token, firstName, lastName, email, image) {
  const params = JSON.stringify({
    first_name: `${firstName}`,
    last_name: `${lastName}`,
    email_id: `${email}`,
    image_url: `${image}`,
  });
  var link = "/api/v2/bookingapi/customer/create";
  var res = await fetch(URL + link, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: params,
  });

  if (res.status >= 400) {
    token = await refreshToken();
    res = await fetch(URL + link, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: params,
    });
    res = await res.json();
  } else {
    res = await res.json();
  }
  return res;
}

export async function getCustomer(token, user) {
  var link = `/api/v2/bookingapi/customer?firstname=${user.givenName}&email=${user.email}`;
  var res = await fetch(URL + link, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (res.status >= 400) {
    token = await refreshToken();
    res = await fetch(URL + link, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status >= 400) {
      return null;
    }
    res = await res.json();
  } else {
    res = await res.json();
  }

  let customer = [];
  if (JSON.stringify(res.data) !== JSON.stringify({})) {
    customer = res.data.customer.filter((cus) => cus.email_id === user.email);
  }

  if (!customer.length) {
    const new_customer = await createCustomer(
      token,
      user.givenName,
      user.familyName,
      user.email,
      user.imageUrl
    );
    return new_customer.data.customer;
  } else {
    customer = customer[0];
    return customer;
  }
}

export async function getDatesAvailable(token, service, staff, date) {
  var link = "/api/v2/bookingapi/appointments/slots";
  const params = JSON.stringify({
    staff_key: `${staff}`,
    service_key: `${service}`,
    selected_date: `${date}`,
    slot_limit: 30,
  });

  var res = await fetch(URL + link, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: params,
  });
  if (res.status >= 400) {
    token = await refreshToken();
    res = await fetch(URL + link, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: params,
    });
    res = await res.json();
  } else {
    res = await res.json();
  }
  return res;
}

export async function createAppointment(
  token,
  staff_key,
  service_key,
  customer_key,
  start_time,
  end_time,
  cost
) {
  var link = "/api/v2/bookingapi/appointment/create";
  const params = JSON.stringify({
    staff_key: `${staff_key}`,
    service_key: `${service_key}`,
    customer_key: `${customer_key}`,
    start_time: `${start_time}`,
    end_time: `${end_time}`,
    cost: `${cost}`,
  });

  var res = await fetch(URL + link, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: params,
  });

  if (res.status === 401) {
    token = await refreshToken();
    res = await fetch(URL + link, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: params,
    });
    const response = await res.json();
    res = { ...response, ...res };
  } else {
    let title,
      description,
      btn_name,
      btn = "";

    if (res.status === 200) {
      title = "Thank You!";
      description =
        "You can View, Edit or Cancel your Appointment on the Profile section.";
      btn_name = "Profile";
      btn = "/profile";
    } else {
      title = "Something went wrong!";
      description = "Sorry, someone booked that slot already.";
      btn_name = "Go Back";
      btn = "/appointments";
    }
    const response = await res.json();
    res = {
      ...response,
      ...res,
      title: title,
      description: description,
      btn_name: btn_name,
      btn: btn,
    };
  }
  return res;
}

export async function getAppointments(token, start_time, end_time) {
  var link = `/api/v1/bookingapi/appointments?startDate=${start_time}&endDate=${end_time}&customerDetails=true`;

  var res = await fetch(URL + link, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (res.status >= 400) {
    token = await refreshToken();
    res = await fetch(URL + link, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    res = await res.json();
  } else {
    res = await res.json();
  }
  return res;
}

export async function deleteAppointment(token, appointmentKey) {
  var link = `/api/v2/bookingapi/appointments/${appointmentKey}`;
  const params = JSON.stringify({
    cost: 100,
    label: "Test Label",
  });
  var res = await fetch(URL + link, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: params,
  });
  if (res.status >= 400) {
    token = await refreshToken();
    res = await fetch(URL + link, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: params,
    });
    res = await res.json();
  } else {
    res = await res.json();
  }
  return res;
}

export async function AppointmentUpdate(token, service, start_time, end_time) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  var LINK = `/api/v2/bookingapi/appointments/${service.key}`;
  var params = JSON.stringify({
    staff_key: `${service.staff_key}`,
    service_key: `${service.service_key}`,
    customer_key: `${service.customer_key}`,
    start_time: `${start_time}`,
    end_time: `${end_time}`,
    cost: `${service.cost}`,
  });

  var res = await fetch(URL + LINK, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: params,
  });

  if (res.status >= 400) {
    token = await refreshToken();
    res = await fetch(URL + LINK, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: params,
    });
    res = await res.json();
  } else {
    res = await res.json();
  }
  return res;
}
