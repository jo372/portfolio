var body = document.body;
if (body) {
    var videoHeader = document.getElementById('video-header');
    if (videoHeader) {
        var video = new Video("assets/video/pexels-tea-oebel-6804114.mp4");
        videoHeader.append(video.element);
    }
    var introText = document.getElementById('introText');
    if (introText) {
        var header = document.createElement('h1');
        introText.append(header);
        var headerText = "Hello, I'm <span><a href=\"https://www.linkedin.com/in/jordan-o-hara-875b841a9/\" target=\"_blank\">Jordan O'Hara</a></span>. I'm a fulltime Software Engineering Student @ Brighton University ";
        if (header) {
            TextTyper.typeText(headerText, header);
        }
    }
}
