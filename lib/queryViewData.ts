import { dbEndpoint } from "./dbEndpoint";
import dbFetcher from "./dbFetcher";

const queryViewData = async (ch_id: number, limit: number) => {
  const getViewDataUrl = new URL(dbEndpoint + "/viewData");
  const params = { ch_id: String(ch_id), limit: String(limit) };
  getViewDataUrl.search = new URLSearchParams(params).toString();
  const res = await dbFetcher(getViewDataUrl.toString());
  const data = (await res.json()) as { result: dbViewDataType[] };
  return data.result;
};

export default queryViewData;
