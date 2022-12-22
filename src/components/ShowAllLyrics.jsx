import PaginateButton from "./PaginateButton";
import { useState, useEffect } from "react";

import Loading from "./Loading";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import SearchPage from "./page/SearchPage";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

function ShowAllLyrics() {
  const location = useLocation();
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [songData, setSongData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [controller, setController] = useState({
    page: 1,
    pageSize: 10,
  });

  // const nextPage = () => {
  //   setPage((oldPage) => {
  //     let nextPage = oldPage + 1;
  //     if (nextPage > data.length - 1) {
  //       nextPage = 0;
  //     }
  //     return nextPage;
  //   });
  // };

  // const prevPage = () => {
  //   setPage((oldPage) => {
  //     let prevPage = oldPage - 1;
  //     if (prevPage < 0) {
  //       prevPage = data.length - 1;
  //     }
  //     return prevPage;
  //   });
  // };

  const handleChange = (event, value) => {
    console.log(event);
    setController({ page: value });
  };

  const getSongData = async () => {
    const allLyricsUrl = `https://guitaristchord.com/api/songs?page=${controller.page}&${controller.pageSize}`;
    try {
      const response = await axios(allLyricsUrl);
      if (response.status === 200) {
        const { data } = response;
        setSongData(data.data);
        setTotalPageCount(data.last_page);
        setLoading(false);
      } else {
        throw new Error("Request Failed");
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    getSongData();
  }, [controller]);

  // useEffect(() => {
  //   if (loading) return;
  //   setSongData(data[page]);
  // }, [loading, page, data]);

  if (location.state === null) {
    return (
      <>
        <div className="card my-3">
          <div className="card-header">
            <h3>All Lyrics</h3>
          </div>

          <ul className="list-group list-group-flush ">
            {loading ? (
              <Loading />
            ) : (
              songData.map((song, index) => {
                return (
                  <li className="list-group-item" key={song.id}>
                    <div className="card mb-3 border-0 ">
                      <div className="row g-0 align-items-center">
                        <div className="col-md-1 col-1 d-flex">
                          <span className="pe-4 text-muted my-auto">
                            {index + 1}
                          </span>
                          <img
                            src={require("./assets/logo192.png")}
                            className="img-thumbnail"
                            alt="..."
                            style={{ width: "90px" }}
                          />
                        </div>
                        <div className="col-md-8 col-8 ms-5">
                          <div className="card-body">
                            <Link
                              to={`/lyric/${song.slug}/${song.summary}`}
                              className="card-title h6  text-black"
                            >
                              {song.title}
                            </Link>
                            <Link
                              to={`/artist/${song.tags[0].slug}`}
                              className="card-text text-muted mt-1 d-block"
                            >
                              {song.summary}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })
            )}
          </ul>
        </div>
        <div>
          <Stack spacing={4}>
            <Pagination
              count={totalPageCount}
              size="large"
              variant="outlined"
              page={controller.page}
              onChange={handleChange}
            />
          </Stack>
        </div>
      </>
    );
  } else {
    return <SearchPage searchData={location.state} loading={loading} />;
  }
}

export default ShowAllLyrics;
