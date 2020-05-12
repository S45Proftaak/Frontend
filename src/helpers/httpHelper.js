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
    console.log("Something went wrong! [Code is " + response.status + "]");
  }
  return await response.json();
}

/* ------------------------------------------ */

export const requestTypes = Object.freeze({
  GET: "GET",
  POST: "POST",
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

function validURL(str) {
  var pattern = new RegExp(
    "^(http?:\\/\\/)?" + // protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
    "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
    "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
}

/* ------------------------------------- */
