import { dbEndpoint } from "./dbEndpoint";
import dbFetcher from "./dbFetcher";

const queryVidViewData = async (ch_seq_id: number) => {
  const getVidViewDataUrl = new URL(dbEndpoint + "/viewData");
  const params = { ch_seq_id: String(ch_seq_id) };
  getVidViewDataUrl.search = new URLSearchParams(params).toString();
  const res = await dbFetcher(getVidViewDataUrl.toString());
  const data = (await res.json()) as {
    result: dbViewDataType[];
  };
  return data.result;
};

export default queryVidViewData;
