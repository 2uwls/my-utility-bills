import { initializeApp, getApps, getApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyCRx8zpjYJ2bprASpbdoJk7BJa2t6tK9aM',
  authDomain: 'my-utility-bills-1596d.firebaseapp.com',
  projectId: 'my-utility-bills-1596d',
  storageBucket: 'my-utility-bills-1596d.firebasestorage.app',
  messagingSenderId: '891644921414',
  appId: '1:891644921414:web:f6913f28e137ac0df6ec47',
  measurementId: 'G-LEB3B56RBY',
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const messaging = typeof window !== 'undefined' && getMessaging(app);

export const analytics = typeof window !== 'undefined' && getAnalytics(app);

const vapidKey = process.env.VITE_APP_FCM_VAPID_KEY;

// Function to get FCM registration token
export const getFCMToken = async () => {
  if (typeof window !== 'undefined' && messaging) {
    try {
      const currentToken = await getToken(messaging, { vapidKey });
      if (currentToken) {
        return currentToken;
      } else {
        console.log(
          'No registration token available. Request permission to generate one.'
        );

        return null;
      }
    } catch (err) {
      console.error('An error occurred while retrieving token. ', err);
      return null;
    }
  }
  return null;
};

export default app;
