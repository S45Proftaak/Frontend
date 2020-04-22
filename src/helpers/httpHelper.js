async function sendToServer(link, type, data) {
  // When GET request
  let response;
  if (type === requestTypes.GET) {
    var url = new URL(link);
    url.search = new URLSearchParams(data).toString();
    console.log(url);
    console.log(data);
    response = await fetch(url.href, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // When POST, PUT OR DELETE
  else {
    response = await fetch(link, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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

export async function makeHttpCall(link, type, body) {
  if (typeof link === "string" || link instanceof String) {
    if (true) {
      var toReturn = null;
      await sendToServer(link, type, body)
        .then(function (response) {
          toReturn = response;
        })
        .catch(function (error) {
          console.log("ERROR! [" + error + "]");
          return error;
        });
    } else {
      return "Not a valid url.";
    }
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
