import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import dbChannelType from "@/types/dbChannelType";
import Image from "next/image";
import CustomLink from "./link";

const Ranking = ({
  type,
  channels,
  offset,
}: {
  type: string;
  channels: dbChannelType[];
  offset: number;
}) => {
  return (
    <div className="flex flex-col gap-5">
      {channels.map((channel, index) => (
        <CustomLink href={detailLink(channel.chUrl)} key={index}>
          <Card className="flex flex-col sm:grid sm:grid-cols-12 items-center p-4 hover:bg-gray-100">
            <CardContent className="col-span-4 p-3 sm:p-6">
              <Image
                src={channel.thumb}
                alt={channel.title + "のサムネイル"}
                width={300}
                height={300}
              />
            </CardContent>
            <CardHeader className="col-span-6 p-3 sm:p-6">
              <div className="flex flex-row items-center">
                <div className="flex flex-row">
                  <div className="bg-black   text-center h-11 leading-10 p-2 w-11 rounded-full">
                    <h1 className="text-white font-medium text-xl">
                      {Number(index) + offset + 1}
                    </h1>
                  </div>
                  <div className="flex flex-col  mx-4 mt-1 gap-4">
                    <CardTitle className="text-lg break-words lg:text-xl leading-11  line-clamp-2">
                      {channel.title}
                    </CardTitle>
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
  channel: dbChannelType;
  className?: string;
}) => {
  switch (type) {
    case "再生数":
      return (
        <CardDescription className={className}>
          コメント数: {channel.aveComments}
          　マイリスト数:
          {channel.aveMylists}
        </CardDescription>
      );
    case "コメント数":
      return (
        <CardDescription>
          再生数: {channel.aveViewers}
          　マイリスト数:
          {channel.aveMylists}
        </CardDescription>
      );
    case "マイリスト数":
      return (
        <CardDescription>
          再生数: {channel.aveViewers}
          　コメント数: {channel.aveComments}
        </CardDescription>
      );
  }
};

const Footer = ({
  type,
  channel,
}: {
  type: string;
  channel: dbChannelType;
}) => {
  switch (type) {
    case "再生数":
      return (
        <div className="col-span-2 flex items-end gap-1">
          <p className="text-xl">{channel.aveViewers}</p>
          <p className=" text-gray-600 text-sm">再生</p>
        </div>
      );
    case "コメント数":
      return (
        <div className="col-span-2 flex items-end gap-1">
          <p className="text-xl">{channel.aveComments}</p>
          <p className=" text-gray-600 text-sm">コメ</p>
        </div>
      );
    case "マイリスト数":
      return (
        <div className="col-span-2 flex items-end gap-1">
          <p className="text-xl">{channel.aveMylists}</p>
          <p className=" text-gray-600 text-sm">マイリス</p>
        </div>
      );
  }
};

const detailLink = (chUrl: string) => {
  return chUrl.replace("https://ch.nicovideo.jp/", "");
};

export default Ranking;
