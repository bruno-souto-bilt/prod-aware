const locationsUrl = "https://raw.githubusercontent.com/bruno-souto-bilt/prod-aware/main/locations.json";

const cacheKey = "locations";
const cacheExpiryKey = "locationsExpiry";

async function clearCache() {
    chrome.storage.local.remove([cacheKey, cacheExpiryKey]);
    console.log("Cache cleared");
}

document.getElementById('refreshButton').addEventListener('click', async () => {
    await clearCache();
    alert('Cache cleared.');
    window.close();
});

document.getElementById('viewLocationsButton').addEventListener('click', () => {
    chrome.tabs.create({ url: locationsUrl });
  });