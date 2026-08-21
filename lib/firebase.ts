import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

/** Tanpa env var Firebase, guestbook jatuh ke mode lokal (lihat components/guestbook.tsx). */
export const isFirebaseConfigured = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);

let cachedDb: Firestore | null = null;

export function getDb(): Firestore | null {
  if (!isFirebaseConfigured) return null;
  if (cachedDb) return cachedDb;
  const app: FirebaseApp = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  cachedDb = getFirestore(app);
  return cachedDb;
}

export const GUESTBOOK_COLLECTION = "guestbook";
