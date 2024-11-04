import classNames from "classnames/bind";
import styles from "./CardNote.module.scss";
import { useEffect } from "react";

const cx = classNames.bind(styles);

const CardNote = ({ text, value }) => {
  useEffect(() => {}, []);
  return (
    <div className={cx("container")}>
      <div className={cx("card")}>
        <div className={cx("title")}>
          <p>{text}</p>
        </div>
        <div className={cx("data")}>
          <p>{value}</p>
        </div>
      </div>
    </div>
  );
};

export default CardNote;
