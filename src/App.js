import "./App.css";
import Chart, { MultitypeChart } from "./components/chart/Chart";
import MixedChart, { VerticalChart } from "./components/chart/Chart";
import Weather from "./components/weather/weather/Weather";

function App() {
  return (
    <div className="App">
      <Weather />
      {/* <MultitypeChart /> */}
    </div>
  );
}

export default App;
