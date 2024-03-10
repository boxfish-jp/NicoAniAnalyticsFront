"use client";
import ScoreCard from "@/components/scoreCard";
import BarCharts from "@/components/barCharts";
import AnimeLists from "@/components/animeList";
import { dbRankingType } from "@/types/dbRankingType";
import { useEffect, useState } from "react";

const FigureData = ({
  rank,
  chartsData,
  animes,
}: {
  rank: dbRankingType;
  chartsData: {
    name: string;
    view_amt: number;
    comment_amt: number;
    mylist_amt: number;
    link: number;
  }[];
  animes: { title: string; id: number; viewers: number }[];
}) => {
  console.log(chartsData);
  const [order, setOrder] = useState("再生数");
  const [charts, setCharts] = useState(
    chartsData.map((data) => ({
      name: data.name,
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
            amt: data.view_amt,
            link: data.link,
          }))
        );
        break;
      case "コメント数":
        setCharts(
          chartsData.map((data) => ({
            name: data.name,
            amt: data.comment_amt,
            link: data.link,
          }))
        );
        break;
      case "マイリスト数":
        setCharts(
          chartsData.map((data) => ({
            name: data.name,
            amt: data.mylist_amt,
            link: data.link,
          }))
        );
        break;
    }
  }, [order]);

  return (
    <>
      <section className="grid grid-cols-2 xl:grid-cols-3 gap-8">
        <div onClick={() => setOrder("再生数")}>
          <ScoreCard
            label="平均再生数"
            num={rank.r_ave_view}
            last={rank.r_diff_view}
          />
        </div>
        <div onClick={() => setOrder("コメント数")}>
          <ScoreCard
            label="平均コメント数"
            num={rank.r_ave_comment}
            last={rank.r_diff_comment}
          />
        </div>
        <div onClick={() => setOrder("マイリスト数")}>
          <ScoreCard
            label="平均マイリスト数"
            num={rank.r_ave_mylist}
            last={rank.r_diff_mylist}
          />
        </div>
      </section>
      <section className="grid grid-cols-7 gap-8">
        <BarCharts
          label={order}
          chartsData={charts}
          className="col-span-full xl:col-span-4 h-[450px]"
        />
        <AnimeLists
          animes={animes}
          className="col-span-full xl:col-span-3 h-[450px]"
        />
      </section>
    </>
  );
};

export default FigureData;
