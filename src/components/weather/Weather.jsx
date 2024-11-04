import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import "../../../node_modules/bootstrap/scss/bootstrap.scss";
import styles from "./weather.module.scss";

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
import ParammeterValue from "./parameterValue";
import SideBar from "../sideBar/SideBar";
import DataComposedChart from "../chart/Chart";
import CardNote from "../CardNote/CardNote";
import axios from "axios";
import { light } from "@mui/material/styles/createPalette";

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
  const [dataPhP, setDataPhP] = useState([]);

  const handleSubmit = async () => {
    try {
      const response = await axios.get("http://localhost:8080/postData/testsql.php");
      setDataPhP(response.data);
      console.log(dataPhP && dataPhP);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const statusLog = () => {
    if (dataPhP && dataPhP[dataPhP.length - 1].rain === 0 && dataPhP[dataPhP.length - 1].light === 0) {
      return 1;
    } else return 0;
  };

  useEffect(() => {
    const intervalId = setInterval(handleSubmit, 5000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  const lastData = dataPhP[dataPhP.length - 1];
  console.log("🚀 ~ Weather ~ lastData:", lastData);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("row")}>
        <div className={cx("wrapper", "container-fluid", "col-xs-6", "col-md-12")}>
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
                <h2 className={cx("text")}>Phần mềm giám sát thời tiết</h2>
              </div>
            </div>
          </header>
          <main className={cx("main")}>
            <ParammeterValue dataMysql={dataPhP} />
            <div className={cx("chart")}>
              <DataComposedChart dataMysql={dataPhP} />
              <div className={cx("card_notes")}>
                <CardNote
                  text={"MƯA"}
                  value={lastData ? (lastData.rain === "0" ? "Có mưa" : "Không có mưa") : "Chưa có dữ liệu"}
                />
                <CardNote
                  text={"TRỜI"}
                  value={lastData ? (lastData.light === "0" ? "Trời Sáng" : "Trời Tối") : "Chưa có dữ liệu"}
                />
              </div>
            </div>
            <div className={cx("histories")}>
              <SideBar dataMysql={dataPhP} />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Weather;
