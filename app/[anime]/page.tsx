import Header from "@/components/header";
import Image from "next/image";
import dbVideoType from "@/types/dbVideoType";
import querySeason from "@/lib/querySeason";
import queryChannel from "@/lib/queryChannel";
import queryUpTime from "@/lib/queryUpTime";
import queryVideo from "@/lib/queryVideo";
import ScoreCard from "@/components/scoreCard";
import BarCharts from "@/components/barCharts";
import AnimeLists from "@/components/animeList";

const HOME = async ({ params }: { params: { anime: string } }) => {
  const season = await querySeason();
  const channelInfo = await queryChannel(season, params.anime);
  const upTime = await queryUpTime();
  const dateUpTime = new Date(upTime - 1000 * 60 * 60 * 9);
  const dayUptime = dateUpTime.getDate();
  const monthUpTime = dateUpTime.getMonth();
  let chartsData: { name: string; amt: number }[] = [];
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
        });
        animes.push({
          title: title,
          id: getVideo.chId,
          viewers: getVideo.viewers,
        });
      }
    }
    chartsData.reverse();
    animes.reverse();
  }

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
              <section className="grid grid-cols-2 gap-8 items-stretch">
                <div className="mt-auto">
                  <Image
                    src={channelInfo.thumb}
                    width={500}
                    height={500}
                    alt={`${channelInfo.title}のサムネイル`}
                  />
                </div>
                <div className="flex flex-col gap-6 h-full items-stretch">
                  <h1 className=" font-bold text-3xl self-start">
                    {channelInfo.title}
                  </h1>
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
              <section className="grid grid-cols-7">
                <BarCharts
                  label="再生数"
                  chartsData={chartsData}
                  className="col-span-4 h-[350px]"
                />
                <AnimeLists animes={animes} className="col-span-3 h-[350px]" />
              </section>
            </main>
          </div>
        </div>
      )}
    </>
  );
};
export default HOME;
