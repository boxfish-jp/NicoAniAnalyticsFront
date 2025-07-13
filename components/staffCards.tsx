import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const StaffCards = ({
  staffs,
}: {
  staffs: {
    name: string;
    role: string;
  }[];
}) => (
  <Card>
    <CardHeader>
      <CardTitle>スタッフ・原作者・製作会社</CardTitle>
    </CardHeader>
    <CardContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {staffs.map((staff, index) => (
        <Card key={index}>
          <CardHeader>
            <h3>{staff.name}</h3>
            <CardDescription>{staff.role}</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </CardContent>
  </Card>
);

export default StaffCards;
