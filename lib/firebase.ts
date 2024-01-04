import admin from "firebase-admin";
import { applicationDefault } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const firebaseServiceAccount = Object(
  process.env.FIREBASE_SERVICE_ACCOUNT_NICOANIMEANALYTICS
);
if (admin.apps.length === 0) {
  admin.initializeApp({
    projectId: "nicoanimeanalytics",
    credential: applicationDefault(),
  });
}

export const db = getFirestore();
