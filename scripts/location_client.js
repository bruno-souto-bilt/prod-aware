const locationsUrl = "https://raw.githubusercontent.com/bruno-souto-bilt/prod-aware/main/locations.json";

const cacheKey = "locations";
const cacheExpiryKey = "locationsExpiry";
const cacheDuration = 24 * 60 * 60 * 1000; // 24 Hours

async function loadLocations(){
    const now = Date.now();

    // Load valued from cache
    const values = await chrome.storage.local.get([cacheKey, cacheExpiryKey]);
    if (values[cacheKey] && values[cacheExpiryKey] && values[cacheExpiryKey] > now) {
        const locations = values[cacheKey];
        console.log("Using cached locations:", locations);
        return locations;
    }

    // Fetch values from file
    const response = await fetch(locationsUrl);
    const locations = await response.json();
    console.log("Fetched locations:", locations);
    
    // Store valued in cache
    const expiryTime = now + cacheDuration;
    chrome.storage.local.set({ [cacheKey]: locations, [cacheExpiryKey]: expiryTime });
    return locations;
}

async function clearCache() {
    chrome.storage.local.remove([cacheKey, cacheExpiryKey]);
    console.log("Cache cleared");
}