import { db } from "./firebase";
import dbVideoType from "../types/dbVideoType";
const queryVideo = async (
  season: string,
  id: string,
  mon: number,
  day: number
) => {
  const getVideo = await db.collection(season).doc(`${id}-${mon}-${day}`).get();
  if (!getVideo.exists) {
    return "notFound";
  }
  const video: dbVideoType = {
    chId: getVideo.data()?.chId,
    comments: Number(getVideo.data()?.NumComment),
    description: getVideo.data()?.description,
    mylists: Number(getVideo.data()?.mylist),
    postDate: getVideo.data()?.postDate,
    thumb: getVideo.data()?.thumb,
    title: getVideo.data()?.title,
    update: Number(getVideo.data()?.update),
    url: getVideo.data()?.url,
    viewers: Number(getVideo.data()?.viewer),
  };
  return video;
};

export default queryVideo;
