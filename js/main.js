var body = document.body;
if (body) {
    var videoHeader = document.getElementById('video-header');
    if (videoHeader) {
        var video = new Video("assets/video/pexels-tea-oebel-6804114.mp4", "assets/img/video-poster.png");
        videoHeader.append(video.element);
    }
}
