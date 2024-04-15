import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import "../../../../node_modules/bootstrap/scss/bootstrap.scss";
import styles from "./weather.module.scss";

import { dbRef } from "../../../firebase/config";
import { child, get, push, ref } from "firebase/database";

import UnetiImg from "../../../assets/img/uneti.jpg";
import Logo from "../../../assets/img/logo.jpg";
import { MultitypeChart } from "../../chart/Chart";

import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
);

const cx = classNames.bind(styles);

const Weather = () => {
  const [dataValue, setDataValue] = useState([]);
  console.log("🚀 ~ Weather ~ dataValue:", dataValue);
  const [time, setTime] = useState(["19:26", "19:26", "19:26", "19:26"]);
  console.log("🚀 ~ Weather ~ time:", time);

  // const getTime = () => {
  //   const x = new Date();
  //   const hours = x.getHours();
  //   const minutes = x.getMinutes();
  //   const newArray = [...time, `${hours}:${minutes}`];
  //   setTime(newArray);
  // };

  const labels = time;
  console.log("🚀 ~ Weather ~ labels:", labels);

  const data = {
    labels,
    datasets: [
      {
        type: "line",
        label: "Temprerature",
        data: dataValue.map((data) => {
          return data.t;
        }),
        borderColor: "rgb(255, 99, 132)",
        borderWidth: 5,
        fill: false,
      },
      {
        type: "bar",
        label: "Humidity",
        data: dataValue.map((data) => {
          return data.h;
        }),
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "white",
        borderWidth: 2,
      },
    ],
  };

  const MultitypeChart = () => {
    return (
      <Chart
        type="bar"
        data={data}
        width={1000}
        height={603}
        options={{ maintainAspectRatio: false }}
      />
    );
  };
  const getValue = () => {
    get(child(dbRef, "/"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          const newData = [...[snapshot.val()], dataValue];
          setDataValue(newData);
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
    // getTime();
  }, []);
  return (
    <div className={cx("wrapper")}>
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
            <div className={cx("chart")}>
              <MultitypeChart />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Weather;
