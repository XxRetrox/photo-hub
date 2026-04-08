import HomePage from "./homepage/home_page";
import { Route, Routes } from "react-router-dom";
import Results from "./results/results";
import CollectionPage from "./collections/collectionpage";
import IndColl from "./individual_coll/ind_coll";
import ImgPage from "./image_page/img_page";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/results/:query" element={<Results />} />
        <Route path="/collections" element={<CollectionPage />} />
        <Route path="/indcoll/:coll_id/:coll_name" element={<IndColl />} />
        <Route path="/image/:query" element={<ImgPage />} />
      </Routes>
    </>
  );
}

export default App;
