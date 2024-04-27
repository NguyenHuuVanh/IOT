import { useState } from "react";
import classNames from "classnames/bind";
import styles from "./button.module.scss";

import { child, get, set, update } from "firebase/database";
import { dbRef } from "../../firebase/config";

const cx = classNames.bind(styles);

const Button = () => {
  const [isChecked, setIsChecked] = useState(false);
console.log(isChecked)
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
    
  };


  const updateData = () => {
    update(child(dbRef, "/data"), {
     if(isChecked){
      ledSateL=1
     }
     else{
      ledSate=0
     }
    })
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          // setDataRealtime(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className={cx("container")}>
      <div className={cx("btn")}>
        <p>fan</p>
        <label className={cx("switch")}>
          <input
            type="checkbox"
            id="togBtn"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <div className={cx("slider", "round")}>
            <span className={cx("on")}>ON</span>
            <span className={cx("off")}>OFF</span>
          </div>
        </label>
      </div>
    </div>
  );
};

export default Button;
