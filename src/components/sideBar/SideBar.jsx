import classNames from "classnames/bind";
import styles from "./SideBar.module.scss";

const cx = classNames.bind(styles);

const SideBar = ({ dataMysql }) => {
  const logData = () => {
    return (
      dataMysql &&
      dataMysql.map((item, index) => {
        return (
          <table key={index}>
            <thead>
              <tr>
                <th>Thông Số</th>
                <th>Giá Trị</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>ID</td>
                <td>{index + 1}</td>
              </tr>

              <tr>
                <td>Nhiệt Độ</td>
                <td>{Number(item.temperature)}°C</td>
              </tr>
              <tr>
                <td>Độ Ẩm</td>
                <td>{Number(item.humidity)}%</td>
              </tr>
              <tr>
                <td>Bơm</td>
                <td>{item.pump === "1" ? "Bật" : "Tắt"}</td>
              </tr>
              <tr>
                <td>Áp Suất</td>
                <td>{Number(item.pressure)} Pa</td>
              </tr>
              <tr>
                <td>Mưa</td>
                <td>{item.rain === "0" ? "YES" : "NO"}</td>
              </tr>
              <tr>
                <td>Ánh Sáng</td>
                <td>{item.light === "0" ? "YES" : "NO"}</td>
              </tr>
              <tr>
                <td>Giờ</td>
                <td>{item.timestamp.split(" ")[1]}</td>
              </tr>
              <tr>
                <td>Ngày</td>
                <td>{item.timestamp.split(" ")[0]}</td>
              </tr>
            </tbody>
          </table>
        );
      })
    );
  };

  return (
    <div className={cx("container")}>
      <div className={cx("sidebar")}>
        <h1>Trạng thái</h1>
        <div className={cx("status")}>
          <div className={cx("info")}>
            <div className={cx("info__title")}>
              <div>{logData()}</div>
              {/* <span> {displayTime()}</span> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
