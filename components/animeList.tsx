import { AnchorHTMLAttributes } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ScrollArea } from "./ui/scroll-area";

const AnimeLists = ({
  animes,
  ...props
}: {
  animes: { title: string; id: string; viewers: number }[];
} & AnchorHTMLAttributes<HTMLElement>) => {
  return (
    <div {...props}>
      <ScrollArea>
        <Card>
          <CardHeader>
            <CardTitle>公開中の話一覧</CardTitle>
            <CardDescription>{`現在${animes.length}話まで公開されています。`}</CardDescription>
          </CardHeader>
          <CardContent>
            {animes.map((anime, id) => (
              <Card key={id}>
                <CardContent className="p-6 pb-0">{anime.title}</CardContent>
                <CardHeader className="pt-3">
                  <CardDescription>{anime.viewers}再生</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </CardContent>
        </Card>
      </ScrollArea>
    </div>
  );
};

export default AnimeLists;
