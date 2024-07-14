
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.url) {
        console.log('Tab URL changed to: ' + changeInfo.url);
        chrome.tabs.sendMessage(tabId, { action: 'updateProductionIndicator' }, response => { });
    }
});

chrome.webNavigation.onCompleted.addListener(function (details) {
    console.log('Page loaded with URL: ' + details.url);
    chrome.tabs.sendMessage(details.tabId, { action: 'updateProductionIndicator' }, response => { });
});