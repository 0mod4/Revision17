var audioContext;
var audioSource;
var audioAnalyser;

function AudioPlayer() {
	audioContext = new (window.AudioContext || window.webkitAudioContext)();
	audioSource = audioContext.createBufferSource();
	audioAnalyser = audioContext.createAnalyser();
	audioAnalyser.fftSize = 256;
	this.dataArray = new Float32Array(audioAnalyser.frequencyBinCount);

	loadAudioToBuffer(this, "/resources/test.mp3", onLoaded);
	function onLoaded(target, data) {
		audioContext.decodeAudioData(
			data,
			function(buffer) {
				audioSource.buffer = buffer;

				audioSource.connect(audioAnalyser);
				audioSource.connect(audioContext.destination);
				audioSource.loop = true;
			},
			function(e) {
				console.log("Error with decoding audio data" + e.err);
			}
		);

		audioSource.start(6);
		console.log("Audio loaded.");
	};

	this.updateFFT = function () {
		audioAnalyser.getFloatFrequencyData(this.dataArray);
	}

	this.getFFTtexture = function() {
		this.updateFFT();
		return twgl.createTexture(gl, {src:this.dataArray, width:1, mag:gl.NEAREST, min:gl.LINEAR, format:gl.LUMINANCE});
	}
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