import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ScrollArea } from "./ui/scroll-area";
import CustomLink from "./link";

const AnimeLists = ({
  animes,
  className,
}: {
  animes: { title: string; id: number; viewers: number }[];
  className: string;
}) => {
  return (
    <ScrollArea className={className} type="always">
      <Card>
        <CardHeader>
          <CardTitle>公開中の話一覧</CardTitle>
          <CardDescription>{`現在${animes.length}話まで公開されています。`}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {animes.map((anime, id) => (
            <CustomLink href={`/video/${anime.id}`} key={id}>
              <Card className="hover:bg-gray-100">
                <CardContent className="p-6 pb-0">{anime.title}</CardContent>
                <CardHeader className="pt-3">
                  <CardDescription>{anime.viewers}再生</CardDescription>
                </CardHeader>
              </Card>
            </CustomLink>
          ))}
        </CardContent>
      </Card>
    </ScrollArea>
  );
};

export default AnimeLists;
