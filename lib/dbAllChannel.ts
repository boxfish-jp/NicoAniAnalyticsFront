import { dbEndpoint } from "./dbEndpoint";
import dbChannelType from "@/types/dbChannelType";
import dbFetcher from "./dbFetcher";

const dbAllChannel = async () => {
  const getChannelUrl = new URL(dbEndpoint + "/chlist");
  const res = await dbFetcher(getChannelUrl.toString());
  const data = (await res.json()) as { result: dbChannelType[] };
  return data.result;
};

export default dbAllChannel;
