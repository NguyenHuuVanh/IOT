import "./App.css";
import { VerticalChart } from "./components/chart/Chart";
import Search from "./components/search/Search";
import Weather from "./components/weather/weather/Weather";

function App() {
  return (
    <div className="App">
        <header className="header">
        <div className="title">
          <h1 className="text">
            Biểu đồ theo dõi nhiệt độ - độ ẩm - cường độ ánh sáng
          </h1>
        </div>
      </header>
      <Search/>
      <Weather />
      <VerticalChart/>
    </div>
  );
}

export default App;
