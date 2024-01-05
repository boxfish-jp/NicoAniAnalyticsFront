import { db } from "./firebase";
import dbChannelType from "../types/dbChannelType";

const queryRanking = async (order: string) => {
  const getRanking = await db
    .collection("2024-winter-ChList")
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
