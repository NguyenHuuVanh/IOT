import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Weather from "./components/weather/Weather";
import Histories from "./components/Histories/Histories";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Weather />} />
        <Route path="/Histories" element={<Histories />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
