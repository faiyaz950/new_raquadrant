import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getStorage, type FirebaseStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

function isFirebaseEnvComplete(): boolean {
  const v = firebaseConfig;
  return (
    !!v.apiKey?.trim() &&
    !!v.authDomain?.trim() &&
    !!v.projectId?.trim() &&
    !!v.storageBucket?.trim() &&
    !!v.messagingSenderId?.trim() &&
    !!v.appId?.trim()
  );
}

function getFirebase(): { app: FirebaseApp; auth: Auth; db: Firestore; storage: FirebaseStorage } | null {
  if (typeof window === 'undefined') return null;
  if (!isFirebaseEnvComplete()) return null;
  try {
    const app = getApps().length ? (getApps()[0] as FirebaseApp) : initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);
    // Bind Storage to the same bucket as .env (avoids wrong default when multiple buckets exist).
    const bucket = firebaseConfig.storageBucket!.trim();
    const bucketUrl = bucket.startsWith('gs://') ? bucket : `gs://${bucket}`;
    const storage = getStorage(app, bucketUrl);
    return { app, auth, db, storage };
  } catch {
    return null;
  }
}

let firebase: ReturnType<typeof getFirebase> = null;

export function getFirebaseClient() {
  if (!firebase) firebase = getFirebase();
  return firebase;
}

export { getAuth, getFirestore, getStorage };
