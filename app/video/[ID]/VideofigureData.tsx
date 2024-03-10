"use client";
import ScoreCard from "@/components/scoreCard";
import BarLineCharts from "@/components/barLineCharts";
import { useEffect, useState } from "react";

const VideoFigureData = ({
  className,
  chartsData,
}: {
  className: string;
  chartsData: {
    name: string;
    view_amount: number;
    comment_amount: number;
    mylist_amount: number;
    diff_view: number;
    diff_comment: number;
    diff_mylist: number;
  }[];
}) => {
  const [order, setOrder] = useState("再生数");
  const [charts, setCharts] = useState(
    chartsData.map((data) => ({
      name: data.name,
      barY: data.view_amount,
      lineY: data.diff_view,
    }))
  );

  useEffect(() => {
    switch (order) {
      case "再生数":
        setCharts(
          chartsData.map((data) => ({
            name: data.name,
            barY: data.diff_view,
            lineY: data.view_amount,
          }))
        );
        break;
      case "コメント数":
        setCharts(
          chartsData.map((data) => ({
            name: data.name,
            barY: data.diff_comment,
            lineY: data.comment_amount,
          }))
        );
        break;
      case "マイリスト数":
        setCharts(
          chartsData.map((data) => ({
            name: data.name,
            barY: data.diff_mylist,
            lineY: data.mylist_amount,
          }))
        );
        break;
    }
  }, [order]);

  return (
    <div className={className + " flex flex-col gap-12"}>
      <section className="grid grid-cols-2 xl:grid-cols-3 gap-8">
        <div onClick={() => setOrder("再生数")}>
          <ScoreCard
            label="再生数"
            num={chartsData[chartsData.length - 1].view_amount}
            last={0}
          />
        </div>
        <div onClick={() => setOrder("コメント数")}>
          <ScoreCard
            label="コメント数"
            num={chartsData[chartsData.length - 1].comment_amount}
            last={0}
          />
        </div>
        <div onClick={() => setOrder("マイリスト数")}>
          <ScoreCard
            label="マイリスト数"
            num={chartsData[chartsData.length - 1].comment_amount}
            last={0}
          />
        </div>
      </section>
      <section className="w-full mx-auto">
        <BarLineCharts
          barlabel={"日毎の" + order}
          linelabel={"累計" + order}
          chartsData={charts}
          className="col-span-full xl:col-span-4 h-[350px] w-full px-auto"
        />
      </section>
    </div>
  );
};

export default VideoFigureData;
