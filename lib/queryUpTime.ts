import { db } from "./firebase";

const queryUpTime = async () => {
  const getUpTime = await db.collection("dbConfig").doc("LastFetch").get();
  const upTime = Number(getUpTime.data()?.data);
  return upTime;
};
export default queryUpTime;
