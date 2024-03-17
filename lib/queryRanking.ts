import { dbEndpoint } from "./dbEndpoint";
import dbFetcher from "./dbFetcher";
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
    ["raddtime", new Date().toLocaleString("sv-SE", { timeZone: "UTC" })],
    ["offset", offset.toString()],
    ["limit", rankingCardSize.toString()],
    ["order", order],
  ]);
  getRankingUrl.search = getRankingUrlParams.toString();
  const rankingData = await dbFetcher(getRankingUrl.href);
  const rankingJson = (await rankingData.json()) as {
    result: dbRankingJointType[];
  };
  const chAmount = await queryChCount(syear, sseason);
  return { chAmount: chAmount, channels: rankingJson.result };
};

export default queryRanking;
