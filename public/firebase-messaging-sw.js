import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getMessaging, onBackgroundMessage } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-messaging-sw.js";

// Parse config from URL
const urlParams = new URLSearchParams(location.search);
const firebaseConfigParam = urlParams.get('firebaseConfig');

if (firebaseConfigParam) {
  try {
    const firebaseConfig = JSON.parse(decodeURIComponent(firebaseConfigParam));
    const app = initializeApp(firebaseConfig);
    const messaging = getMessaging(app);

    onBackgroundMessage(messaging, (payload) => {
      console.log('[SW] Received background message ', payload);
      const notificationTitle = payload.notification.title;
      const notificationOptions = {
        body: payload.notification.body,
        icon: '/images/trees/large-tree.png',
      };
      self.registration.showNotification(notificationTitle, notificationOptions);
    });
  } catch (e) {
    console.error('Error processing Firebase config in service worker:', e);
  }
} else {
  console.error('Firebase config not found in service worker URL.');
}
