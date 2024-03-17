import { dbEndpoint } from "./dbEndpoint";
import dbFetcher from "./dbFetcher";
import dbVideoType from "@/types/dbVideoType";

const queryVideos = async (ch_id?: number) => {
  const getChannelUrl = new URL(dbEndpoint + "/videos");
  const params = { ch_id: String(ch_id) };
  getChannelUrl.search = new URLSearchParams(params).toString();
  const res = await dbFetcher(getChannelUrl.href);
  const data = (await res.json()) as { result: dbVideoType[] };
  return data.result;
};

export default queryVideos;
