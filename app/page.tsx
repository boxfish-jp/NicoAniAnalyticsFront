import Image from "next/image";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Home = async () => {
  const display = await datafetch();
  return (
    <>
      <Button>これはボタン</Button>
      <h1>{display}</h1>
    </>
  );
};

const datafetch = async () => {
  const getSeason = (
    await db.collection("dbConfig").doc("nowSeason").get()
  ).data();
  const nowSeason = String(getSeason?.data);

  const getChannelIds = await db.collection(nowSeason + "-ChList").get();
  const channelIds = getChannelIds.docs.map((doc) => doc.id);

  const umamusume = channelIds[4];

  const umaquery = await db
    .collection(nowSeason)
    .where("channel", "==", umamusume)
    .get();

  umaquery.forEach((doc) => {
    console.log(doc.data()?.viewer);
  });

  return nowSeason;
};

export default Home;
