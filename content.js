chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const videos = document.querySelectorAll('video');
  videos.forEach((video) => {
    video.playbackRate = parseFloat(request.speed);
  });

  if (request.saveSettings) {
    const url = new URL(window.location.href);
    chrome.storage.sync.set({ [url.hostname]: request.speed });
  }
});

// Apply saved settings automatically
const url = new URL(window.location.href);
chrome.storage.sync.get([url.hostname], (result) => {
  if (result[url.hostname]) {
    const videos = document.querySelectorAll('video');
    videos.forEach((video) => {
      video.playbackRate = parseFloat(result[url.hostname]);
    });
  }
});
