const defaultVideoConfiguration: VideoConfiguration = {
    isLooping: true,
    isPlaying: true
}

class Video {
    // setting the default to be playing.
    private videoStatus : VideoStatus;
    private config : VideoConfiguration;
    public element : HTMLVideoElement;
    private playIcon: HTMLElement;

    constructor(src: string, config?: VideoConfiguration) {
        config = { ...defaultVideoConfiguration, ...config};
        this.videoStatus = config.isPlaying ? VideoStatus.PLAYING : VideoStatus.PAUSED;
        
        let playIcon = document.createElement('i');
        
        this.playIcon = playIcon;
        let videoElement : HTMLVideoElement = document.createElement('video');
            videoElement.src = src;
            videoElement.loop = config.isLooping;
            videoElement.autoplay = config.isPlaying;
            videoElement.classList.add('responsive-video');
            this.addEventListenersTo(videoElement);
        
        this.element = videoElement;
        this.config = config;

    }

    public getElement() : HTMLVideoElement {
        return this.element;
    }

    public play() : void {
        this.getElement().play();
    }

    public pause() : void {
        this.getElement().pause();
    }

    public resume() : void {
        let status : VideoStatus = this.getStatus();
        if(status === VideoStatus.PAUSED) {
            this.play();
        }
    }

    public getVideoConfiguration() : VideoConfiguration {
        return this.config;
    }

    private addEventListenersTo(videoElement: HTMLVideoElement) {
        let _this : Video = this;
        videoElement.addEventListener('click', function() {
            let videoStatus : VideoStatus = _this.getStatus();

            switch(videoStatus) {
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
        videoElement.addEventListener('playing', function() {
            _this.setStatus(VideoStatus.PLAYING);
        });
        videoElement.addEventListener('pause', function() {
            _this.setStatus(VideoStatus.PAUSED);
        });
        videoElement.addEventListener('ended', function() {
            let config : VideoConfiguration = _this.getVideoConfiguration();
            if(!config.isLooping) {
                _this.setStatus(VideoStatus.STOPPED);
            }
        });
    }

    private setStatus(status: VideoStatus) : void {
        this.videoStatus = status;
        this.updateVideo();
    }

    private getStatus() : VideoStatus {
        return this.videoStatus;
    }

    private updateVideo() {
        // do something.
        // console.log(`The Video is currently ${VideoStatus[this.getStatus()]}`);
        // let el : HTMLElement = document.createElement('i');
        // el.classList.add('far', 'fa-play-circle');

        // this.getElement().append(el);
        // <i class="far fa-play-circle"></i>
        switch(this.getStatus()) {
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

interface VideoConfiguration {
    isLooping?: boolean,
    isPlaying?: boolean
}

enum VideoStatus {
    PLAYING,
    PAUSED,
    STOPPED
}
