import Header from "@/components/header";
import Image from "next/image";
import queryChannel from "@/lib/queryChannel";
import queryVideos from "@/lib/queryVideos";
import AnimeLinks from "@/components/animeLinks";
import ScoreCard from "@/components/scoreCard";
import BarCharts from "@/components/barCharts";
import AnimeLists from "@/components/animeList";
//import ActorCards from "@/components/actorCards";
//import StaffCards from "@/components/staffCards";
import queryViewData from "@/lib/queryViewData";
import queryChRank from "@/lib/queryChRank";

export const runtime = "edge";

const HOME = async ({ params }: { params: { ch_id: number } }) => {
  const before = new Date();
  const channelInfo = await queryChannel(params.ch_id);
  let chartsData: { name: string; amt: number; link: number }[] = [];
  let animes: { title: string; id: number; viewers: number }[] = [];
  const videos = await queryVideos(params.ch_id);
  const rank = await queryChRank(params.ch_id);
  if (videos.length > 0) {
    const viewDataes = await queryViewData(params.ch_id, videos.length);
    for (let i = 0; i < videos.length; i++) {
      const index = viewDataes.findIndex(
        (v) => v.ch_seq_id === viewDataes[i].ch_seq_id
      );
      chartsData.push({
        name: videos[i].ch_seq + "話",
        amt: viewDataes[index].view_amount,
        link: videos[i].ch_seq_id,
      });
      animes.push({
        title: videos[i].ch_seq_title,
        id: videos[i].ch_seq_id,
        viewers: viewDataes[index].view_amount,
      });
    }
    const after = new Date();
    const time = after.getTime() - before.getTime();
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
              <section className="grid grid-cols-6 gap-8 items-stretch">
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
                      url: "https://twitter.com/" + channelInfo.ch_twt,
                    },
                    { key: "公式ホームページ:", url: channelInfo.ch_site },
                  ]}
                />
                <div className="col-span-full flex flex-col gap-6 h-full items-stretch">
                  <p className="mt-auto">{channelInfo.ch_detail}</p>
                </div>
              </section>
              <section className="grid grid-cols-2 xl:grid-cols-3 gap-8">
                <ScoreCard
                  label="平均再生数"
                  num={rank.r_ave_view}
                  last={rank.r_diff_view}
                />
                <ScoreCard
                  label="平均コメント数"
                  num={rank.r_ave_comment}
                  last={rank.r_diff_comment}
                />
                <ScoreCard
                  label="平均マイリスト数"
                  num={rank.r_ave_mylist}
                  last={rank.r_diff_mylist}
                />
              </section>
              <section className="grid grid-cols-7 gap-8">
                <BarCharts
                  label="再生数"
                  chartsData={chartsData}
                  className="col-span-full xl:col-span-4 h-[450px]"
                />
                <AnimeLists
                  animes={animes}
                  className="col-span-full xl:col-span-3 h-[450px]"
                />
              </section>
              {/*<ActorCards casts={channelInfo.casts} />
              <StaffCards staffs={channelInfo.staffs} />*/}
            </main>
          </div>

          <p className="mx-auto w-fit">{time}</p>
        </div>
      </>
    );
  } else {
    return <p>チャンネルが見つかりませんでした。</p>;
  }
};
export default HOME;
