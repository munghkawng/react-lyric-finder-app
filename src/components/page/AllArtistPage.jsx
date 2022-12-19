import { Link } from "react-router-dom";
import ArtistsCard from "../ArtistsCard";
import PaginateButton from "../PaginateButton";
import { useState, useEffect } from "react";
import axios from "axios";
import { paginate } from "../../paginate";
import Loading from "../Loading";

const showAllArtistUrl = "https://guitaristchord.com/api/all-artists";
function AllArtistPage() {
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
      const { data } = await axios(showAllArtistUrl);
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
    <div className="row mb-5">
      <h1 className="text-muted">Artists</h1>
      <nav aria-label="breadcrumb" className="mb-2">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/" className="text-black">
              Home
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Artists
          </li>
        </ol>
      </nav>

      {loading ? (
        <Loading />
      ) : (
        songData.map((artist) => {
          return <ArtistsCard key={artist.id} {...artist} />;
        })
      )}
      <div className="mt-5">
        <PaginateButton
          data={data}
          nextPage={nextPage}
          prevPage={prevPage}
          handlePage={handlePage}
          page={page}
        />
      </div>
    </div>
  );
}

export default AllArtistPage;
