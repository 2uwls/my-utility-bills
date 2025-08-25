
export const sendNotification = (title: string, options?: NotificationOptions) => {
  const now = new Date();
  const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const newBody = options?.body ? `${options.body} (${timeString})` : `(${timeString})`;

  if (!("Notification" in window)) {
    console.log("This browser does not support desktop notification");
  } else if (Notification.permission === "granted") {
    new Notification(title, { ...options, body: newBody });
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        new Notification(title, { ...options, body: newBody });
      }
    });
  }
};
