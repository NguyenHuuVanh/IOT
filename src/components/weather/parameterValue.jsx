import React, { useEffect, useState } from "react";
import { getDatabase, child, get, set, ref, update } from "firebase/database";
import { dbRef } from "../../firebase/config";
import classNames from "classnames/bind";
import styles from "./weather.module.scss";
import Button from "../Button/ButtonLed";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Histories from "../Histories/Histories";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

const ParammeterValue = ({ dataMysql }) => {
  const navigate = useNavigate();
  console.log(dataMysql && dataMysql);

  const dataDisplay = () => {
    if (dataMysql.length === 0) return { temperature: 0, humidity: 0, pressure: 0 };
    const lastData = dataMysql[dataMysql.length - 1];
    return {
      temperature: lastData.temperature,
      humidity: lastData.humidity,
      pressure: Math.round(lastData.pressure / 1000),
    };
  };

  console.log(dataDisplay());

  const handleClick = () => {
    navigate("/Histories", { state: { data: dataMysql } });
  };

  useEffect(() => {
    dataDisplay();
    const intervalId = setInterval(dataDisplay, 5000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className={cx("main_info")}>
      <div className={cx("card")}>
        <h2>Nhiệt độ</h2>
        <p id="humidity">
          {dataDisplay().temperature}
          °C
        </p>
      </div>

      <div className={cx("card")}>
        <h2>Độ ẩm</h2>
        <p id="temperature"> {dataDisplay().humidity}%</p>
      </div>
      <div className={cx("card")}>
        <h2>Áp suất</h2>
        <p id="temperature"> {dataDisplay().pressure} PA</p>
      </div>
      <div className={cx("button")}>
        <button className={cx("button_histories")} onClick={handleClick}>
          <div className={cx("bgContainer")}>
            <span>Watch histories</span>
          </div>
          <div className={cx("arrowContainer")}>
            <svg width="25" height="25" viewBox="0 0 45 38" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M43.7678 20.7678C44.7441 19.7915 44.7441 18.2085 43.7678 17.2322L27.8579 1.32233C26.8816 0.34602 25.2986 0.34602 24.3223 1.32233C23.346 2.29864 23.346 3.88155 24.3223 4.85786L38.4645 19L24.3223 33.1421C23.346 34.1184 23.346 35.7014 24.3223 36.6777C25.2986 37.654 26.8816 37.654 27.8579 36.6777L43.7678 20.7678ZM0 21.5L42 21.5V16.5L0 16.5L0 21.5Z"
                fill="black"
              ></path>
            </svg>
          </div>
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ParammeterValue;
