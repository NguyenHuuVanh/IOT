import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./weather.module.scss";

import { getDatabase, child, get, set, ref, update } from "firebase/database";
import { dbRef } from "../../firebase/config";
import Button from "../Button/ButtonLed";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const cx = classNames.bind(styles);

const ParammeterValue = () => {
  const [dataRealtime, setDataRealtime] = useState([]);
  const [warningDisplayed, setWarningDisplayed] = useState(false);
  const [isCheckedFan, setIsCheckedFan] = useState(false);
  const [isCheckedLed1, setIsCheckedLed1] = useState(false);
  const [isCheckedLed2, setIsCheckedLed2] = useState(false);
  const [isCheckedLed3, setIsCheckedLed3] = useState(false);

  const notify = () => {
    if (dataRealtime.gasConcentration > 2000) {
      toast.warn("Khí gas quá cao!!!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setWarningDisplayed(true);
    } else {
      if (warningDisplayed) {
        toast.dismiss();
        setWarningDisplayed(false);
      }
    }
  };

  const getValueRealtime = () => {
    get(child(dbRef, "/data"))
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

  const updatedDataFan = (value) => {
    const db = getDatabase();
    update(ref(db, "data/"), {
      fan: value,
    });
  };

  const updatedDataLed1 = (value) => {
    const db = getDatabase();
    update(ref(db, "data/"), {
      led1State: value,
    });
  };

  const updatedDataLed2 = (value) => {
    const db = getDatabase();
    update(ref(db, "data/"), {
      led2State: value,
    });
  };

  const updatedDataLed3 = (value) => {
    const db = getDatabase();
    update(ref(db, "data/"), {
      led3State: value,
    });
  };

  useEffect(() => {
    getValueRealtime();
    notify();
  }, [dataRealtime]);
  return (
    <div className={cx("main_info")}>
      <div>
        <div className={cx("card")}>
          <h2>Nhiệt độ</h2>
          <p id="humidity">
            {dataRealtime && Math.round(dataRealtime.temperature)}
            °C
          </p>
        </div>
      </div>
      <div className={cx("card")}>
        <h2>Độ ẩm</h2>
        <p id="temperature">
          {dataRealtime && Math.round(dataRealtime.humidity)}%
        </p>
      </div>
      <div className={cx("card")}>
        <h2>Khí gas</h2>
        <p id="temperature">
          {dataRealtime && Math.round(dataRealtime.gasConcentration)}
        </p>
      </div>
      <div className={cx("button")}>
        <Button
          content={"FAN"}
          handleCheckboxChange={(e) => {
            setIsCheckedFan(e.target.checked);
          }}
          isChecked={isCheckedFan}
          onClick={updatedDataFan(isCheckedFan ? 1 : 0)}
        />
        <Button
          content={"LED1"}
          handleCheckboxChange={(e) => {
            setIsCheckedLed1(e.target.checked);
          }}
          isChecked={isCheckedLed1}
          onClick={updatedDataLed1(isCheckedLed1 ? 1 : 0)}
        />
        <Button
          content={"LED2"}
          handleCheckboxChange={(e) => {
            setIsCheckedLed2(e.target.checked);
          }}
          isChecked={isCheckedLed2}
          onClick={updatedDataLed2(isCheckedLed2 ? 1 : 0)}
        />
        <Button
          content={"LED3"}
          handleCheckboxChange={(e) => {
            setIsCheckedLed3(e.target.checked);
          }}
          isChecked={isCheckedLed3}
          onClick={updatedDataLed3(isCheckedLed3 ? 1 : 0)}
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default ParammeterValue;
