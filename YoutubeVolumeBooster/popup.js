function setVolume(val) {
    document.getElementById("volume").value = val;
}

function setVolumeText(val) {
    document.getElementById("volumeText").innerText = val + ' %';
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("volume").addEventListener('change', function () {
        var newValue = this.value;
        setVolumeText(newValue);
        chrome.runtime.sendMessage({
            message: 'setVolume',
            value: newValue
        });
        chrome.runtime.sendMessage({
            message: 'setVideoVolume',
            value: newValue
        });
    });
    chrome.runtime.sendMessage({
        message: 'getVolume'
    }, function (resp) {
        debugger
        setVolumeText(resp.value);
        setVolume(resp.value);
    });
});
