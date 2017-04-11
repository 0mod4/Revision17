var audioContext;
var audioSource;

function AudioPlayer() {
	audioContext = new (window.AudioContext || window.webkitAudioContext)();
	audioSource = audioContext.createBufferSource();

	loadAudioToBuffer(this, "/resources/test.mp3", onLoaded);
	function onLoaded(target, data) {
		audioContext.decodeAudioData(
			data,
			function(buffer) {
				audioSource.buffer = buffer;

				audioSource.connect(audioContext.destination);
				audioSource.loop = true;
			},
			function(e) {
				console.log("Error with decoding audio data" + e.err); }
		);

		audioSource.start(6);
		console.log("Audio loaded.");
		console.log(audioSource.buffer);
	};

}

function loadAudioToBuffer(obj, url, cb) {
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";

    request.onload = function(obj) {
        cb(obj, request.response);
    };

    request.send();
}