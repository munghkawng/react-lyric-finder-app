import PaginateButton from "./PaginateButton";
import { useState, useEffect } from "react";
import { paginate } from "../paginate";
import Loading from "./Loading";
import axios from "axios";
import { Link } from "react-router-dom";
const showAllLyricUrl = "https://guitaristchord.com/api/all-songs";
function ShowAllLyrics() {
  const [data, setData] = useState([]);
  const [songData, setSongData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);

  const nextPage = () => {
    setPage((oldPage) => {
      let nextPage = oldPage + 1;
      if (nextPage > data.length - 1) {
        nextPage = 0;
      }
      return nextPage;
    });
  };

  const prevPage = () => {
    setPage((oldPage) => {
      let prevPage = oldPage - 1;
      if (prevPage < 0) {
        prevPage = data.length - 1;
      }
      return prevPage;
    });
  };

  const handlePage = (index) => {
    setPage(index);
  };

  const getSongData = async () => {
    setLoading(true);
    try {
      const { data } = await axios(showAllLyricUrl);
      setData(paginate(data));

      setLoading(false);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    getSongData();
  }, []);

  useEffect(() => {
    if (loading) return;
    setSongData(data[page]);
  }, [loading, page, data]);

  return (
    <>
      <div className="card my-4">
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
      <div className="mb-5">
        <PaginateButton
          data={data}
          prevPage={prevPage}
          nextPage={nextPage}
          handlePage={handlePage}
          page={page}
        />
      </div>
    </>
  );
}

export default ShowAllLyrics;
