var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BPhoEmSECuKpGfiCptzHMWqt6bIxMg-MSTbPyX6qERu-d-xgRGKjq4wGqkBx2UvcKzAs-77mE6fjKFO0ZZ_FOC4",
   "privateKey": "cWeQb50ac7m-f3ikuHVZcCV4Zv-IcCGutrjtfAgKywc"
};
 
 
webPush.setVapidDetails(
   'mailto:arifingatrahman@gmail.com',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/dSPqsNL5BOg:APA91bHKrID-sQO5A6Vxx-S_LXQgfkHJAwAhoNnT3uZFNP9kIgj3vfwzEk0uBQ9Phd4qclJ1vM-DZlc_ZR7RG7riksv1_5wPKe2w9LYAdq0_J5F4mfaa4ZYC3UzoT158yMa36ickpu92",
   "keys": {
       "p256dh": "BEZ7JpOVKtICgirCPDIuP7RYl7Z01xE8reLdlIJCU/XmTSbGCyh7zR0BWJPhKYkai6X+xEcFWjh7U0qm/qrKCEE=",
       "auth": "Guyc7tLZQWIMjfuYT2bWCw=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '1003773193023',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);