import { dbEndpoint } from "./dbEndpoint";
import dbVideoType from "@/types/dbVideoType";
import dbFetcher from "./dbFetcher";

const dbAllVideos = async () => {
  const getVideoUrl = new URL(dbEndpoint + "/videos");
  const res = await dbFetcher(getVideoUrl.toString());
  const data = (await res.json()) as { result: dbVideoType[] };
  return data.result;
};

export default dbAllVideos;
