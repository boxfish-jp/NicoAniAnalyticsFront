"use client";
import { AnchorHTMLAttributes } from "react";
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
  chartsData: { name: string; amt: number }[];
} & AnchorHTMLAttributes<HTMLElement>) {
  // 辞書のamtをlabelに変更
  const data = chartsData.map((item) => ({
    name: item.name,
    [label]: item.amt,
  }));
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
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
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
