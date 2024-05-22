import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import "../../../node_modules/bootstrap/scss/bootstrap.scss";
import styles from "./weather.module.scss";

import { dbRef } from "../../firebase/config";
import { child, get } from "firebase/database";

import UnetiImg from "../../assets/img/uneti.jpg";
import Logo from "../../assets/img/logo.jpg";

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
import ParammeterValue from "./parameterValue";
import e from "cors";

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

  const labels =
    dataValue &&
    dataValue.map((time) => {
      return time.time;
    });

  const data = {
    labels,
    datasets: [
      {
        type: "bar",
        label: "Temprerature",
        data: dataValue && dataValue.map((temp) => temp.temperature),
        borderColor: "rgb(255, 99, 132)",
        borderWidth: 5,
        fill: false,
      },
      {
        type: "bar",
        label: "Humidity",
        data: dataValue && dataValue.map((temp) => temp.humidity),
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "white",
        borderWidth: 2,
      },
      {
        type: "bar",
        label: "Gas",
        data: dataValue && dataValue.map((temp) => temp.gasConcentration),
        backgroundColor: "rgb(241, 196, 15)",
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

  

  const getTimeString = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const timeString = `${hours}:${minutes}`;
    return timeString;
  };
  

  const getValue = () => {
    get(child(dbRef, "/data"))
      .then((snapshot) => {
        
        if (snapshot.exists()) {
          console.log(snapshot.val());
          const newData = { ...snapshot.val(), time: getTimeString() };
          setDataValue((prevData) => {
            const updatedData = [...prevData, newData];
            if (updatedData.length > 10) {
              return updatedData.slice(updatedData.length - 10);
            } else {
              return updatedData;
            }
          });
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    console.log("🚀 ~ Weather ~ dataValue:", dataValue);
    const interval1 = setInterval(() => {
      getValue();
    }, 10000);

    return () => {
      clearInterval(interval1);
    };
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
                <h2 className={cx("text")}>
                  Phần mềm điều khiển nhà thông minh - Smart home
                </h2>
              </div>
            </div>
          </header>
          <main className={cx("main")}>
            <ParammeterValue />
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
