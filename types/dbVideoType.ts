type dbVideoType = {
  comments: number;
  chId: string;
  description: string;
  mylists: number;
  postDate: { _seconds: number; _nanoseconds: number };
  thumb: string;
  title: string;
  update: number;
  url: string;
  viewers: number;
};
export default dbVideoType;
