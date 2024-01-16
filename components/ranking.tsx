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

const Ranking = ({
  channels,
  offset,
}: {
  channels: dbChannelType[];
  offset: number;
}) => {
  return (
    <div className="flex flex-col gap-5">
      {channels.map((channel, index) => (
        <Card
          className="flex flex-col sm:grid sm:grid-cols-12 items-center p-4"
          key={index}
        >
          <CardContent className="col-span-4 p-3 sm:p-6">
            <Image
              src={channel.thumb}
              alt={channel.title + "のサムネイル"}
              width={300}
              height={300}
            />
          </CardContent>
          <CardHeader className="col-span-6 p-3 sm:p-6">
            <div className="flex flex-row">
              <div className="bg-black   text-center h-11 leading-10 p-2 w-11 rounded-full">
                <h1 className="text-white font-medium text-xl">
                  {Number(index) + offset + 1}
                </h1>
              </div>
              <CardTitle className="text-lg break-words lg:text-xl leading-10 mx-4">
                {channel.title.length > 25
                  ? channel.title.substring(0, 25) + "..."
                  : channel.title}
              </CardTitle>
            </div>

            <CardDescription>
              再生数: {channel.aveViewers}　コメント数: {channel.aveComments}
              　マイリスト数:
              {channel.aveMylists}
            </CardDescription>
            <a
              href={channel.chUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              {channel.chUrl}
            </a>
          </CardHeader>

          <div className="col-span-2 flex items-end gap-1">
            <p className="text-xl">{channel.aveViewers}</p>
            <p className=" text-gray-600 text-sm">再生</p>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Ranking;
