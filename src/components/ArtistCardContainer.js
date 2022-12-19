import ArtistsCard from "./ArtistsCard";
import { useFetch } from "./CustomHook";
import Loading from "./Loading";

const artistUrl = "https://guitaristchord.com/api/artists";
function ArtistCardContainer() {
  const { loading, songData } = useFetch(artistUrl);

  return (
    <div className="row row-cols-2 row-cols-md-6 mb-5">
      {loading ? (
        <Loading />
      ) : (
        songData.data.map((artist) => {
          return <ArtistsCard key={artist.id} {...artist} />;
        })
      )}
    </div>
  );
}

export default ArtistCardContainer;
