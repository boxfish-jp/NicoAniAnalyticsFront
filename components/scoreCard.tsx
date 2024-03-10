import { HTMLAttributes } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ScoreCard = ({
  label,
  num,
  last,
  ...props
}: {
  label: string;
  num: number;
  last: number;
} & HTMLAttributes<HTMLDivElement>) => {
  let description = "";
  if (last > 0) {
    description = `前日比 +${last}`;
  } else if (last < 0) {
    description = `前日比 ${last}`;
  }
  return (
    <Card {...props}>
      <CardContent className="p-6 pb-2 ">
        <p>{label}</p>
      </CardContent>
      <CardHeader className="pt-1">
        <CardTitle className="text-3xl">{num}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  );
};

export default ScoreCard;
