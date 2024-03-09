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
import CustomLink from "./link";

const Ranking = ({
  type,
  channels,
  query,
}: {
  type: string;
  channels: dbRankingJointType[];
  query: string;
}) => {
  return (
    <div className="flex flex-col gap-5">
      {channels.map((channel, index) => (
        <CustomLink href={"/" + channel.ch_id} key={index}>
          <Card className="flex flex-col sm:grid sm:grid-cols-12 items-center p-4 hover:bg-gray-100">
            <CardContent className="col-span-4 p-3 sm:p-6">
              <Image
                src={channel.ch_thumb}
                alt={channel.ch_title + "のサムネイル"}
                width={300}
                height={300}
              />
            </CardContent>
            <CardHeader className="col-span-6 2xl:col-span-4 p-3 sm:p-6">
              <div className="flex flex-row items-center">
                <div className="flex flex-row">
                  <div className="bg-black   text-center h-11 leading-10 p-2 w-11 rounded-full">
                    <h1 className="text-white font-medium text-xl">
                      {String(channel[query as keyof dbRankingJointType])}
                    </h1>
                  </div>
                  <div className="flex flex-col  mx-4 mt-1 gap-4">
                    <CardTitle className="text-lg break-words lg:text-xl leading-11  line-clamp-2">
                      {channel.ch_title}
                    </CardTitle>
                    <div className="flex gap-2">
                      {channel.ch_PrmFree != 0 && <Badge>プレ限</Badge>}
                      {channel.ch_LtstFree != 0 && <Badge>最新話無料</Badge>}
                    </div>
                    <Description
                      type={type}
                      channel={channel}
                      className="self-start"
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <Footer type={type} channel={channel} />
          </Card>
        </CustomLink>
      ))}
    </div>
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
          コメント数: {channel.r_ave_comment}
          　マイリスト数:
          {channel.r_ave_mylist}
        </CardDescription>
      );
    case "コメント数":
      return (
        <CardDescription>
          再生数: {channel.r_ave_view}
          　マイリスト数:
          {channel.r_ave_mylist}
        </CardDescription>
      );
    case "マイリスト数":
      return (
        <CardDescription>
          再生数: {channel.r_ave_view}
          　コメント数: {channel.r_ave_comment}
        </CardDescription>
      );
  }
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
        <div className="col-span-2 flex items-end gap-1">
          <p className="text-xl">{channel.r_ave_view}</p>
          <p className=" text-gray-600 text-sm">再生</p>
        </div>
      );
    case "コメント数":
      return (
        <div className="col-span-2 flex items-end gap-1">
          <p className="text-xl">{channel.r_ave_comment}</p>
          <p className=" text-gray-600 text-sm">コメ</p>
        </div>
      );
    case "マイリスト数":
      return (
        <div className="col-span-2 flex items-end gap-1">
          <p className="text-xl">{channel.r_ave_mylist}</p>
          <p className=" text-gray-600 text-sm">マイリス</p>
        </div>
      );
  }
};

export default Ranking;
