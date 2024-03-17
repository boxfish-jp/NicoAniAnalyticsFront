import { dbEndpoint } from "./dbEndpoint";
import dbVideoType from "../types/dbVideoType";
import dbFetcher from "./dbFetcher";

const queryVideo = async (ch_seq_id: number) => {
  const getVideoUrl = new URL(dbEndpoint + "/videos");
  const params = { ch_seq_id: String(ch_seq_id) };
  getVideoUrl.search = new URLSearchParams(params).toString();
  const res = await dbFetcher(getVideoUrl.toString());
  const data = (await res.json()) as { result: dbVideoType[] };
  if (data.result.length == 0) {
    return "notFound";
  }
  return data.result[0];
};

export default queryVideo;
