import { useState } from "react";

function isURL(text) {
  const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
  return urlPattern.test(text);
}

const useFetch = api => {
  const [data, setData] = useState([]);

  const callApi = async () => {
    if (!isURL(api)) {
      throw Error("Please input a valid API/URL!");
    } else {
      const res = await fetch(api);
      const fetchedData = await res.json();
      setData(fetchedData);

      return fetchedData;
    }
  };

  return {
    data,
    callApi,
  };
};

export default useFetch;
