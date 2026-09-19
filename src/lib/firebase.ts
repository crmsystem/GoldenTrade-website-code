import { initializeApp, getApps, getApp } from "firebase/app";
import { isSupported, getAnalytics, type Analytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyB5P7Hza3A2UY1GL1JM0MIs4VFxeM8yuVo",
  authDomain: "golden-trade-project.firebaseapp.com",
  projectId: "golden-trade-project",
  storageBucket: "golden-trade-project.firebasestorage.app",
  messagingSenderId: "200469720741",
  appId: "1:200469720741:web:20635bdccf9a0f74e0e74c",
  measurementId: "G-P51HKBDHMY",
};

export const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);

let analyticsPromise: Promise<Analytics | null> | null = null;

// Analytics relies on browser APIs (indexedDB, window) and isn't supported in every
// environment (SSR, some private-browsing modes), so it's initialized lazily, client-side only.
export function getFirebaseAnalytics() {
  if (typeof window === "undefined") return Promise.resolve(null);
  if (!analyticsPromise) {
    analyticsPromise = isSupported().then((supported) =>
      supported ? getAnalytics(firebaseApp) : null
    );
  }
  return analyticsPromise;
}
