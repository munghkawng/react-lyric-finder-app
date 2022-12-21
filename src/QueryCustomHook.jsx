// custon query hook
import SongContext from "./Context";
import axios from "axios";
import { useState, useEffect } from "react";
import { useContext } from "react";

export const useQuery = () => {
  const { query } = useContext(SongContext);

  const [queryData, setQueryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getQuery = async () => {
      setLoading(true);
      let searchUrl;
      if (query) {
        searchUrl = `https://guitaristchord.com/api/search/${query}`;
        try {
          const { data } = await axios(searchUrl, {
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
          });

          setQueryData(data);

          setLoading(false);
        } catch (error) {
          setError(true);

          console.log(error.response);
        }
      } else {
        return;
      }
    };
    getQuery();
  }, [query]);

  return { loading, queryData, error };
};
