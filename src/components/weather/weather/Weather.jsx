import React, { useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./weather.module.scss";
import axios from "axios";
import "../../../../node_modules/bootstrap/scss/bootstrap.scss";

const cx = classNames.bind(styles);

const Weather = () => {
  const getData = () => {
    axios
      .get("https://timeapi.io/api/Time/current/zone?timeZone=Asia/Ho_Chi_Minh")
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
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
                    <h6 className={cx("title", "flex-grow-1")}>Hanoi</h6>
                    <h6>15:07</h6>
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
                      13°C
                    </h6>
                    <span className={cx("small")} style={{ color: "#868B94" }}>
                      Hanoi
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
                        <span className={cx("ms-1")}> 40 km/h</span>
                      </div>
                      <div>
                        <i
                          className={cx("fas", "fa-tint", "fa-fw")}
                          style={{ color: "#868B94" }}
                        ></i>{" "}
                        <span id="humidity" className={cx("ms-1")}>
                          {" "}
                          84%{" "}
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
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-weather/ilu1.webp"
                        width="100px"
                      />
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
      <div className="chart">
        <canvas id="myChart"></canvas>
      </div>
    </div>
  );
};

export default Weather;
