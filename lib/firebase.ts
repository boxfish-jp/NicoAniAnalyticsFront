import { initializeApp, cert, getApps } from "firebase-admin/app";
//import { applicationDefault } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const firebaseServiceAccount = Object(
  process.env.FIREBASE_SERVICE_ACCOUNT_NICOANIMEANALYTICS
);
if (!getApps().length) {
  initializeApp({
    projectId: "nicoanimeanalytics",
    credential: cert(
      // 環境変数から認証情報を取得
      JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string)
    ),
  });
}

export const db = getFirestore();
