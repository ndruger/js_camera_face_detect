/*global console, Image, FaceDetector*/
(function(){

var INTERVAL = 5000;
function start(src){
	var video = document.getElementById('camera_video');
	video.src = src;
	video.addEventListener('play', function(){
		var canvas = document.createElement('canvas');
		var width = video.videoWidth;
		var height = video.videoHeight;
		canvas.width = width;
		canvas.height = height;
		
		function loop(){
	        var ctx = canvas.getContext('2d');
	        ctx.drawImage(video, 0, 0, width, height, 0, 0, width, height);
			var img = document.getElementById('output_image');
			try{
				img.src = canvas.toDataURL('image/jpeg');
			} catch(e){
				alert('Check opera:config.');
				return;
			}
			var res = FaceDetector.detect(img);
			if (res !== null) {
				var cvs = document.createElement("canvas");
				cvs.width = img.width;
				cvs.height = img.height;
				var tmpCtx = cvs.getContext("2d");
				tmpCtx.drawImage(img, 0 ,0);
				tmpCtx.strokeStyle = 'red';
				tmpCtx.lineWidth = 3;
				tmpCtx.rect(res.x, res.y, res.w, res.w);
				tmpCtx.stroke();
				img.src = cvs.toDataURL();
			}
			setTimeout(loop, INTERVAL);
		}
		setTimeout(loop, INTERVAL);
	}, false);
}

window.addEventListener('load', function(){
	if (navigator.getUserMedia) {
		navigator.getUserMedia('video', function(stream){
			start(stream);
		}, function(error){
			alert('Error: ' + error);
		});
	} else {
		alert('Web camera stream api is not supported in this browser.');
	}
}, false);
})();

