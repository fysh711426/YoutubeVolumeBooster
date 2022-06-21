var func = undefined;
function setVideoVolume(volume) {
    if (!func) {
        func = (function () {
            var video = document.querySelector("video");
            if (!video)
                return;

            var audioCtx = new AudioContext();
            var source = audioCtx.createMediaElementSource(video);
            var node = audioCtx.createGain();

            node.gain.value = 1;
            source.connect(node);
            node.connect(audioCtx.destination);

            return function (volume) {
                node.gain.value = volume / 100;
            }
        })();
    }
    if (func) {
        func(volume);
    }
}

chrome.runtime.onMessage.addListener(
    function (request) {
        if (request.message === "setVideoVolume") {
            setVideoVolume(request.value);
        }
    }
);

chrome.runtime.sendMessage({ 
    message: 'onLoaded'
});
