import Header from "@/components/header";
import Image from "next/image";
import querySeason from "@/lib/querySeason";
import queryChannel from "@/lib/queryChannel";
import queryUpTime from "@/lib/queryUpTime";
import queryVideo from "@/lib/queryVideo";
import AnimeLinks from "@/components/animeLinks";
import ScoreCard from "@/components/scoreCard";
import BarCharts from "@/components/barCharts";
import AnimeLists from "@/components/animeList";
import ActorCards from "@/components/actorCards";
import StaffCards from "@/components/staffCards";

const HOME = async ({ params }: { params: { anime: string } }) => {
  const before = new Date();
  const season = await querySeason();
  const channelInfo = await queryChannel(season, params.anime);
  const upTime = await queryUpTime();
  const dateUpTime = new Date(upTime - 1000 * 60 * 60 * 9);
  const dayUptime = dateUpTime.getDate();
  const monthUpTime = dateUpTime.getMonth();
  let chartsData: { name: string; amt: number; link: string }[] = [];
  let animes: { title: string; id: string; viewers: number }[] = [];
  if (channelInfo != "notFound" && channelInfo.videoIds != undefined) {
    for (let i = 0; i < channelInfo.videoIds.length; i++) {
      const videoId = channelInfo.videoIds[i];
      const getVideo = await queryVideo(
        season,
        videoId,
        monthUpTime,
        dayUptime
      );
      if (getVideo != "notFound") {
        const title = getVideo.title.replace(channelInfo.title, "").trim();
        const name = title.replace(/\「.*?\」/g, "").trim();
        chartsData.push({
          name: name,
          amt: getVideo.viewers,
          link: getVideo.url.replace("https://www.nicovideo.jp/watch/", ""),
        });
        animes.push({
          title: title,
          id: getVideo.url.replace("https://www.nicovideo.jp/watch/", ""),
          viewers: getVideo.viewers,
        });
      }
    }
    chartsData.reverse();
    animes.reverse();
  }
  const after = new Date();
  const time = after.getTime() - before.getTime();
  return (
    <>
      {channelInfo != "notFound" && (
        <div>
          <Header />
          <div className="grid grid-cols-12 sm:gap-8">
            <main
              className="col-span-full md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3 flex flex-col gap-12 mt-5 mb-10"
              id="main"
            >
              <h1 className=" font-bold text-3xl self-start">
                {channelInfo.title}
              </h1>
              <section className="grid grid-cols-6 gap-8 items-stretch">
                <div className="col-span-full lg:col-span-4 xl:col-span-3 flex items-center">
                  <Image
                    className="mx-auto"
                    src={channelInfo.thumb}
                    width={500}
                    height={500}
                    alt={`${channelInfo.title}のサムネイル`}
                  />
                </div>
                <AnimeLinks
                  className="col-span-full lg:col-span-2 xl:col-span-3"
                  links={[
                    { key: "ニコニコチャンネル:", url: channelInfo.chUrl },
                    {
                      key: "公式Twitter(X):",
                      url: "https://twitter.com/" + channelInfo.twitter,
                    },
                    { key: "公式ホームページ:", url: channelInfo.site },
                  ]}
                />
                <div className="col-span-full flex flex-col gap-6 h-full items-stretch">
                  <p className="mt-auto">{channelInfo.detail}</p>
                </div>
              </section>
              <section className="grid grid-cols-2 xl:grid-cols-3 gap-8">
                <ScoreCard
                  label="平均再生数"
                  num={channelInfo.aveViewers}
                  last={123}
                />
                <ScoreCard
                  label="平均コメント数"
                  num={channelInfo.aveComments}
                  last={123}
                />
                <ScoreCard
                  label="平均マイリスト数"
                  num={channelInfo.aveMylists}
                  last={-123}
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
              <ActorCards casts={channelInfo.casts} />
              <StaffCards staffs={channelInfo.staffs} />
            </main>
          </div>

          <p className="mx-auto w-fit">{time}</p>
        </div>
      )}
    </>
  );
};
export default HOME;
