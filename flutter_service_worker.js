'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "f949cf8a697f3f11657e848d4305bea7",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "e7069dfd19b331be16bed984668fe080",
"assets/NOTICES": "489bc349eb371463876d6cc85dd6e765",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/photo/back.jpg": "98dc5816e0a76e8aa860b7a15c9a5503",
"assets/photo/ckid.jpg": "25704dd9c60d14862b2a1ea112a50449",
"assets/photo/ckidavif.avif": "8b2f26d0d86f171ce5b2397791b007d5",
"assets/photo/download.jfif": "2a05573f231ea72c1c5a8cdaf8ef8552",
"assets/photo/gradient-purple-striped-background_23-2149583760.avif": "0bac31f7a44d774274289300963b999e",
"assets/photo/images.jpg": "367d5d49f2f437971703c252862b11a6",
"assets/photo/InnovationDay-%2520BRoll-2023.mp4": "2665948ae07b66bdd1e3fada0c65a6ee",
"assets/photo/kid1.jpg": "abc397d88616de29545edccc37381ded",
"assets/photo/kid10.avif": "e470f42307b89b2410a8bc215081e4b8",
"assets/photo/kid10.jpg": "0b896de1ed0772d8a445cb58e59935f6",
"assets/photo/kid11.avif": "8a06b9059c49d7e593ced4f8df8b32bf",
"assets/photo/kid11.jpg": "ca4d3309a419d783facc6472b1a0ec6c",
"assets/photo/kid12.jpg": "c4830cecf3af9101b947fc31b38040b9",
"assets/photo/kid13.jpg": "9e2a1f116ffc5d352cdc11d5f03f7045",
"assets/photo/kid14.jpg": "7d495dce7ccf0ad89701bd0e54de9303",
"assets/photo/kid15.jpg": "38156df1907285e183aa6c7170b75c66",
"assets/photo/kid2.jpg": "b625ea5b13dff00d9abf6ea2d0e0ea40",
"assets/photo/kid3.jpg": "26071bdb67ae0c108671507b10a185e3",
"assets/photo/kid4.jpg": "48c5e78d53c713360b4adf7d4ef871b8",
"assets/photo/kid5.jpg": "41c37d05723d421e47b48e797f50feae",
"assets/photo/kid6.jpg": "e4a921018eb6ffc2914ed3f36906257f",
"assets/photo/kid7.jpg": "1d2cf52ba47c3a60c3938a7b8883edb0",
"assets/photo/kid8.jpg": "091f41525d4fea8e052503f46619adff",
"assets/photo/kid8.webp": "ab369b978326ec6246d7d4eeb674a00b",
"assets/photo/kid9.jpg": "00ecd394f0e7d0dd9edc4a4e84f6da19",
"assets/photo/photo-1603974739154-7b055aeec101%2520(1).avif": "3955a44f289cec27608ddc15427403c9",
"assets/photo/photo-1603974739154-7b055aeec101.avif": "3955a44f289cec27608ddc15427403c9",
"assets/photo/pink.png": "17ea23dc6d2c87a20db0000ed5d0ea34",
"assets/photo/purple.jpg": "293b7f36f79af7b4d357329736338eda",
"assets/photo/vkid.avif": "e98c4a99f8be9107b8cb5ae70026efcc",
"assets/photo/vkid.jpg": "e33ea8fe00ebc33eee795d995dabaa4b",
"canvaskit/canvaskit.js": "97937cb4c2c2073c968525a3e08c86a3",
"canvaskit/canvaskit.wasm": "3de12d898ec208a5f31362cc00f09b9e",
"canvaskit/profiling/canvaskit.js": "c21852696bc1cc82e8894d851c01921a",
"canvaskit/profiling/canvaskit.wasm": "371bc4e204443b0d5e774d64a046eb99",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "a85fcf6324d3c4d3ae3be1ae4931e9c5",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "3ce83f3cd8061ec5e6e5bea23a8ff4dd",
"/": "3ce83f3cd8061ec5e6e5bea23a8ff4dd",
"main.dart.js": "3c5339f75c474e0527b81da7b17e6c52",
"manifest.json": "cfe6e1645026016be4ef55cd4d65dac6",
"version.json": "cd723175d2ccd955dc7c73c74869be57"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
