import { dbEndpoint } from "./dbEndpoint";
import dbVideoType from "@/types/dbVideoType";

const dbAllVideos = async () => {
  const getVideoUrl = new URL(dbEndpoint + "/videos");
  const res = await fetch(getVideoUrl.toString());
  const data = (await res.json()) as { result: dbVideoType[] };
  return data.result;
};

export default dbAllVideos;
