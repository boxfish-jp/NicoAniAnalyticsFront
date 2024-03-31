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
  unit,
  last,
  ...props
}: {
  label: string;
  num: number;
  unit: string;
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
        <div className="flex gap-2">
          <CardTitle className="text-3xl">{num.toLocaleString()}</CardTitle>
          <p className="self-end text-muted-foreground">{unit}</p>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  );
};

export default ScoreCard;
