// Firebase solo para el Grabador NFC (/nfc). Se carga bajo demanda, así el sitio
// público no descarga Firebase.
//
// Seguridad: el candado real está en firestore.rules. Solo los usuarios cuyo UID
// tenga un documento en nfc_admins/{uid} pueden leer o escribir nfc_tags.
import { initializeApp, getApps, type FirebaseApp, type FirebaseOptions } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { doc, getDoc, getFirestore, type Firestore } from 'firebase/firestore';

export const NFC_COLLECTION = 'nfc_tags';
export const NFC_ADMINS = 'nfc_admins';

let cached: Promise<{ auth: Auth; db: Firestore }> | null = null;

async function loadConfig(): Promise<FirebaseOptions> {
  const env = (import.meta as unknown as { env: Record<string, string | undefined> }).env;
  if (env.VITE_FIREBASE_API_KEY && env.VITE_FIREBASE_PROJECT_ID) {
    return {
      apiKey: env.VITE_FIREBASE_API_KEY,
      authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: env.VITE_FIREBASE_PROJECT_ID,
      appId: env.VITE_FIREBASE_APP_ID,
    };
  }
  // Firebase Hosting publica la configuración web (no es secreta) en esta ruta reservada.
  const res = await fetch('/__/firebase/init.json', { cache: 'no-store' });
  if (!res.ok) throw new Error('config');
  const cfg = (await res.json()) as FirebaseOptions;
  if (!cfg.apiKey || !cfg.projectId) throw new Error('config');
  return cfg;
}

export function getNfcFirebase() {
  if (!cached) {
    cached = (async () => {
      const existing = getApps().find(a => a.name === 'nfc');
      const app: FirebaseApp = existing ?? initializeApp(await loadConfig(), 'nfc');
      return { auth: getAuth(app), db: getFirestore(app) };
    })();
    cached.catch(() => { cached = null; });
  }
  return cached;
}

// ¿Este usuario está autorizado? Lo decide Firestore: si nfc_admins/{uid} existe.
export async function isNfcAdmin(db: Firestore, uid: string) {
  try { return (await getDoc(doc(db, NFC_ADMINS, uid))).exists(); }
  catch { return false; }
}
