let body : HTMLElement | null = document.body;

if(body) {
    let videoHeader : HTMLElement | null = document.getElementById('video-header');
    if(videoHeader) {
        const video : Video = new Video("assets/video/pexels-tea-oebel-6804114.mp4");
        videoHeader.append(video.element);
    }

}