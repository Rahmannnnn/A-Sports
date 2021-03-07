importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
 
if (workbox)
  console.log(`Workbox berhasil dimuat`);
else
  console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute([
  { url: '/index.html', revision: '1' },
  { url: '/nav.html', revision: '1' },
  { url: '/detail.html', revision: '1' },
  { url: '/pages/home.html', revision: '1' },
  { url: '/pages/matches.html', revision: '1' },
  { url: '/pages/contact-us.html', revision: '1' },
  { url: '/pages/saved.html', revision: '1' },
  { url: '/pages/teams.html', revision: '1' },
  { url: '/css/style.css', revision: '1' },
  { url: '/css/materialize.min.css', revision: '1' },
  { url: '/js/materialize.min.js', revision: '1' },
  { url: '/js/nav.js', revision: '1' },
  { url: '/js/api.js', revision: '1' },
  { url: '/js/main.js', revision: '1' },
  { url: '/js/main2.js', revision: '1' },
  { url: '/js/idb.js', revision: '1' },
  { url: '/js/db.js', revision: '1' },
  { url: '/image/pictures/slider1.jpg', revision: '1'},
  { url: '/image/pictures/slider2.jpg', revision: '1'},
  { url: '/image/pictures/slider3.jpg', revision: '1'},
  { url: '/image/icons/icon.png', revision: '1'},
  { url: '/image/icons/github.svg', revision: '1'},
  { url: '/image/icons/whatsapp.svg', revision: '1'},
  { url: '/image/icons/email2.png', revision: '1'},
  { url: '/image/icons/maskable_icon2.png', revision: '1'},
  { url: '/image/icons/icon192.png', revision: '1'},
  { url: '/manifest.json', revision: '1'},
  { url: 'https://fonts.googleapis.com/icon?family=Material+Icons', revision: '1'},
  { url: 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap', revision: '1'},
  { url: 'https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2', revision: '1'},
  { url: 'https://fonts.gstatic.com/s/poppins/v13/pxiEyp8kv8JHgFVrJJfecg.woff2', revision: '1'},
  { url: 'https://fonts.gstatic.com/s/poppins/v13/pxiByp8kv8JHgFVrLGT9Z1xlFQ.woff2', revision: '1'},
  { url: 'https://fonts.gstatic.com/s/poppins/v13/pxiGyp8kv8JHgFVrJJLucHtA.woff2', revision: '1'},
],
  {
    ignoreUrlParametersMatching: [/.*/]
  }
);

workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  workbox.strategies.cacheFirst({
    cacheName: 'images',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
      }),
    ],
  }),
);

workbox.routing.registerRoute(
  new RegExp('/pages/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'pages'
    })
);

workbox.routing.registerRoute(
  /.*(?:googleapis|gstatic)\.com/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
  })
);

workbox.routing.registerRoute(
  /^https:\/\/api\.football-data\.org\/v2/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'api',
  })
);

workbox.routing.registerRoute("/", workbox.strategies.networkFirst());

self.addEventListener('push', event => {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  const options = {
    body: body,
    icon: 'image/icons/icon.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});