function isUrlParamMatch(url, required_param) {
    if (!required_param) {
        return true;
    }

    const params = new URLSearchParams(url.search);
    return params.get(required_param.name) === required_param.value;
}

function isLocationMatch(curLocation, locations) {
    const curUrl = new URL(curLocation.href);

    for (const location of locations) {
        if (curUrl.hostname === location.domain) {
            if (isUrlParamMatch(curUrl, location.url_parameter)){
                return true;
            }
        }
    }

    return false;
}

function addBanner(){
    var banner = document.getElementById('production-banner');
    if (!banner) {
        banner = document.createElement('div');
        banner.innerHTML = 'Production';
        banner.id = 'production-banner';
        
        document.body.insertBefore(banner, document.body.firstChild);
        document.body.classList.add('production-banner-active');
    }
}

function removeBanner(){
    const existingBanner = document.getElementById('production-banner');
    if (existingBanner) {
        document.body.classList.remove('production-banner-active');
        existingBanner.remove();
    }
}

async function updateProductionIndicator() {
    try {
        const locations = await loadLocations();
        const matched = isLocationMatch(window.location, locations);
        if (matched) {
            console.log("Location match found:", window.location);
            addBanner()
        } else {
            removeBanner();
        }
    } catch (error) {
        console.error("Failed to update production indicator: ", error);
    }
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'updateProductionIndicator') {
        updateProductionIndicator();
        sendResponse({ result: 'Updated' });
    }
});
