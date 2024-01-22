import { db } from "./firebase";

const querySeason = async () => {
  const getSeason = await db.collection("dbConfig").doc("nowSeason").get();
  const season = String(getSeason.data()?.data);
  return season;
};
export default querySeason;
