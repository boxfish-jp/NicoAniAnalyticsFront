import { dbEndpoint } from "./dbEndpoint";
import dbFetcher from "./dbFetcher";
import { dbRankingJointType } from "@/types/dbRankingType";
import rankingCardSize from "@/data/rankingCardSize";
import queryChCount from "./queryChCount";

const queryOldRanking = async (
  order: string,
  offset: number,
  syear: number,
  sseason: number,
  raddtime: Date
) => {
  const getRankingUrl = new URL(dbEndpoint + "/ranking");
  const getRankingUrlParams = new URLSearchParams([
    ["syear", syear.toString()],
    ["sseason", sseason.toString()],
    ["raddtime", String(new Date(raddtime))],
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

export default queryOldRanking;
