import { db } from "./firebase";
import dbChannelType from "../types/dbChannelType";

export const revalidate = 60 * 60 * 12; // 24時間
const queryChannel = async (season: string, Id: string) => {
  const seasonChList = `${season}-ChList`;
  const getChannel = await db.collection(seasonChList).doc(Id).get();
  if (!getChannel.exists) {
    return "notFound";
  }
  const dbChannel: dbChannelType = {
    aveComments: Number(getChannel.data()?.aveComments),
    aveMylists: Number(getChannel.data()?.aveMylists),
    aveViewers: Number(getChannel.data()?.aveViewers),
    chUrl: getChannel.data()?.chUrl,
    detail: getChannel.data()?.detail,
    thumb: getChannel.data()?.thumb,
    title: getChannel.data()?.title,
    videoIds: getChannel.data()?.videoIds,
  };
  return dbChannel;
};

export default queryChannel;
