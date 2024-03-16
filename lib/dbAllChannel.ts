import exp from "constants";
import { dbEndpoint } from "./dbEndpoint";
import dbChannelType from "@/types/dbChannelType";

const dbAllChannel = async () => {
  const getChannelUrl = new URL(dbEndpoint + "/chlist");
  const res = await fetch(getChannelUrl.toString());
  const data = (await res.json()) as { result: dbChannelType[] };
  return data.result;
};

export default dbAllChannel;
