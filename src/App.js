import LeftSide from "./components/LeftSide";
import "./App.css";
import RightSide from "./components/RightSide";
import Sample from "./components/Sample";
import { useState } from "react";

function App() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    price: {
      min: "",
      max: "",
    },
    category: {
      comics: false,
      sports: false,
      knowledge: false,
    },
  });

  return (
    <div className="homePage">
      <LeftSide filters={filters} setFilters={setFilters} search={search} setSearch={setSearch} />
      <RightSide filters={filters} setFilters={setFilters} search={search} setSearch={setSearch} />
      {/* <Sample/> */}
    </div>
  );
}

export default App;
