import { dbEndpoint } from "./dbEndpoint";
import { dbRankingJointType } from "@/types/dbRankingType";
import rankingCardSize from "@/data/rankingCardSize";
import queryChCount from "./queryChCount";

export const revalidate = 60 * 60 * 12; // 24時間
const queryRanking = async (
  order: string,
  offset: number,
  syear: number,
  sseason: number
) => {
  const getRankingUrl = new URL(dbEndpoint + "/ranking");
  const getRankingUrlParams = new URLSearchParams([
    ["syear", syear.toString()],
    ["sseason", sseason.toString()],
    ["raddtime", String(new Date())],
    ["offset", offset.toString()],
    ["limit", (offset + rankingCardSize).toString()],
    ["order", order],
  ]);
  getRankingUrl.search = getRankingUrlParams.toString();
  const rankingData = await fetch(getRankingUrl.href);
  const rankingJson = (await rankingData.json()) as {
    result: dbRankingJointType[];
  };
  const chAmount = await queryChCount(syear, sseason);
  return { chAmount: chAmount, channels: rankingJson.result };
};

export default queryRanking;
