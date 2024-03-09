import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import BarCharts from "@/components/barCharts";
import Header from "@/components/header";
import AnimeLinks from "@/components/animeLinks";
import BarLineCharts from "@/components/barLineCharts";
import queryVideo from "@/lib/queryVideo";
import queryVidViewData from "@/lib/queryVidViewData";

export const runtime = "edge";

const HOME = async ({ params }: { params: { ID: number } }) => {
  const before = new Date();
  const video = await queryVideo(params.ID);
  if (video == "notFound") {
    return (
      <div>
        <h1>Not Found</h1>
      </div>
    );
  }
  const viewData = await queryVidViewData(params.ID);
  const viewerData = viewData.map((v) => ({
    date: v.daddtime,
    viewers: v.view_amount,
  }));
  viewerData.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  const chartsData: { name: string; barY: number; lineY: number }[] = [];
  for (let i = 0; i < viewerData.length; i++) {
    const date = new Date(viewerData[i].date);
    const name = date.getMonth() + 1 + "/" + date.getDate();
    chartsData.push({
      name: name,
      barY:
        i == 0
          ? viewerData[i].viewers
          : viewerData[i].viewers - viewerData[i - 1].viewers,
      lineY: viewerData[i].viewers,
    });
  }

  const postedDate = new Date(video.ch_seq_posted);
  return (
    <div>
      <Header />
      <div className="grid grid-cols-12 sm:gap-8">
        <main
          className="col-span-full md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3 flex flex-col gap-12 mt-5 mb-10"
          id="main"
        >
          <h1 className=" font-bold text-3xl self-start">
            {video.ch_seq_title}
          </h1>
          <section className="grid grid-cols-6 gap-8 items-stretch">
            <div className="col-span-full md:col-span-2 flex items-center w-full">
              <Image
                className="w-full"
                src={decodeURIComponent(video.ch_seq_thumb) + ".M"}
                width={130 * 1.5}
                height={100 * 1.5}
                alt={`${video.ch_seq_title}のサムネイル`}
              />
            </div>
            <AnimeLinks
              className="col-span-full md:col-span-2"
              links={[
                { key: "動画ページ:", url: video.ch_seq_url },
                {
                  key: "チャンネルページ",
                  url: "https://ch.nicovideo.jp/ch" + video.ch_id,
                },
              ]}
            />
            <Card className="col-span-full md:col-span-2 flex flex-col gap-6 h-full items-stretch">
              <CardHeader>
                <p>公開日:{postedDate.toLocaleString()}</p>
              </CardHeader>
              <CardContent>
                <p className="mt-auto">{video.ch_seq_desc}</p>
              </CardContent>
            </Card>
            <BarLineCharts
              barlabel="日毎の再生数"
              linelabel="累計再生数"
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
