import "./artistProfile.css";
import myBackgroundImage from "./assets/p.jpg";
import SongList from "./SongList";
import { useParams } from "react-router-dom";
import { useFetch } from "./CustomHook";

function ArtistProfile() {
  const { slug } = useParams();

  const artistSongUrl = `https://guitaristchord.com/api/artists/${slug}`;

  const { loading, songData } = useFetch(artistSongUrl);

  return (
    <>
      <div className="bg-img mt-2 rounded-2">
        <div className="d-flex h-75 align-items-end mx-5">
          <img
            src={myBackgroundImage}
            alt="tay"
            className="img-thumbnail rounded-circle "
            style={{
              width: "130px",
              height: "130px",
            }}
          />
          <div className=" p-3 ">
            <p className="text-white text-uppercase">Lyrics</p>
            <h1 className="text-white text-capitalize">{songData.name}</h1>
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-8 col-8">
          <SongList songData={songData.posts} loading={loading} />
        </div>
      </div>
    </>
  );
}

export default ArtistProfile;
