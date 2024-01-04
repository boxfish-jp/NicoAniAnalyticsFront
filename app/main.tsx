import Ranking from "@/components/ranking";
import { db } from "@/lib/firebase";
import dbChannelType from "@/types/dbChannelType";

const Main = async () => {
  const getRanking = await db
    .collection("2024-winter-ChList")
    .orderBy("aveViewers", "desc")
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

  return (
    <div className="w-full">
      <div className="grid grid-cols-12 sm:gap-8">
        <main
          className="col-span-full md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3 flex flex-col gap-22"
          id="main"
        >
          <Ranking channels={dbChannels} />
        </main>
      </div>
    </div>
  );
};

export default Main;
