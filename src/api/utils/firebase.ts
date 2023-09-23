import serviceAccount from "@/../secret/buscape-challenges-firebase-adminsdk-7t58m-4c9ae9647c.json";
import admin from "firebase-admin";
import { getApps } from "firebase-admin/app";

const account = serviceAccount as unknown as string;

const alreadyCreatedAps = getApps();
const yourFirebaseAdminConfig = {
    credential: admin.credential.cert(account),
    databaseURL: "https://buscape-challenges-default-rtdb.firebaseio.com"
};

export const firebaseAdmin =
    alreadyCreatedAps.length === 0
        ? admin.initializeApp(yourFirebaseAdminConfig)
        : (alreadyCreatedAps[0] as admin.app.App);
