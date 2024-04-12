import { dbEndpoint } from "./dbEndpoint";
import dbFetcher from "./dbFetcher";

export const revalidate = 0; // 24時間
const queryChCount = async (syear: number, sseason: number) => {
  const getChCountUrl = new URL(dbEndpoint + "/chlist");
  const getChCountUrlParams = new URLSearchParams([
    ["syear", String(syear)],
    ["sseason", String(sseason)],
    ["count", "t"],
  ]);
  getChCountUrl.search = getChCountUrlParams.toString();
  console.log(getChCountUrl.href);
  const chCountData = await dbFetcher(getChCountUrl.href);
  const chCountJson = (await chCountData.json()) as {
    result: [
      {
        "COUNT(*)": number;
      }
    ];
  };
  return chCountJson.result[0]["COUNT(*)"];
};

export default queryChCount;
