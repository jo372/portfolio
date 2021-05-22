const defaultVideoConfiguration = {
    isLooping: true,
    isPlaying: true
};
class Video {
    constructor(src, posterSrc, config) {
        config = Object.assign({}, defaultVideoConfiguration, config);
        posterSrc = posterSrc || '';
        this.videoStatus = config.isPlaying ? VideoStatus.PLAYING : VideoStatus.PAUSED;
        let playIcon = document.createElement('i');
        this.playIcon = playIcon;
        let videoElement = document.createElement('video');
        videoElement.src = src;
        videoElement.loop = config.isLooping;
        videoElement.poster = posterSrc;
        videoElement.autoplay = config.isPlaying;
        videoElement.classList.add('responsive-video');
        this.addEventListenersTo(videoElement);
        this.element = videoElement;
        this.config = config;
    }
    getElement() {
        return this.element;
    }
    play() {
        this.getElement().play();
    }
    pause() {
        this.getElement().pause();
    }
    resume() {
        let status = this.getStatus();
        if (status === VideoStatus.PAUSED) {
            this.play();
        }
    }
    getVideoConfiguration() {
        return this.config;
    }
    addEventListenersTo(videoElement) {
        let _this = this;
        videoElement.addEventListener('click', function () {
            let videoStatus = _this.getStatus();
            switch (videoStatus) {
                case VideoStatus.PAUSED:
                    _this.resume();
                    break;
                case VideoStatus.STOPPED:
                    _this.play();
                    break;
                case VideoStatus.PLAYING:
                    _this.pause();
                    break;
            }
            _this.updateVideo();
        });
        videoElement.addEventListener('playing', function () {
            _this.setStatus(VideoStatus.PLAYING);
        });
        videoElement.addEventListener('pause', function () {
            _this.setStatus(VideoStatus.PAUSED);
        });
        videoElement.addEventListener('ended', function () {
            let config = _this.getVideoConfiguration();
            if (!config.isLooping) {
                _this.setStatus(VideoStatus.STOPPED);
            }
        });
    }
    setStatus(status) {
        this.videoStatus = status;
        this.updateVideo();
    }
    getStatus() {
        return this.videoStatus;
    }
    updateVideo() {
        // do something.
        // console.log(`The Video is currently ${VideoStatus[this.getStatus()]}`);
        // let el : HTMLElement = document.createElement('i');
        // el.classList.add('far', 'fa-play-circle');
        // this.getElement().append(el);
        // <i class="far fa-play-circle"></i>
        switch (this.getStatus()) {
            case VideoStatus.PLAYING:
                break;
            case VideoStatus.PAUSED:
                break;
            case VideoStatus.STOPPED:
                break;
            default:
                // something weird happened
                break;
        }
    }
}
var VideoStatus;
(function (VideoStatus) {
    VideoStatus[VideoStatus["PLAYING"] = 0] = "PLAYING";
    VideoStatus[VideoStatus["PAUSED"] = 1] = "PAUSED";
    VideoStatus[VideoStatus["STOPPED"] = 2] = "STOPPED";
})(VideoStatus || (VideoStatus = {}));
