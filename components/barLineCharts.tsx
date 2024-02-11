"use client";
import { AnchorHTMLAttributes } from "react";
import {
  ComposedChart,
  Bar,
  Line,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function BarLineCharts({
  barlabel,
  linelabel,
  chartsData,
  ...props
}: {
  barlabel: string;
  linelabel: string;
  chartsData: { name: string; barY: number; lineY: number }[];
} & AnchorHTMLAttributes<HTMLElement>) {
  // 辞書のamtをlabelに変更
  console.log(chartsData);
  if (chartsData.length > 1) {
    if (
      chartsData[0].barY / chartsData[1].barY >= 100 ||
      chartsData[1].barY == 0
    ) {
      chartsData.shift();
    }
  }
  const data = chartsData.map((item) => ({
    name: item.name,
    [barlabel]: item.barY,
    [linelabel]: item.lineY,
  }));
  return (
    <div {...props}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
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
          <YAxis yAxisId="Line" />
          <YAxis yAxisId="bar" type="number" orientation="right" />
          <Tooltip />
          <Legend />
          <Bar
            yAxisId="bar"
            dataKey={barlabel}
            fill="#000000"
            activeBar={<Rectangle fill="#000000" stroke="purple" />}
          />
          <Line
            yAxisId="Line"
            type="monotone"
            dataKey={linelabel}
            stroke="#ff7300"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
