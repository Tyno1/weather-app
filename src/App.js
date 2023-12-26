import DetailsCurrent from "./DetailsCurrent";
import { Route, Routes } from "react-router-dom";
import DetailsSpecified from "./DetailsSpecified";
import AppFrame from "./AppFrame";
import { useMyContext } from "./contexts/Provider";
import Navbar from "./Navbar";

function App() {
  const {
    text,
    setText,
    getLocation,
  } = useMyContext();

  return (
    <div className="App">
      <Navbar setText={setText} text={text} onSubmit={getLocation} />
      <div className="content">
        <AppFrame />
        <Routes>
          <Route path="/" element={<DetailsCurrent />} />
          <Route path="/specified" element={<DetailsSpecified />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
