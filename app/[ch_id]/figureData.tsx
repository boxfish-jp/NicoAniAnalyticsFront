"use client";
import ScoreCard from "@/components/scoreCard";
import BarCharts from "@/components/barCharts";
import { dbRankingType } from "@/types/dbRankingType";
import { useEffect, useState } from "react";
import dbAllChannel from "@/lib/dbAllChannel";

const FigureData = ({
  rank,
  chartsData,
  animes,
}: {
  rank: dbRankingType;
  chartsData: {
    name: string;
    seq: number;
    view_amt: number;
    comment_amt: number;
    mylist_amt: number;
    link: number;
  }[];
  animes: { title: string; id: number; viewers: number }[];
}) => {
  // 再生維持率の導出
  let retRate: number;
  if (rank.r_current_seq == 1) {
    retRate = 100;
  } else if (rank.r_current_seq == 2) {
    retRate = (chartsData[1].view_amt / chartsData[0].view_amt) * 100;
  } else {
    retRate =
      ((chartsData[chartsData.length - 1].view_amt +
        chartsData[chartsData.length - 2].view_amt) /
        2 /
        chartsData[0].view_amt) *
      100;
  }
  // 再生維持率の導出
  const [order, setOrder] = useState("再生数");
  const [charts, setCharts] = useState(
    chartsData.map((data) => ({
      name: data.name,
      seq: data.seq,
      amt: data.view_amt,
      link: data.link,
    }))
  );

  useEffect(() => {
    switch (order) {
      case "再生数":
        setCharts(
          chartsData.map((data) => ({
            name: data.name,
            seq: data.seq,
            amt: data.view_amt,
            link: data.link,
          }))
        );
        break;
      case "コメント数":
        setCharts(
          chartsData.map((data) => ({
            name: data.name,
            seq: data.seq,
            amt: data.comment_amt,
            link: data.link,
          }))
        );
        break;
      case "マイリスト数":
        setCharts(
          chartsData.map((data) => ({
            name: data.name,
            seq: data.seq,
            amt: data.mylist_amt,
            link: data.link,
          }))
        );
        break;
    }
  }, [order]);

  return (
    <>
      <BarCharts
        label={order}
        chartsData={charts}
        className="col-span-full xl:col-span-4 h-[450px]"
      />
      <section className="grid grid-cols-2 xl:grid-cols-4 gap-8">
        <div onClick={() => setOrder("再生数")}>
          <ScoreCard
            label="平均再生数"
            num={rank.r_ave_view}
            unit="再生"
            last={rank.r_diff_view}
            className="hover:bg-gray-100"
          />
        </div>
        <div onClick={() => setOrder("コメント数")}>
          <ScoreCard
            label="平均コメント数"
            num={rank.r_ave_comment}
            unit={"コメ"}
            last={rank.r_diff_comment}
            className="hover:bg-gray-100"
          />
        </div>
        <div onClick={() => setOrder("マイリスト数")}>
          <ScoreCard
            label="平均マイリスト数"
            num={rank.r_ave_mylist}
            unit={"マイリス"}
            last={rank.r_diff_mylist}
            className="hover:bg-gray-100"
          />
        </div>
        <div>
          <ScoreCard
            label="再生維持率 (第一話と最新話の再生数比)"
            num={retRate}
            unit="%"
            last={0}
            className="h-full"
          />
        </div>
      </section>
    </>
  );
};

export default FigureData;
