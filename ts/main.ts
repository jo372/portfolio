let body : HTMLElement | null = document.body;

if(body) {
    let videoHeader : HTMLElement | null = document.getElementById('video-header');
    if(videoHeader) {
        const video : Video = new Video("assets/video/pexels-tea-oebel-6804114.mp4", "assets/img/video-poster.png");
        videoHeader.append(video.element);
    }
    let introTextSection : HTMLElement | null = document.getElementById('intro-text');
    if(introTextSection) {
        let container : HTMLElement = document.createElement('h1');
            container.classList.add('text-cursor');
        introTextSection.append(container);

        const typer : TextTyper = new TextTyper(container, 30, 100);
        // minTypingTime?: number, randomTypingTime
        let htmlString : string = "Hello, I am <span><a href=\"https://www.linkedin.com/in/jordan-o-hara-875b841a9/\" target=\"_blank\">Jordan O'Hara</a></span>. I'm a fulltime Software Engineering Student @ Brighton University";
        // let textToType : string = "Hello, I am Jordan O'Hara. I'm a fulltime Software Engineering Student @ Brighton University";
        
        typer
        .clearNow()
        .wait(1000)
        .type("Hi,")
        .remove("Hi,".length)
        .type("Hello, I am Jordan O'Hara.")
        .type(" I'm a fulltime Software Engineering Student")
        .type(" @ ")
        .type("Brighton University")
        .stop()
        .chain(() => {
            // container.classList.remove('text-cursor');
            container.innerHTML = htmlString;
        });
    }
}