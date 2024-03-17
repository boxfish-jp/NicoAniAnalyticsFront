import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Header from "@/components/header";
import AnimeLinks from "@/components/animeLinks";
import VideoFigureData from "./VideofigureData";
import queryVideo from "@/lib/queryVideo";
import queryVidViewData from "@/lib/queryVidViewData";
import dbAllVideos from "@/lib/dbAllVideos";

export const dynamicParams = false;

export const metadata = {
  title: "各動画の視聴データの推移",
  description: "各動画の視聴データの推移をグラフで表示します。",
};

export async function generateStaticParams() {
  const videos = await dbAllVideos();
  return videos.map((video) => ({ ID: String(video.ch_seq_id) }));
}

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
  viewData.sort(
    (a, b) => new Date(a.daddtime).getTime() - new Date(b.daddtime).getTime()
  );
  const chartsData: {
    name: string;
    view_amount: number;
    comment_amount: number;
    mylist_amount: number;
    diff_view: number;
    diff_comment: number;
    diff_mylist: number;
  }[] = [];
  for (let i = 0; i < viewData.length; i++) {
    const view = viewData[i];
    const date = new Date(view.daddtime);
    const name = date.getMonth() + 1 + "/" + date.getDate();
    chartsData.push({
      name: name,
      view_amount: view.view_amount,
      comment_amount: view.comment_amount,
      mylist_amount: view.mylist_amount,
      diff_view:
        i != 0
          ? view.view_amount - viewData[i - 1].view_amount
          : view.view_amount,
      diff_comment:
        i != 0
          ? view.comment_amount - viewData[i - 1].comment_amount
          : view.comment_amount,
      diff_mylist:
        i != 0
          ? view.mylist_amount - viewData[i - 1].mylist_amount
          : view.mylist_amount,
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
            <VideoFigureData
              className="col-span-full md:col-span-6"
              chartsData={chartsData}
            />
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
          </section>
        </main>
      </div>
    </div>
  );
};

export default HOME;
