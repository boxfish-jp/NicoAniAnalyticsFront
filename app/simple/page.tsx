import { queryLatestSeason } from "@/lib/querySeason";
import queryRanking from "@/lib/queryRanking";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { dbRankingJointType } from "@/types/dbRankingType";
import Image from "next/image";
import CustomLink from "@/components/link";

export const runtime = "edge";

const HOME = async () => {
  const type = "再生数";
  const query = "current_r_ave_view_rank";
  const season = await queryLatestSeason();
  const queryChannels = await queryRanking(
    "r_ave_view_rank",
    0,
    season.syear,
    season.sseason
  );
  const leftChannles = queryChannels.channels.slice(0, 4);
  const rightChannles = queryChannels.channels.slice(2, 4);
  return (
    <div className="mx-5 mt-20 flex flex-col items-center gap-7">
      <p className="mx-auto text-2xl">ニコニコアニメランキング</p>
      <div className="grid grid-cols-2 gap-5  w-full">
        {channelmapper(leftChannles, type, query)}
      </div>
    </div>
  );
};

const channelmapper = (
  channel: dbRankingJointType[],
  type: string,
  query: string
) => {
  return (
    <>
      {channel.map((channel, index) => (
        <CustomLink href={"/" + channel.current_ch_id} key={index}>
          <Card
            className="bg-center bg-no-repeat h-48 bg-[length:556px_505px]"
            style={{ backgroundImage: `url(${channel.ch_thumb})` }}
          >
            <div className="h-full bg-[hsla(0,0%,0%,0.25)]  rounded-lg p-3">
              <div className="bg-[#ffffffbf] backdrop-blur-xl w-fit h-16 rounded-lg p-2 flex flex-row gap-1 items-end">
                <h1 className="text-black text-6xl">
                  {String(channel[query as keyof dbRankingJointType])}
                </h1>
                <p className="self-end leading-5">位</p>
              </div>
            </div>
          </Card>
        </CustomLink>
      ))}
    </>
  );
};

const Description = ({
  type,
  channel,
  className,
}: {
  type: string;
  channel: dbRankingJointType;
  className?: string;
}) => {
  switch (type) {
    case "再生数":
      return (
        <CardDescription className={className}>
          コメント数: {channel.current_r_ave_comment.toLocaleString()}
          　マイリスト数:
          {channel.current_r_ave_mylist.toLocaleString()}
        </CardDescription>
      );
    case "コメント数":
      return (
        <CardDescription>
          再生数: {channel.current_r_ave_view.toLocaleString()}
          　マイリスト数:
          {channel.current_r_ave_mylist.toLocaleString()}
        </CardDescription>
      );
    case "マイリスト数":
      return (
        <CardDescription>
          再生数: {channel.current_r_ave_view.toLocaleString()}
          　コメント数: {channel.current_r_ave_comment.toLocaleString()}
        </CardDescription>
      );
  }
};

const RankingShift = (channel: dbRankingJointType) => {
  if (channel.previous_r_ave_view_rank == null) {
    return (
      <div className="col-start-11 col-span-2 flex items-center gap-1">
        <div className={"w-12 h-14"}>
          <svg
            className="fill-yellow-500"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="M238.301,346.393c0.598,3.938,2.563,7.725,5.903,11.359c3.313,3.626,7.252,5.447,11.796,5.447,c10.592,0,16.486-5.608,17.691-16.806l35.398-271.98c0.607-4.823,0.911-11.636,0.911-20.415c0-13.618-4.679-26.013-14.065-37.22,C286.558,5.59,273.244,0,255.999,0c-17.868,0-31.317,5.742-40.389,17.226c-9.073,11.206-13.61,23.459-13.61,36.773,c0,8.172,0.285,14.976,0.892,20.415L238.301,346.393z"></path>

              <path d="M295.033,418.065c-10.288-10.287-23.307-15.44-39.034-15.44c-15.422,0-28.441,5.314-39.032,15.896,c-10.591,10.591-15.877,23.441-15.877,38.569c0,14.52,5.286,27.379,15.877,38.577C227.558,506.562,240.578,512,255.999,512,c15.423,0,28.424-5.286,39.034-15.886c10.574-10.574,15.877-23.593,15.877-39.024C310.91,441.658,305.607,428.656,295.033,418.065z"></path>
            </g>
          </svg>
        </div>
        <p className="text-xl">初登場</p>
      </div>
    );
  }
  const shift =
    channel.previous_r_ave_view_rank - channel.current_r_ave_view_rank;
  let svgColor = "fill-gray-600";
  let svgRotate = "rotate-0";
  let plus = "+";
  if (shift > 0) {
    svgColor = "fill-green-500";
    svgRotate = "-rotate-45";
  } else if (shift < 0) {
    svgColor = "fill-red-500";
    svgRotate = "rotate-45";
    plus = "";
  }
  return (
    <div className="col-start-11 col-span-2 flex items-center gap-3">
      <div className={"w-12 h-14 transform " + svgRotate}>
        <svg
          className={svgColor}
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <g>
            <polygon points="512,256.001 195.491,18.616 195.491,153.599 0,153.599 0,358.403 195.491,358.403 195.491,493.384" />
          </g>
        </svg>
      </div>
      <p className="text-xl">{plus + shift}位</p>
    </div>
  );
};

const Footer = ({
  type,
  channel,
}: {
  type: string;
  channel: dbRankingJointType;
}) => {
  switch (type) {
    case "再生数":
      return (
        <div className="col-start-11 col-span-2 flex items-end gap-1">
          <p className="text-xl">
            {channel.current_r_ave_view.toLocaleString()}
          </p>
          <p className=" text-gray-600 text-sm">再生</p>
        </div>
      );
    case "コメント数":
      return (
        <div className="col-start-11 col-span-2 flex items-end gap-1">
          <p className="text-xl">
            {channel.current_r_ave_comment.toLocaleString()}
          </p>
          <p className=" text-gray-600 text-sm">コメ</p>
        </div>
      );
    case "マイリスト数":
      return (
        <div className="col-start-11 col-span-2 flex items-end gap-1">
          <p className="text-xl">
            {channel.current_r_ave_mylist.toLocaleString()}
          </p>
          <p className=" text-gray-600 text-sm">マイリス</p>
        </div>
      );
  }
};

export default HOME;
