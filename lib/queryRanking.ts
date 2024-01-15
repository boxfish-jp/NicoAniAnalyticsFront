import { db } from "./firebase";
import dbChannelType from "../types/dbChannelType";
import rankingCardSize from "@/data/rankingCardSize";

export const revalidate = 60 * 60 * 12; // 24時間
const queryRanking = async (order: string, offset: number) => {
  const getSeason = await db.collection("dbConfig").doc("nowSeason").get();
  const season = getSeason.data()?.data;
  const numCh = getSeason.data()?.numCh;
  const seasonChList = `${season}-ChList`;
  const limitNum =
    rankingCardSize + offset > Number(numCh)
      ? Number(numCh)
      : rankingCardSize + offset;

  const getRanking = await db
    .collection(seasonChList)
    .orderBy(order, "desc")
    .limit(limitNum)
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
  return { numCh: numCh, channels: dbChannels.slice(offset) };
};

export default queryRanking;
