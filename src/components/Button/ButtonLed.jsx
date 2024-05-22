import classNames from "classnames/bind";
import styles from "./button.module.scss";

const cx = classNames.bind(styles);

const Button = ({ content, handleCheckboxChange, isChecked }) => {
  console.log(isChecked);

  return (
    <div className={cx("container")}>
      <div className={cx("btn")}>
        <p>{content}</p>
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
