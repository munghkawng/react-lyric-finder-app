import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import LyricPage from "./components/page/LyricPage";
import HomePage from "./components/page/HomePage";
import Footer from "./components/Footer";
import ArtistProfile from "./components/ArtistProfile";
import SongCardContainer from "./components/SongCardContainer";
import ShareLayout from "./components/page/ShareLayout";
import ShowAllLyrics from "./components/ShowAllLyrics";
import AllArtistPage from "./components/page/AllArtistPage";

import SongContext from "./Context";

import { useFetch } from "./components/CustomHook";

const songListUrl = "https://guitaristchord.com/api/songs";
function App() {
  const { loading, songData } = useFetch(songListUrl);

  return (
    <SongContext.Provider value={{ songData, loading }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ShareLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/all-lyrics" element={<ShowAllLyrics />} />
            <Route path="/lyric/:lyric/:name" element={<LyricPage />} />
            <Route path="/artist/:slug" element={<ArtistProfile />} />
            <Route path="/artists" element={<AllArtistPage />} />
            <Route path="/lyrics" element={<SongCardContainer />} />
            <Route path="*" element={<div>Opp Error</div>} />
          </Route>
        </Routes>

        <Footer />
      </BrowserRouter>
    </SongContext.Provider>
  );
}

export default App;
