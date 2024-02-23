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
    NaniTag: getChannel.id,
    chUrl: getChannel.data()?.chUrl,
    detail: getChannel.data()?.detail,
    thumb: getChannel.data()?.thumb,
    title: getChannel.data()?.title,
    videoIds: getChannel.data()?.videoIds,
    latestFree: getChannel.data()?.latestFree,
    premium: getChannel.data()?.premium,
    site: getChannel.data()?.site,
    twitter: getChannel.data()?.twitter,
    casts: getChannel.data()?.casts,
    staffs: getChannel.data()?.staffs,
  };
  return dbChannel;
};

export default queryChannel;
