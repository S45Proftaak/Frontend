async function sendToServer(link, token, type, data) {
  // When GET request
  let response;
  if (type === requestTypes.GET) {
    console.log("[HttpHelper] Executing GET request!");
    var url = new URL(link);
    url.search = new URLSearchParams(data).toString();
    response = await fetch(url.href, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
  }

  // When POST, PUT OR DELETE
  else {
    console.log("Executing " + type + " request with data:");
    console.log(data);
    response = await fetch(link, {
      method: type,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(data),
    });
  }
  if (response.status !== 200) {
    if (response.status === 401) {
      window.location.pathname = "/logout";
    }
    console.log("Something went wrong! [Code is " + response.status + "]");
    return response.status;
  }
  return await response.json();
}

/* ------------------------------------------ */

export const requestTypes = Object.freeze({
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
});

export async function makeHttpCall(link, token, type, body) {
  if (typeof link === "string" || link instanceof String) {
    var toReturn = null;
    await sendToServer(link, token, type, body)
      .then(function (response) {
        toReturn = response;
      })
      .catch(function (error) {
        console.log("ERROR! [" + error + "]");
        return error;
      });
    return toReturn;
  }
}

/* ----------------------------------- */
