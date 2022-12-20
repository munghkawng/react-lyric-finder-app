import { useState, useEffect } from "react";
import axios from "axios";

export const useFetch = (url) => {
  const [songData, setSongData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSongData = async () => {
      try {
        const { data } = await axios(url, {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        });

        setSongData(data);
        setLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    getSongData();
  }, [url]);

  return { loading, songData };
};
