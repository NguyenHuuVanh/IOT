import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import "../../../../node_modules/bootstrap/scss/bootstrap.scss";
import styles from "./weather.module.scss";

import { dbRef } from "../../../firebase/config";
import { child, get } from "firebase/database";
import { apiLinks } from "../../../axios/Api";

const cx = classNames.bind(styles);

const Weather = () => {
  const [dataValue, setDataValue] = useState([]);
  const [dataInfo, setDataInfo] = useState([]);
  const [dataWeatherWeek, setDataWeatherWeek] = useState([]);
  const dayWeek = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];
  console.log("🚀 ~ Weather ~ dataWeatherWeek:", dataWeatherWeek);

  console.log("🚀 ~ Weather ~ dataValue:", dataInfo && dataInfo);
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
    get(child(dbRef,"/"))
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

  useEffect(() => {
    getValue();
    getWeatherInfo();
    getDataWeatherWeek();
  }, []);
  return (
    <div className={cx("container")}>
    
<div className={cx("wrapper")}>
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
</div>
     

      <section
        className={cx("vh-100", "table-2")}
        style={{ backgroundColor: "#cdc4f9" }}
      >
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
                      style={{ marginTop: "-1.5rem", marginBottom: "-1.5rem" }}
                    >
                      <div
                        className={cx(
                          "d-flex",
                          "justify-content-around",
                          "mt-3"
                        )}
                      >
                        <p className={cx("small")}>
                          {" "}
                          {dataInfo &&
                            dataInfo.location &&
                            dataInfo.location.name}
                        </p>
                        <p className={cx("small")}>{day && day[0]}</p>
                        <p className={cx("small")}>
                          {" "}
                          {dataInfo &&
                            dataInfo.current &&
                            dataInfo.current.condition.text}
                          map
                        </p>
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
                          {`${dataValue && dataValue.temp}°C`}
                        </p>
                        <div className={cx("text-start")}>
                          <p className={cx("small")}>10:00</p>
                          <p className={cx("h3", "mb-3")}>Sunday</p>
                          <p className={cx("small", "mb-0")}>
                            {" "}
                            {dataInfo &&
                              dataInfo.current &&
                              dataInfo.current.condition.text}
                          </p>
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
                        {dataWeatherWeek.map((day, index) => {
                          console.log("🚀 ~ {dataWeatherWeek.map ~ day:", day);
                          return (
                            <div className={cx("flex-column", "active")}>
                              <p className={cx("small", "mb-1")}>
                                {dayWeek[index]}
                              </p>
                              <p className={cx("small", "mb-0")}>
                                <i
                                  className={cx("fas", "fa-sun", "fa-2x")}
                                  style={{ color: "#ddd" }}
                                ></i>
                              </p>
                              <strong>{Math.round(day.day.avgtemp_c)}°C</strong>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className={cx("col-md-3", "text-end")}>
                      <p className={cx("small", "mt-3", "mb-5", "pb-5")}>
                        For a month
                      </p>
                      {dataWeatherWeek.map((hour,index)=>{
                        return <p className={cx("pb-1")}>
                        <span className={cx("pe-2")}>{index}:00</span>{" "}
                        <strong>{Math.round(hour.hour[index].temp_c)}°C</strong>
                      </p>
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
          <div class="row wrapper">
            <div class="chart col-xs-4 col-md-12">
              <canvas id="myChart"></canvas>
            </div>
          </div>
          <div class="led">
            <div class="led_btn">
              <p class="text">Bật/Tắt led:</p>
              <input type="checkbox" id="switch" />
              <label id="switch" for="switch">
                Toggle
              </label>
            </div>
          </main>

          <div className={cx("led")}>
            <div className={cx("led_btn")}>
              <p className={cx("text")}>Trạng thái led:</p>
              <input type="checkbox" id="switch" />
              <label id="switch" for="switch">
                Toggle
              </label>
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
