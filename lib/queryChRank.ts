import { dbEndpoint } from "./dbEndpoint";
import { dbRankingType } from "@/types/dbRankingType";

const queryChRank = async (ch_id: number) => {
  const getRankingUrl = new URL(dbEndpoint + "/ranking");
  const getRankingUrlParams = new URLSearchParams([
    ["ch_id", ch_id.toString()],
    ["raddtime", String(new Date())],
  ]);
  getRankingUrl.search = getRankingUrlParams.toString();
  const rankingData = await fetch(getRankingUrl.href);
  const rankingJson = (await rankingData.json()) as {
    result: dbRankingType[];
  };
  if (rankingJson.result.length === 0) {
    return {
      ranking_id: 0,
      ch_id: 0,
      raddtime: new Date(),
      r_current_seq: 0,
      r_total_view: 0,
      r_total_comment: 0,
      r_total_mylist: 0,
      r_ave_view: 0,
      r_ave_comment: 0,
      r_ave_mylist: 0,
      r_ave_view_rank: 0,
      r_ave_comment_rank: 0,
      r_ave_mylist_rank: 0,
      r_diff_view: 0,
      r_diff_comment: 0,
      r_diff_mylist: 0,
    };
  }
  return rankingJson.result[0];
};

export default queryChRank;
