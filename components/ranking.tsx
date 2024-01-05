import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import dbChannelType from "@/types/dbChannelType";

const Ranking = ({ channels }: { channels: dbChannelType[] }) => {
  return (
    <div className="flex flex-col gap-5">
      {channels.map((channel, index) => (
        <Card key={index}>
          <div>
            <CardHeader>
              <div className="flex flex-row">
                <h1 className="bg-black text-white space-y-1.5 font-medium text-xl text-center h-10 leading-10 w-10 rounded-full">
                  {index + 1}
                </h1>
                <CardTitle className="leading-10 mx-4">
                  {channel.title}
                </CardTitle>
              </div>
              <CardDescription>
                再生数: {channel.aveViewers}　コメント数: {channel.aveComments}
                　マイリスト数:
                {channel.aveMylists}
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-5 gap-8">
              <img
                className="col-span-full xl:col-span-3 mx-auto"
                src={channel.thumb}
                alt={channel.title + "のサムネイル"}
              />
              <p className="col-span-full xl:col-span-2">{channel.detail}</p>
            </CardContent>
            <CardFooter>
              <a className="flex flex-col md:flex-row" href={channel.chUrl}>
                <p>チャンネルページ :&nbsp;</p>
                <p className="underline text-blue-400">{channel.chUrl}</p>
              </a>
            </CardFooter>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Ranking;
