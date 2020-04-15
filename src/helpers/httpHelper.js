//import axios from "axios";

async function sendToServer(link, type) {
  const response = await fetch(link, {
    method: type,
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status != 200) {
    console.log("Something went wrong! [Code is " + response.status + "]");
  }
  return await response.json();
}

/* ------------------------------------------ */

export async function makeHttpCall(link, type) {
  if (typeof link === "string" || link instanceof String) {
    if (validURL(link)) {
      var toReturn = null;
      await sendToServer(link, type)
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
    "^(https?:\\/\\/)?" + // protocol
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
