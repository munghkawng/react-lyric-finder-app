import { useState, useEffect } from "react";

import Loading from "./Loading";
import { Button, Stack } from "@chakra-ui/react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import SearchPage from "./page/SearchPage";

function ShowAllLyrics() {
  const location = useLocation();

  const [songData, setSongData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [controller, setController] = useState({
    page: 1,
    pageSize: 6,
  });
  const [hasMore, setHasMore] = useState(true);

  const getSongData = async () => {
    const allLyricsUrl = `https://guitaristchord.com/api/songs?page=${controller.page}&page_size=${controller.pageSize}`;

    try {
      setLoading(true);
      const response = await axios(allLyricsUrl);
      if (response.status === 200) {
        const { data } = response;
        setSongData((preValue) => {
          return [...new Set([...preValue, ...data.data])];
        });
        setController((prevData) => {
          return { ...prevData, page: prevData.page + 1 };
        });
        setHasMore(data.data.length > 0);
      } else {
        throw new Error("Request Failed");
      }
      setLoading(false);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    getSongData();
    // eslint-disable-next-line
  }, []);

  if (location.state === null) {
    return (
      <>
        <div className="card my-3">
          <div className="card-header">
            <h3>All Lyrics</h3>
          </div>

          <ul className="list-group list-group-flush ">
            {songData.map((song, index) => {
              return (
                <li className="list-group-item" key={index}>
                  <div className="card mb-3 border-0 ">
                    <div className="row g-0 align-items-center">
                      <div className="col-md-1 col-2 d-flex">
                        <span className="pe-2 text-muted my-auto">
                          {index + 1}
                        </span>
                        <img
                          src={require("./assets/logo192.png")}
                          className="img-thumbnail"
                          alt="..."
                          style={{ width: "50px" }}
                        />
                      </div>
                      <div className="col-md-11 col-10">
                        <div className="card-body">
                          <Link
                            to={`/lyric/${song.slug}/${song.summary}`}
                            className="text-black"
                          >
                            {song.title}
                          </Link>
                          <Link
                            to={`/artist/${song.tags[0].slug}`}
                            className="text-muted mt-1 d-block"
                          >
                            {song.summary}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        {loading && <Loading />}

        {!loading && hasMore && (
          <Stack
            direction="row"
            align="center"
            size="lg"
            justifyContent="center"
            mb={4}
          >
            <Button
              colorScheme="gray"
              onClick={getSongData}
              variant="solid"
              size="md"
              border="1px"
            >
              Load More
            </Button>
          </Stack>
        )}
      </>
    );
  } else {
    return <SearchPage searchData={location.state} loading={loading} />;
  }
}

export default ShowAllLyrics;
