"use client";
import ScoreCard from "@/components/scoreCard";
import BarCharts from "@/components/barCharts";
import AnimeLists from "@/components/animeList";
import { dbRankingType } from "@/types/dbRankingType";
import { useState } from "react";

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
  const [charts, setCharts] = useState(
    chartsData.map((data) => ({
      name: data.name,
      amt: data.view_amt,
      link: data.link,
    }))
  );

  return (
    <>
      <section className="grid grid-cols-2 xl:grid-cols-3 gap-8">
        <div
          onClick={() =>
            setCharts(
              chartsData.map((data) => ({
                name: data.name,
                amt: data.view_amt,
                link: data.link,
              }))
            )
          }
        >
          <ScoreCard
            label="平均再生数"
            num={rank.r_ave_view}
            last={rank.r_diff_view}
          />
        </div>
        <div
          onClick={() =>
            setCharts(
              chartsData.map((data) => ({
                name: data.name,
                amt: data.comment_amt,
                link: data.link,
              }))
            )
          }
        >
          <ScoreCard
            label="平均コメント数"
            num={rank.r_ave_comment}
            last={rank.r_diff_comment}
          />
        </div>
        <div
          onClick={() =>
            setCharts(
              chartsData.map((data) => ({
                name: data.name,
                amt: data.mylist_amt,
                link: data.link,
              }))
            )
          }
        >
          <ScoreCard
            label="平均マイリスト数"
            num={rank.r_ave_mylist}
            last={rank.r_diff_mylist}
          />
        </div>
      </section>
      <section className="grid grid-cols-7 gap-8">
        <BarCharts
          label="再生数"
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
