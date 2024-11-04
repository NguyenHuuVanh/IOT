import classNames from "classnames/bind";
import styles from "./Histories.module.scss";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const cx = classNames.bind(styles);

const Histories = () => {
  const location = useLocation();
  const data = location.state?.data || [];
  console.log("🚀 ~ Histories ~ data:", data);

  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFilter = () => {
    setLoading(true);

    setTimeout(() => {
      if (startDate && endDate && startTime && endTime) {
        const startTimestamp = new Date(`${startDate} ${startTime}`).getTime();
        const endTimestamp = new Date(`${endDate} ${endTime}`).getTime();

        const filtered = data.filter((item) => {
          const itemTimestamp = new Date(item.timestamp).getTime();
          return itemTimestamp >= startTimestamp && itemTimestamp <= endTimestamp;
        });

        setFilteredData(filtered);
      } else {
        setFilteredData(data);
      }
      setIsFiltered(true);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    setFilteredData(data);
    setIsFiltered(false);
  }, [data]);

  return (
    <div className={cx("container-fluid")}>
      <div className={cx("limiter")}>
        <div className={cx("container-table100")}>
          <div className={cx("wrap-table100")}>
            <div className={cx("table100")}>
              <div className={cx("table-scroll")}>
                <table className={cx("table")}>
                  <thead>
                    <tr className={cx("table100-head")}>
                      <th className={cx("column1")}>ID</th>
                      <th className={cx("column2")}>Temperature</th>
                      <th className={cx("column3")}>Humidity</th>
                      <th className={cx("column4")}>Pressure</th>
                      <th className={cx("column5")}>Pump</th>
                      <th className={cx("column6")}>Rain</th>
                      <th className={cx("column7")}>Light</th>
                      <th className={cx("column8")}>Date</th>
                      <th className={cx("column9")}>Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading
                      ? Array(5)
                          .fill(0)
                          .map((_, index) => (
                            <tr key={index} className={cx("skeleton-row")}>
                              {Array(9)
                                .fill(0)
                                .map((_, idx) => (
                                  <td key={idx} className={cx("skeleton-cell")}></td>
                                ))}
                            </tr>
                          ))
                      : (isFiltered ? filteredData : data).map((item, index) => (
                          <tr key={index}>
                            <td className={cx("column1")}>{index + 1}</td>
                            <td className={cx("column2")}>{item.temperature}</td>
                            <td className={cx("column3")}>{item.humidity}</td>
                            <td className={cx("column4")}>{item.pressure}</td>
                            <td className={cx("column5")}>{item.pump}</td>
                            <td className={cx("column6")}>{item.rain}</td>
                            <td className={cx("column7")}>{item.light}</td>
                            <td className={cx("column8")}>{item.timestamp.split(" ")[0]}</td>
                            <td className={cx("column9")}>{item.timestamp.split(" ")[1]}</td>
                          </tr>
                        ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className={cx("filter")}>
            <h2>Lọc dữ liệu</h2>
            <div className={cx("form_input")}>
              <label>Start Date:</label>
              <input
                className={cx("input")}
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className={cx("form_input")}>
              <label>End Date:</label>
              <input className={cx("input")} type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
            <div className={cx("form_input")}>
              <label>START TIME:</label>
              <input
                className={cx("input")}
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            <div className={cx("form_input")}>
              <label>End TIME:</label>
              <input className={cx("input")} type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
            </div>
            <button onClick={handleFilter} className={cx("btn_filter")}>
              Lọc
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Histories;
