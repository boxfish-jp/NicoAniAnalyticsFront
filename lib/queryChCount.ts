import { dbEndpoint } from "./dbEndpoint";

const queryChCount = async (syear: number, sseason: number) => {
  const getChCountUrl = new URL(dbEndpoint + "/chlist");
  const getChCountUrlParams = new URLSearchParams([
    ["syear", String(syear)],
    ["sseason", String(sseason)],
    ["count", "t"],
  ]);
  getChCountUrl.search = getChCountUrlParams.toString();
  const chCountData = await fetch(getChCountUrl.href);
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
