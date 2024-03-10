"use client";
import { AnchorHTMLAttributes, useEffect } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function BarCharts({
  label,
  chartsData,
  ...props
}: {
  label: string;
  chartsData: { name: string; amt: number; link: number }[];
} & AnchorHTMLAttributes<HTMLElement>) {
  // 辞書のamtをlabelに変更
  const data = chartsData.map((item) => ({
    name: item.name,
    [label]: item.amt,
    link: item.link != undefined ? item.link : "",
  }));
  const handleBarClick = (data: any, index: any) => {
    // クリックされた棒のデータを取得して処理する
    chartsData.forEach((item) => {
      if (item.name === data.activeLabel) {
        if (item.link != undefined) {
          window.open(
            window.location.protocol +
              "//" +
              window.location.host +
              "/video/" +
              item.link,
            "_blank"
          );
        }
      }
    });
  };
  return (
    <div {...props}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={350}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          onClick={handleBarClick}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            tickFormatter={(value, index) => "第" + String(index + 1) + "話"}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey={label}
            fill="#000000"
            activeBar={<Rectangle fill="#000000" stroke="purple" />}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
