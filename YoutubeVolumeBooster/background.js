function setVideoVolume(newValue) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {
            message: 'setVideoVolume',
            value: newValue
        });
    });
}

chrome.extension.onMessage.addListener(
    function request(request, sender, sendResponse) {
        if (request.message === 'onLoaded') {
            setVideoVolume(parseInt(localStorage["volume"]));
        }
        if (request.message === 'setVideoVolume') {
            setVideoVolume(request.value);
        }
        if (request.message === 'setVolume') {
            localStorage["volume"] = request.value;
        }
        if (request.message === 'getVolume') {
            var volume = 100;
            if (localStorage["volume"])
                volume = parseInt(localStorage["volume"]);
            localStorage["volume"] = volume;
            sendResponse({ value: localStorage["volume"] });
        }
    }
);