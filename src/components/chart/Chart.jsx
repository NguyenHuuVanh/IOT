import React from "react";
import { ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const DataComposedChart = ({ dataMysql }) => {
  console.log(dataMysql);
  const showValues = () => {
    const data =
      dataMysql &&
      dataMysql.map((item, index) => {
        return {
          ...item,
          name: item.timestamp.split(" ")[1].substring(0, 5),
          Temperature: Number(item.temperature),
          Humidity: Number(item.humidity),
          Pressure: Number(item.pressure) / 1000,
        };
      });
    return data.slice(-20);
  };

  const data = showValues();
  return (
    <ComposedChart
      width={800}
      height={500}
      data={data}
      margin={{
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
      }}
    >
      <CartesianGrid stroke="#f5f5f5" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Area type="monotone" dataKey="Temperature" fill="#27ae60" stroke="#27ae60" />
      <Bar dataKey="Humidity" barSize={20} fill="#413ea0" />
      <Line type="monotone" dataKey="Pressure" stroke="#ff7300" />
    </ComposedChart>
  );
};

export default DataComposedChart;
