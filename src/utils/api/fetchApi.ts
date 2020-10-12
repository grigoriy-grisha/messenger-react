import { BaseUPI } from "../../baseURI";

export const fetchApi = async (
  method: string,
  token = '',
  path = "",
  body = {},
  query = ""
) => {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.set("Authorization", "Bearer " + token);

  let requestOptions = {};
  if (method.toUpperCase() === "GET") {
    requestOptions = {
      method: method,
      headers: myHeaders,
      mode: "cors",
    };
  } else {
    requestOptions = {
      method: method,
      headers: myHeaders,
      body: JSON.stringify(body),
      mode: "cors",
    };
  }

  let asd = await fetch(BaseUPI + path + query, requestOptions);

  return asd.json();
};
