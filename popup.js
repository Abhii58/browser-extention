document.getElementById('apply').addEventListener('click', () => {
  const speed = document.getElementById('speed').value;
  const saveSettings = document.getElementById('save-settings').checked;

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { speed, saveSettings });
  });
});

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const url = new URL(tabs[0].url);
  chrome.storage.sync.get([url.hostname], (result) => {
    if (result[url.hostname]) {
      document.getElementById('speed').value = result[url.hostname];
      document.getElementById('save-settings').checked = true;
    }
  });
});
