chrome.runtime.onMessage.addListener(
    function request(request, sender, sendResponse) {
        if (request.message === 'onLoaded') {
            chrome.tabs.sendMessage(sender.tab.id, {
                message: 'setVideoVolume',
                value: parseInt(localStorage["volume"])
            });
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