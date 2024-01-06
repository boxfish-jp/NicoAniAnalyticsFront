import { db } from "./firebase";
import dbChannelType from "../types/dbChannelType";

export const revalidate = 60 * 60 * 12; // 24時間
const queryRanking = async (order: string) => {
  const getSeason = await db.collection("dbConfig").doc("nowSeason").get();
  const season = getSeason.data()?.data;
  const seasonChList = `${season}-ChList`;

  const getRanking = await db
    .collection(seasonChList)
    .orderBy(order, "desc")
    .limit(10)
    .get();

  const dbChannels: dbChannelType[] = [];
  getRanking.forEach((doc) => {
    dbChannels.push({
      aveComments: Number(doc.data().aveComments),
      aveMylists: Number(doc.data().aveMylists),
      aveViewers: Number(doc.data().aveViewers),
      chUrl: doc.data().chUrl,
      detail: doc.data().detail,
      thumb: doc.data().thumb,
      title: doc.data().title,
    });
  });
  return dbChannels;
};

export default queryRanking;
