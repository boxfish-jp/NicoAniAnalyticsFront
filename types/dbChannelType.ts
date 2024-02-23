type dbChannelType = {
  aveComments: number;
  aveMylists: number;
  aveViewers: number;
  NaniTag: string;
  chUrl: string;
  detail: string;
  thumb: string;
  title: string;
  videoIds?: string[];
  latestFree: string;
  premium: string;
  site: string;
  twitter: string;
  casts: {
    actor: string;
    actorImg: string;
    actorWiki: string;
    character: string;
    characterImg: string;
  }[];
  staffs: {
    name: string;
    role: string;
  }[];
};
export default dbChannelType;
