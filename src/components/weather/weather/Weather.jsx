import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./weather.module.scss";
import axios from "axios";
import "../../../../node_modules/bootstrap/scss/bootstrap.scss";
import { dbRef } from "../../../firebase/config";
import { child, get } from "firebase/database";
import { apiLinks } from "../../../axios/Api";

const cx = classNames.bind(styles);

const Weather = () => {
  const [dataTime, setDataTime] = useState("");
  const [dataValue, setDataValue] = useState([]);
  const [dataInfo, setDataInfo] = useState([]);

  console.log("🚀 ~ Weather ~ dataValue:", dataInfo && dataInfo.current);
  const getData = () => {
    axios
      .get(apiLinks.time())
      .then((res) => {
        setDataTime(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getTime = () => {
    return dataTime && dataTime.time_24.split(":");
  };

  const getWeatherInfo = () => {
    axios
      .get(apiLinks.weather())
      .then((res) => {
        setDataInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getValue = () => {
    get(child(dbRef, "infomation"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          setDataValue(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const DisplayWeather = () => {
    if (dataValue.temp <= 25) {
      return "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-weather/draw1.webp";
    } else if (dataValue.temp > 25) {
      return "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-weather/ilu3.webp";
    } else if (dataValue.humidity >= 80) {
      return "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-weather/ilu1.webp";
    }
  };

  const wind =
    dataInfo && dataInfo.current && Math.round(dataInfo.current.wind_kph);

  useEffect(() => {
    getData();
    getValue();
    getWeatherInfo();
  }, []);
  return (
    <div className={cx("container")}>
      <header className={cx("header")}>
        <div className={cx("title")}>
          <h1 className={cx("text")}>
            Biểu đồ theo dõi nhiệt độ - độ ẩm - cường độ ánh sáng
          </h1>
        </div>
      </header>

      <section
        className={("vh-100", "container")}
        style={{ backgroundColor: "transparent" }}
      >
        <div className={cx("container", "py-5", "h-100")}>
          <div
            className={cx(
              "row",
              "d-flex",
              "justify-content-center",
              "align-items-center",
              "h-100"
            )}
          >
            <div className={cx("col-md-8", "col-lg-6", "col-xl-4")}>
              <div
                className={cx("card")}
                style={{ color: "#4B515D", borderRadius: "35px" }}
              >
                <div className={cx("card-body", "p-4")}>
                  <div className={cx("d-flex")}>
                    <h6 className={cx("title", "flex-grow-1")}>
                      {dataInfo && dataInfo.location && dataInfo.location.name}
                    </h6>
                    <h6>{`${getTime()[0]}:${getTime()[1]}`}</h6>
                  </div>
                  <div
                    className={cx(
                      "d-flex",
                      "flex-column",
                      "text-center",
                      "mt-5",
                      "mb-4"
                    )}
                  >
                    <h6
                      id="temperature"
                      className={cx("display-4", "mb-0", "font-weight-bold")}
                      style={{ color: "#1C2331" }}
                    >
                      {`${dataValue.temp}°C`}
                    </h6>
                    <span className={cx("small")} style={{ color: "#868B94" }}>
                      {dataInfo && dataInfo.location && dataInfo.location.name}
                    </span>
                  </div>

                  <div className={cx("d-flex", "align-items-center")}>
                    <div
                      className={cx("flex-grow-1")}
                      style={{ fontSize: "16px" }}
                    >
                      <div>
                        <i
                          className={cx("fas", "fa-wind", "fa-fw")}
                          style={{ color: "#868B94" }}
                        ></i>{" "}
                        <span className={cx("ms-1")}>{`${wind} km/h`}</span>
                      </div>
                      <div>
                        <i
                          className={cx("fas", "fa-tint", "fa-fw")}
                          style={{ color: "#868B94" }}
                        ></i>{" "}
                        <span id="humidity" className={cx("ms-1")}>
                          {" "}
                          {`${dataValue.humidity}%`}
                        </span>
                      </div>
                      <div>
                        <i
                          className={cx("fas", "fa-sun", "fa-fw")}
                          style={{ color: "#868B94" }}
                        ></i>{" "}
                        <span className={cx("ms-1")}> 0.2h </span>
                      </div>
                    </div>
                    <div>
                      <img src={DisplayWeather()} width="100px" />
                      {/* <!-- <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-weather/ilu3.webp"
                        width="100px"> trời nắng -->
                        <!-- <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-weather/draw1.webp"
              className="card-img" alt="weather" /> trời lạnh --> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={cx("vh-100")} style={{ backgroundColor: "#cdc4f9" }}>
        <h1 className={cx("title")}>Dự báo trong tuần</h1>
        <div className={cx("container", "py-5", "h-100")}>
          <div
            className={cx(
              "row",
              "d-flex",
              "justify-content-center",
              "align-items-center",
              "h-100"
            )}
          >
            <div className={cx("col-md-12", "col-xl-10")}>
              <div
                className={cx(
                  "card",
                  "shadow-0",
                  "border",
                  "border-dark",
                  "border-5",
                  "text-dark"
                )}
                style={{ borderRadius: "10px" }}
              >
                <div className={cx("card-body", "p-4")}>
                  <div className={cx("row", "text-center")}>
                    <div
                      className={cx(
                        "col-md-9",
                        "text-center",
                        "border-end",
                        "border-5",
                        "border-dark",
                        "py-4"
                      )}
                      // style="margin-top: -1.5rem; margin-bottom: -1.5rem;">
                      style={{ marginTop: "-1.5rem", marginBottom: "-1.5rem" }}
                    >
                      <div
                        className={cx(
                          "d-flex",
                          "justify-content-around",
                          "mt-3"
                        )}
                      >
                        <p className={cx("small")}>Toronto</p>
                        <p className={cx("small")}>21.02.2021</p>
                        <p className={cx("small")}>Rain map</p>
                      </div>
                      <div
                        className={cx(
                          "d-flex",
                          "justify-content-around",
                          "align-items-center",
                          "py-5",
                          "my-4"
                        )}
                      >
                        <p
                          className={cx("fw-bold", "mb-0")}
                          style={{ fontSize: "7rem" }}
                        >
                          -4°C
                        </p>
                        <div className={cx("text-start")}>
                          <p className={cx("small")}>10:00</p>
                          <p className={cx("h3", "mb-3")}>Sunday</p>
                          <p className={cx("small", "mb-0")}>Cloudy</p>
                        </div>
                      </div>
                      <div
                        className={cx(
                          "d-flex",
                          "justify-content-around",
                          "align-items-center",
                          "mb-3"
                        )}
                      >
                        <div className={cx("flex-column")}>
                          <i className={cx("fas", "fa-minus")}></i>
                        </div>
                        <div
                          className={cx("flex-column", "border")}
                          //  style="border-radius: 10px; padding: .75rem">
                          style={{ borderRadius: "10px", padding: ".75rem" }}
                        >
                          <p className={cx("small", "mb-1")}>Sun</p>
                          <p className={cx("small", "mb-0")}>
                            <strong>-4°C</strong>
                          </p>
                        </div>
                        <div className={cx("flex-column")}>
                          <p className={cx("small", "mb-1")}>Mon</p>
                          <p className={cx("small", "mb-0")}>
                            <strong>-4°C</strong>
                          </p>
                        </div>
                        <div className={cx("flex-column")}>
                          <p className={cx("small", "mb-1")}>Tue</p>
                          <p className={cx("small", "mb-0")}>
                            <strong>-4°C</strong>
                          </p>
                        </div>
                        <div className={cx("flex-column")}>
                          <p className={cx("small", "mb-1")}>Wed</p>
                          <p className={cx("small", "mb-0")}>
                            <strong>-4°C</strong>
                          </p>
                        </div>
                        <div className={cx("flex-column")}>
                          <p className={cx("small", "mb-1")}>Thu</p>
                          <p className={cx("small", "mb-0")}>
                            <strong>-4°C</strong>
                          </p>
                        </div>
                        <div className={cx("flex-column")}>
                          <p className={cx("small", "mb-1")}>Fri</p>
                          <p className={cx("small", "mb-0")}>
                            <strong>-4°C</strong>
                          </p>
                        </div>
                        <div className={cx("flex-column")}>
                          <p className={cx("small", "mb-1")}>Sat</p>
                          <p className={cx("small", "mb-0")}>
                            <strong>-4°C</strong>
                          </p>
                        </div>
                        <div className={cx("flex-column")}>
                          <i className={cx("fas", "fa-minus")}></i>
                        </div>
                      </div>
                    </div>
                    <div className={cx("col-md-3", "text-end")}>
                      <p className={cx("small", "mt-3", "mb-5", "pb-5")}>
                        For a month
                      </p>
                      <p className={cx("pb-1")}>
                        <span className={cx("pe-2")}>11:00</span>{" "}
                        <strong>-4°</strong>
                      </p>
                      <p className={cx("pb-1")}>
                        <span className={cx("pe-2")}>12:00</span>{" "}
                        <strong>-4°</strong>
                      </p>
                      <p className={cx("pb-1")}>
                        <span className={cx("pe-2")}>13:00</span>{" "}
                        <strong>-5°</strong>
                      </p>
                      <p className={cx("pb-1")}>
                        <span className={cx("pe-2")}>14:00</span>{" "}
                        <strong>-7°</strong>
                      </p>
                      <p className={cx("pb-1")}>
                        <span className={cx("pe-2")}>15:00</span>{" "}
                        <strong>-6°</strong>
                      </p>
                      <p className={cx("pb-1")}>
                        <span className={cx("pe-2")}>16:00</span>{" "}
                        <strong>-4°</strong>
                      </p>
                      <p>
                        <span className={cx("pe-2")}>17:00</span>{" "}
                        <strong>-3°</strong>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="chart">
        <canvas id="myChart"></canvas>
      </div>
    </div>
  );
};

export default Weather;
