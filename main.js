function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let audioContext;

try {
	audioContext =new (window.AudioContext || window.webkitAudioContext)();
} catch (error) {
	window.alert(`твой браузер не поддерживает Web Audio API! :(`);
}


if (audioContext !== undefined) {

	//white noise
	var bufferSize = 2 * audioContext.sampleRate,
    noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate),
    output = noiseBuffer.getChannelData(0);
	for (var i = 0; i < bufferSize; i++) {
		output[i] = Math.random() * 2 - 1;
	}

	var whiteNoise = audioContext.createBufferSource();
	whiteNoise.buffer = noiseBuffer;
	whiteNoise.loop = true;
	whiteNoise.start(0);
	
	//pink noise 
	var bufferSize = 4096;
	var pinkNoise = (function() {
		var b0, b1, b2, b3, b4, b5, b6;
		b0 = b1 = b2 = b3 = b4 = b5 = b6 = 0.0;
		var node = audioContext.createScriptProcessor(bufferSize, 1, 1);
		node.onaudioprocess = function(e) {
			var output = e.outputBuffer.getChannelData(0);
			for (var i = 0; i < bufferSize; i++) {
				var white = Math.random() * 2 - 1;
				b0 = 0.99886 * b0 + white * 0.0555179;
				b1 = 0.99332 * b1 + white * 0.0750759;
				b2 = 0.96900 * b2 + white * 0.1538520;
				b3 = 0.86650 * b3 + white * 0.3104856;
				b4 = 0.55000 * b4 + white * 0.5329522;
				b5 = -0.7616 * b5 - white * 0.0168980;
				output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
				output[i] *= 0.11; // (roughly) compensate for gain
				b6 = white * 0.115926;
			}
		}
		return node;
	})();

	//brown noise
	var bufferSize = 4096;
	var brownNoise = (function() {
		var lastOut = 0.0;
		var node = audioContext.createScriptProcessor(bufferSize, 1, 1);
		node.onaudioprocess = function(e) {
			var output = e.outputBuffer.getChannelData(0);
			for (var i = 0; i < bufferSize; i++) {
				var white = Math.random() * 2 - 1;
				output[i] = (lastOut + (0.02 * white)) / 1.02;
				lastOut = output[i];
				output[i] *= 5.5; // (roughly) compensate for gain
			}
		}
		return node;
	})();
	
	//other brown noise
	var bufferSize = 4096;
	var brownNoiseTwo = (function() {
		var lastOut = 0.0;
		var node = audioContext.createScriptProcessor(bufferSize, 1, 1);
		node.onaudioprocess = function(e) {
			var output = e.outputBuffer.getChannelData(0);
			for (var i = 0; i < bufferSize; i++) {
				var white = Math.random() * 2 - 1;
				output[i] = (lastOut + (0.02 * white)) / 1.2;
				lastOut = output[i];
				output[i] *= 5.5; // (roughly) compensate for gain
			}
		}
		return node;
	})();
	
	//other pink noise 
	var bufferSize = 4096;
	var pinkNoiseTwo = (function() {
		var b0, b1, b2, b3, b4, b5, b6;
		b0 = b1 = b2 = b3 = b4 = b5 = b6 = 0.0;
		var node = audioContext.createScriptProcessor(bufferSize, 1, 1);
		node.onaudioprocess = function(e) {
			var output = e.outputBuffer.getChannelData(0);
			for (var i = 0; i < bufferSize; i++) {
				var white = Math.random() * 2 - 1;
				b0 = 0.99886 * b0 + white * 0.0555179;
				b1 = 0.99332 * b1 + white * 0.0750759;
				b2 = 0.96900 * b2 + white * 0.1538520;
				b3 = 0.86650 * b3 + white * 0.3104856;
				b4 = 0.55000 * b4 + white * 0.5329522;
				b5 = -0.7616 * b5 - white * 0.0168980;
				output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.3;
				output[i] *= 0.12; // (roughly) compensate for gain
				b6 = white * 0.115926;
			}
		}
		return node;
	})();
	
	//oscillators

	var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

	function makeOsc(variable, type, frequency) {
		variable.type = type;
		variable.frequency.setValueAtTime(frequency, audioCtx.currentTime); // value in hertz
		variable.start();
	}

	

	//one
	var oscOne = audioCtx.createOscillator();
	makeOsc(oscOne, 'square', getRandomInt(200, 12000));
	/*
	var oscOne = audioCtx.createOscillator();

	oscOne.type = 'square';
	oscOne.frequency.setValueAtTime(3000, audioCtx.currentTime); // value in hertz
	oscOne.start();
	
	//other
	var oscTwo = audioCtx.createOscillator();

	oscTwo.type = 'square';
	oscTwo.frequency.setValueAtTime(4400, audioCtx.currentTime); // value in hertz
	oscTwo.start();
	
	//other
	var oscThree = audioCtx.createOscillator();

	oscThree.type = 'sine';
	oscThree.frequency.setValueAtTime(3100, audioCtx.currentTime); // value in hertz
	oscThree.start();
	
	//other
	var oscSaw = audioCtx.createOscillator();

	oscSaw.type = 'sawtooth';
	oscSaw.frequency.setValueAtTime(3020, audioCtx.currentTime); // value in hertz
	oscSaw.start();
	
	//other
	var oscSawTwo = audioCtx.createOscillator();

	oscSawTwo.type = 'sawtooth';
	oscSawTwo.frequency.setValueAtTime(3150, audioCtx.currentTime); // value in hertz
	oscSawTwo.start();



	//other
	/*var randOscOne = audioCtx.createOscillator();

	oscSawTwo.type = 'sawtooth';
	oscSawTwo.frequency.setValueAtTime(3000, audioCtx.currentTime); // value in hertz
	oscSawTwo.start();*/
	


	
	//on-off buttons
	function z() {
		
		if (document.getElementById('z').className == "active") {
			whiteNoise.disconnect(audioContext.destination);
			document.getElementById('z').className = "";
		} else {
			whiteNoise.connect(audioContext.destination);
			document.getElementById('z').className = "active";
		}
	
	}
	
	function x() {
		
		if (document.getElementById('x').className == "active") {
			pinkNoise.disconnect(audioContext.destination);
			document.getElementById('x').className = "";
		} else {
			pinkNoise.connect(audioContext.destination);
			document.getElementById('x').className = "active";
		}
	
	}
	
	function c() {
		
		if (document.getElementById('c').className == "active") {
			brownNoise.disconnect(audioContext.destination);
			document.getElementById('c').className = "";
		} else {
			brownNoise.connect(audioContext.destination);
			document.getElementById('c').className = "active";
		}
	
	}
	
	function v() {
		
		if (document.getElementById('v').className == "active") {
			brownNoiseTwo.disconnect(audioContext.destination);
			document.getElementById('v').className = "";
		} else {
			brownNoiseTwo.connect(audioContext.destination);
			document.getElementById('v').className = "active";
		}
	
	}
		
	function b() {
		
		if (document.getElementById('b').className == "active") {
			pinkNoiseTwo.disconnect(audioContext.destination);
			document.getElementById('b').className = "";
		} else {
			pinkNoiseTwo.connect(audioContext.destination);
			document.getElementById('b').className = "active";
		}
	
	}
	
	
		
	function a() {
		
		if (document.getElementById('a').className == "active") {
			oscOne.disconnect(audioCtx.destination);
			document.getElementById('a').className = "";
		} else {
			oscOne.connect(audioCtx.destination);
			document.getElementById('a').className = "active";
		}
	
	}
	
	function s() {
		
		if (document.getElementById('s').className == "active") {
			oscTwo.disconnect(audioCtx.destination);
			document.getElementById('s').className = "";
		} else {
			oscTwo.connect(audioCtx.destination);
			document.getElementById('s').className = "active";
		}
	
	}
	
	function d() {
	
		if (document.getElementById('d').className == "active") {
			oscThree.disconnect(audioCtx.destination);
			document.getElementById('d').className = "";
		} else {
			oscThree.connect(audioCtx.destination);
			document.getElementById('d').className = "active";
		}
	
	}
	
	function f() {
		
		if (document.getElementById('f').className == "active") {
			oscSaw.disconnect(audioCtx.destination);
			document.getElementById('f').className = "";
		} else {
			oscSaw.connect(audioCtx.destination);
			document.getElementById('f').className = "active";
		}
	
	}
	
	function g() {
	
		if (document.getElementById('g').className == "active") {
			oscSawTwo.disconnect(audioCtx.destination);
			document.getElementById('g').className = "";
		} else {
			oscSawTwo.connect(audioCtx.destination);
			document.getElementById('g').className = "active";
		}
	
	}
	
	function aa() {
		
		if (document.getElementById('aa').className == "active") {
			randOscOne.disconnect(audioCtx.destination);
			document.getElementById('aa').className = "";
		} else {
			randOscOne.connect(audioCtx.destination);
			document.getElementById('aa').className = "active";
		}
	
	}
	
	function ss() {
		
		if (document.getElementById('ss').className == "active") {
			randOscTwo.disconnect(audioCtx.destination);
			document.getElementById('ss').className = "";
		} else {
			randOscTwo.connect(audioCtx.destination);
			document.getElementById('ss').className = "active";
		}
	
	}
	
	function dd() {
	
		if (document.getElementById('dd').className == "active") {
			randOscThree.disconnect(audioCtx.destination);
			document.getElementById('dd').className = "";
		} else {
			randOscThree.connect(audioCtx.destination);
			document.getElementById('dd').className = "active";
		}
	
	}
	
	function ff() {
		
		if (document.getElementById('ff').className == "active") {
			randOscSaw.disconnect(audioCtx.destination);
			document.getElementById('ff').className = "";
		} else {
			randOscSaw.connect(audioCtx.destination);
			document.getElementById('ff').className = "active";
		}
	
	}
	
	function gg() {
	
		if (document.getElementById('gg').className == "active") {
			randOscSawTwo.disconnect(audioCtx.destination);
			document.getElementById('gg').className = "";
		} else {
			randOscSawTwo.connect(audioCtx.destination);
			document.getElementById('gg').className = "active";
		}
	
	}
}