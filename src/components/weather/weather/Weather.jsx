import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import "../../../../node_modules/bootstrap/scss/bootstrap.scss";
import styles from "./weather.module.scss";

import { dbRef } from "../../../firebase/config";
import { child, get } from "firebase/database";

import UnetiImg from "../../../assets/img/uneti.jpg";
// import Banner from "../../../assets/img/banner.jpg";
import Logo from "../../../assets/img/logo.jpg";

const cx = classNames.bind(styles);

const Weather = () => {
  const [dataValue, setDataValue] = useState([]);
  const getValue = () => {
    get(child(dbRef, "/"))
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
  }, [dataValue]);
  return (
    <div className={cx("container", "container-fluid")}>
      <div className={cx("row")}>
        <div
          className={cx("wrapper", "container-fluid", "col-xs-6", "col-md-12")}
        >
          <div className={cx("logo")}>
            <img className={cx("img")} src={UnetiImg} alt="" />
          </div>
          <header className={cx("header")}>
            <div className={cx("title")}>
              <div className={cx("banner")}>
                <img className={cx("img", "banner")} src={Logo} alt="" />
              </div>
              <div className={cx("text_header")}>
                <h1 className={cx("text")}>KHOA ĐIỆN TỬ & KĨ THUẬT MÁY TÍNH</h1>
                <h2 className={cx("text")}>Phần mềm giám sát</h2>
              </div>
            </div>
          </header>
          <main className={cx("main")}>
            <div className={cx("main_info")}>
              <div>
                <div className={cx("card")}>
                  <h2>Nhiệt độ</h2>
                  <p id="humidity">{Math.round(dataValue.t)}°C</p>
                </div>
              </div>
              <div className={cx("card")}>
                <h2>Độ ẩm</h2>
                <p id="temperature">{Math.round(dataValue.h)}%</p>
              </div>
            </div>
            <div className={cx("row", "wrapper_chart")}>
              <div className={cx("chart", "col-xs-4", "col-md-8")}>
                <canvas id="myChart" width="100%"></canvas>
              </div>
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
      </div>
      <div className={cx("chart")}>
        <canvas id="myChart"></canvas>
      </div>
    </div>
  );
};

export default Weather;
