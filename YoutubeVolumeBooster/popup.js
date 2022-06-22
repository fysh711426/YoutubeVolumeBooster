function setVolume(val) {
    document.getElementById("volume").value = val;
}

function setVolumeText(val) {
    document.getElementById("volumeText").innerText = 'Volume: ' + val + ' %';
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("volume").addEventListener('change',
        function () {
            var newValue = this.value;
            setVolumeText(newValue);
            chrome.runtime.sendMessage({
                message: 'setVolume',
                value: newValue
            });
            chrome.tabs.query({ active: true, currentWindow: true },
                function (tabs) {
                    var activeTab = tabs[0];
                    chrome.tabs.sendMessage(activeTab.id, {
                        message: 'setVideoVolume',
                        value: newValue
                    });
                }
            );
        }
    );
    chrome.runtime.sendMessage({
        message: 'getVolume'
    }, function (resp) {
        setVolumeText(resp.value);
        setVolume(resp.value);
    });
});
