import { dbSeasonType } from "@/types/dbSeasonType";
import { dbEndpoint } from "./dbEndpoint";
import dbFetcher from "./dbFetcher";

const queryLatestSeason = async () => {
  const getSeasonURL = new URL(dbEndpoint + "/season");
  const getSeason = await dbFetcher(getSeasonURL.href);
  const seasonData = (await getSeason.json()) as { result: dbSeasonType[] };
  if (seasonData.result.length === 0) {
    throw new Error("season data is empty");
  }
  let latestSeason = seasonData.result[0];
  for (let season of seasonData.result) {
    if (
      season.syear > latestSeason.syear &&
      season.sseason > latestSeason.sseason
    ) {
      latestSeason = season;
    }
  }
  return latestSeason;
};
export { queryLatestSeason };
