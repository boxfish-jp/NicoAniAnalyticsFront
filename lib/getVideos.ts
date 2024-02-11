import dbVideoType from "@/types/dbVideoType";
import { db } from "./firebase";

const getVideos = async (season: string, id: string) => {
  const getVideos = await db
    .collection(season)
    .where("url", "==", "https://www.nicovideo.jp/watch/" + id)
    .get();
  if (getVideos.empty) {
    return "notFound";
  }
  const videos: dbVideoType[] = getVideos.docs.map((doc) => ({
    chId: doc.data().chId,
    comments: Number(doc.data().NumComment),
    description: doc.data().description,
    mylists: Number(doc.data().mylist),
    postDate: doc.data().postDate,
    thumb: doc.data().thumb,
    title: doc.data().title,
    update: Number(doc.data().update),
    url: doc.data().url,
    viewers: Number(doc.data().viewer),
  }));

  return videos;
};

export default getVideos;
