import dbChannelType from "../types/dbChannelType";
import { dbEndpoint } from "./dbEndpoint";
import dbFetcher from "./dbFetcher";

export const revalidate = 60 * 60 * 12; // 24時間
const queryChannel = async (ch_id: number) => {
  const getChannelUrl = new URL(dbEndpoint + "/chlist");
  const params = { ch_id: String(ch_id) };
  getChannelUrl.search = new URLSearchParams(params).toString();
  const res = await dbFetcher(getChannelUrl.toString());
  const data = (await res.json()) as { result: dbChannelType[] };
  return data.result[0];
};

export default queryChannel;
