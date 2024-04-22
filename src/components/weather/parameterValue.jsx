import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./weather.module.scss";

import { child, get } from "firebase/database";
import { dbRef } from "../../firebase/config";

const cx = classNames.bind(styles);

const ParammeterValue = () => {
  const [dataRealtime, setDataRealtime] = useState([]);

  const getValueRealtime = () => {
    get(child(dbRef, "/"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          setDataRealtime(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getValueRealtime();
  }, [dataRealtime]);
  return (
    <div className={cx("main_info")}>
      <div>
        <div className={cx("card")}>
          <h2>Nhiệt độ</h2>
          <p id="humidity">
            {dataRealtime && Math.round(dataRealtime.t)}
            °C
          </p>
        </div>
      </div>
      <div className={cx("card")}>
        <h2>Độ ẩm</h2>
        <p id="temperature">{dataRealtime && Math.round(dataRealtime.h)}%</p>
      </div>
    </div>
  );
};

export default ParammeterValue;
