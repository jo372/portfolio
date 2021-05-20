var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var defaultVideoConfiguration = {
    isLooping: true,
    isPlaying: true
};
var Video = /** @class */ (function () {
    function Video(src, config) {
        config = __assign({}, defaultVideoConfiguration, config);
        this.videoStatus = config.isPlaying ? VideoStatus.PLAYING : VideoStatus.PAUSED;
        var playIcon = document.createElement('i');
        this.playIcon = playIcon;
        var videoElement = document.createElement('video');
        videoElement.src = src;
        videoElement.loop = config.isLooping;
        videoElement.autoplay = config.isPlaying;
        videoElement.classList.add('responsive-video');
        this.addEventListenersTo(videoElement);
        this.element = videoElement;
        this.config = config;
    }
    Video.prototype.getElement = function () {
        return this.element;
    };
    Video.prototype.play = function () {
        this.getElement().play();
    };
    Video.prototype.pause = function () {
        this.getElement().pause();
    };
    Video.prototype.resume = function () {
        var status = this.getStatus();
        if (status === VideoStatus.PAUSED) {
            this.play();
        }
    };
    Video.prototype.getVideoConfiguration = function () {
        return this.config;
    };
    Video.prototype.addEventListenersTo = function (videoElement) {
        var _this = this;
        videoElement.addEventListener('click', function () {
            var videoStatus = _this.getStatus();
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
            var config = _this.getVideoConfiguration();
            if (!config.isLooping) {
                _this.setStatus(VideoStatus.STOPPED);
            }
        });
    };
    Video.prototype.setStatus = function (status) {
        this.videoStatus = status;
        this.updateVideo();
    };
    Video.prototype.getStatus = function () {
        return this.videoStatus;
    };
    Video.prototype.updateVideo = function () {
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
    };
    return Video;
}());
var VideoStatus;
(function (VideoStatus) {
    VideoStatus[VideoStatus["PLAYING"] = 0] = "PLAYING";
    VideoStatus[VideoStatus["PAUSED"] = 1] = "PAUSED";
    VideoStatus[VideoStatus["STOPPED"] = 2] = "STOPPED";
})(VideoStatus || (VideoStatus = {}));
