import "./App.css";
import { VerticalChart } from "./components/chart/Chart";
import Weather from "./components/weather/weather/Weather";

function App() {
  return (
    <div className="App">
      <Weather />
      <VerticalChart/>
    </div>
  );
}

export default App;
