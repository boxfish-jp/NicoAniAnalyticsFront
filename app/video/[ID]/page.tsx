import querySeason from "@/lib/querySeason";
import getVideos from "@/lib/getVideos";
import queryChannel from "@/lib/queryChannel";
import dbVideoType from "@/types/dbVideoType";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import BarCharts from "@/components/barCharts";
import Header from "@/components/header";
import AnimeLinks from "@/components/animeLinks";

const HOME = async ({ params }: { params: { ID: string } }) => {
  const before = new Date();
  const season = await querySeason();
  const videos = await getVideos(season, params.ID);
  if (videos == "notFound") {
    return (
      <div>
        <h1>Not Found</h1>
      </div>
    );
  }
  const channelInfo = await queryChannel(season, videos[0].chId);
  if (channelInfo == "notFound") {
    return (
      <div>
        <h1>Not Found</h1>
      </div>
    );
  }
  const viewerData = videos.map((video) => ({
    date: video.update,
    viewers: video.viewers,
  }));
  viewerData.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  const chartsData: { name: string; amt: number }[] = [];
  for (let i = 0; i < viewerData.length; i++) {
    const date = new Date(viewerData[i].date);
    const name = date.getMonth() + 1 + "/" + date.getDate();
    chartsData.push({
      name: name,
      amt: viewerData[i].viewers,
    });
  }

  const postedDate = new Date(videos[0].postDate._seconds * 1000);
  return (
    <div>
      <Header />
      <div className="grid grid-cols-12 sm:gap-8">
        <main
          className="col-span-full md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3 flex flex-col gap-12 mt-5 mb-10"
          id="main"
        >
          <h1 className=" font-bold text-3xl self-start">{videos[0].title}</h1>
          <section className="grid grid-cols-6 gap-8 items-stretch">
            <div className="col-span-full md:col-span-2 flex items-center w-full">
              <Image
                className="w-full"
                src={videos[0].thumb + ".M"}
                width={130 * 1.5}
                height={100 * 1.5}
                alt={`${videos[0].thumb}のサムネイル`}
              />
            </div>
            <AnimeLinks
              className="col-span-full md:col-span-2"
              links={[
                { key: "動画ページ:", url: videos[0].url },
                { key: "チャンネルページ", url: channelInfo.chUrl },
              ]}
            />
            <Card className="col-span-full md:col-span-2 flex flex-col gap-6 h-full items-stretch">
              <CardHeader>
                <p>公開日:{postedDate.toLocaleString()}</p>
              </CardHeader>
              <CardContent>
                <p className="mt-auto">{videos[0].description}</p>
              </CardContent>
            </Card>
            <BarCharts
              label="再生数"
              chartsData={chartsData}
              className="col-span-full xl:col-span-4 h-[350px]"
            />
          </section>
        </main>
      </div>
    </div>
  );
};

export default HOME;
