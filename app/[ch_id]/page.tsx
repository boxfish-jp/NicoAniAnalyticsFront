import Header from "@/components/header";
import Image from "next/image";
import queryChannel from "@/lib/queryChannel";
import queryVideos from "@/lib/queryVideos";
import AnimeLinks from "@/components/animeLinks";
import ScoreCard from "@/components/scoreCard";
import BarCharts from "@/components/barCharts";
import AnimeLists from "@/components/animeList";
import FigureData from "./figureData";
//import ActorCards from "@/components/actorCards";
//import StaffCards from "@/components/staffCards";
import queryViewData from "@/lib/queryViewData";
import queryChRank from "@/lib/queryChRank";

export const runtime = "edge";

export const metadata = {
  title: "各チャンネルの視聴データの推移",
  description: "各チャンネルの視聴データの推移をグラフで表示します。",
};

const HOME = async ({ params }: { params: { ch_id: number } }) => {
  const channelInfo = await queryChannel(params.ch_id);
  let chartsData: {
    name: string;
    seq: number;
    view_amt: number;
    comment_amt: number;
    mylist_amt: number;
    link: number;
  }[] = [];
  let animes: { title: string; id: number; viewers: number }[] = [];
  const videos = await queryVideos(params.ch_id);
  const rank = await queryChRank(params.ch_id);
  if (videos.length > 0) {
    const viewDataes = await queryViewData(params.ch_id, videos.length);
    for (let video of videos) {
      const index = viewDataes.findIndex((v) => v.ch_seq_id == video.ch_seq_id);
      if (index == -1) {
        continue;
      }
      chartsData.push({
        name: video.ch_seq_title,
        seq: video.ch_seq,
        view_amt: viewDataes[index].view_amount,
        comment_amt: viewDataes[index].comment_amount,
        mylist_amt: viewDataes[index].mylist_amount,
        link: video.ch_seq_id,
      });
      animes.push({
        title: video.ch_seq_title,
        id: video.ch_seq_id,
        viewers: viewDataes[index].view_amount,
      });
    }
    return (
      <>
        <div>
          <Header />
          <div className="grid grid-cols-12 sm:gap-8">
            <main
              className="col-span-full md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3 flex flex-col gap-12 mt-5 mb-10"
              id="main"
            >
              <h1 className=" font-bold text-3xl self-start">
                {channelInfo.ch_title}
              </h1>
              <FigureData rank={rank} chartsData={chartsData} animes={animes} />
              <section className="grid grid-cols-6 gap-14 items-stretch">
                <div className="col-span-full lg:col-span-4 xl:col-span-3 flex items-center">
                  <Image
                    className="mx-auto"
                    src={channelInfo.ch_thumb}
                    width={500}
                    height={500}
                    alt={`${channelInfo.ch_title}のサムネイル`}
                  />
                </div>
                <AnimeLinks
                  className="col-span-full lg:col-span-2 xl:col-span-3"
                  links={[
                    { key: "ニコニコチャンネル:", url: channelInfo.ch_url },
                    {
                      key: "公式Twitter(X):",
                      url:
                        channelInfo.ch_twt != "undefined"
                          ? "https://twitter.com/" + channelInfo.ch_twt
                          : "",
                    },
                    {
                      key: "公式ホームページ:",
                      url:
                        channelInfo.ch_site != "undefined"
                          ? channelInfo.ch_site
                          : "",
                    },
                  ]}
                />
                <div className="col-span-full grid grid-cols-12 gap-12 h-auto justify-center items-start relative">
                  <p className="col-span-full md:col-span-6">
                    {channelInfo.ch_detail}
                  </p>
                  <AnimeLists
                    className="md:!absolute md:top-0 md:bottom-0 md:left-[53%] md:right-0 col-span-full md:col-span-6"
                    animes={animes}
                  />
                </div>
              </section>
              {/*<ActorCards casts={channelInfo.casts} />
              <StaffCards staffs={channelInfo.staffs} />*/}
            </main>
          </div>
        </div>
      </>
    );
  } else {
    return <p>チャンネルが見つかりませんでした。</p>;
  }
};
export default HOME;
