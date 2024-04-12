import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import axios from "axios";
import "../../../../node_modules/bootstrap/scss/bootstrap.scss";
import styles from "./weather.module.scss";

import { dbRef } from "../../../firebase/config";
import { child, get } from "firebase/database";

const cx = classNames.bind(styles);

const Weather = () => {
  const [dataValue, setDataValue] = useState([]);

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

  useEffect(() => {
    getValue();
  }, []);
  return (
    <div className={cx("container")}>
      <div class={cx("row")}>
        <div class={cx("wrapper", "container-fluid", "col-xs-6", "col-md-12")}>
          <div class={cx("logo")}>
            <img class={cx("img")} src="./img/uneti.jpg" alt="" />
          </div>
          <header class={cx("header")}>
            <div class="title">
              <h1 class={cx("text")}>KHOA ĐIỆN TỬ & KĨ THUẬT MÁY TÍNH</h1>
            </div>
            <div class={cx("images")}>
              <div class={cx("background")}>
                <img src="./img/image1.jpg" alt="" />
              </div>
              <div class="banner">
                <img class="img banner" src="./img/logo.jpg" alt="" />
              </div>
              <div class="background">
                <img src="./img/image2.jpg" alt="" />
              </div>
            </div>
          </header>
          <main class="main">
            <section class="wrapper" style="background-color: tranparent">
              <div class="container h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                  <div class="col-md-12 col-lg-6 col-xl-12">
                    <div
                      class="card"
                      style="color: #4b515d; border-radius: 35px"
                    >
                      <div class="card-body p-4">
                        <div class="d-flex text-center">
                          <h6 class="flex-grow-1">Nhiệt độ</h6>
                        </div>
                        <div class="d-flex flex-column text-center mt-5 mb-4">
                          <h6
                            id="temperature"
                            class="display-4 mb-0 font-weight-bold"
                            style="color: #1c2331"
                          >
                            13°C
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section class="wrapper" style="background-color: tranparent">
              <div class="container py-5 h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                  <div class="col-md-12 col-lg-6 col-xl-12">
                    <div
                      class="card"
                      style="color: #4b515d; border-radius: 35px"
                    >
                      <div class="card-body p-4">
                        <div class="d-flex text-center">
                          <h6 class="flex-grow-1">Độ ẩm</h6>
                        </div>
                        <div class="d-flex flex-column text-center mt-5 mb-4">
                          <h6
                            id="humidity"
                            class="display-4 mb-0 font-weight-bold"
                            style="color: #1c2331"
                          >
                            100%
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section class="wrapper" style="background-color: tranparent">
              <div class="container py-5 h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                  <div class="col-md-12 col-lg-6 col-xl-12">
                    <div
                      class="card"
                      style="color: #4b515d; border-radius: 35px"
                    >
                      <div class="card-body p-4">
                        <div class="d-flex text-center">
                          <h6 class="flex-grow-1">Ánh sáng</h6>
                        </div>
                        <div class="d-flex flex-column text-center mt-5 mb-4">
                          <h6
                            id="light"
                            class="display-4 mb-0 font-weight-bold"
                            style="color: #1c2331"
                          >
                            Đỏ
                          </h6>
                        </div>
                      </div>
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
          </div>
        </div>
      </div>
      <div className="chart">
        <canvas id="myChart"></canvas>
      </div>
    </div>
  );
};

export default Weather;
