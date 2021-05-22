let body : HTMLElement | null = document.body;

if(body) {
    let navbar : HTMLElement | null = document.querySelector('.navbar');
    if(navbar) {
        let navElements : NodeListOf<HTMLAnchorElement> = navbar.querySelectorAll('a.nav-link');
        navElements.forEach((navElement: HTMLAnchorElement) => {
            navElement.addEventListener('click', (e: Event) => {
                e.preventDefault();

                let hrefId : string = navElement.hash;

                if(hrefId !== "") {
                    let el : HTMLElement | null = document.querySelector(hrefId);
                    if(el) {
                        el.scrollIntoView({
                            behavior: 'smooth', 
                            block: 'start'
                        });
                    }
                }
            })
        });
    }
   
    let videoHeader : HTMLElement | null = document.getElementById('video-header');
    if(videoHeader) {
        const video : Video = new Video("assets/video/pexels-tea-oebel-6804114.mp4", "assets/img/video-poster.png");
        videoHeader.append(video.element);
    }

    let socials : HTMLElement | null = document.getElementById('socials');
    if(socials) {
        socials.classList.add('hide');
    }

    let introTextSection : HTMLElement | null = document.getElementById('intro-text');
    
    if(introTextSection) {
        let container : HTMLElement = document.createElement('h1');
            container.classList.add('text-cursor');
        introTextSection.append(container);

        const typer : TextTyper = new TextTyper(container, 30, 100);
        // minTypingTime?: number, randomTypingTime
        let htmlString : string = "Hello, I am <span><a href=\"https://www.linkedin.com/in/jordan-o-hara-875b841a9/\" target=\"_blank\">Jordan O'Hara</a></span>. A Fulltime Software Engineering Student @ Brighton University";
        // let textToType : string = "Hello, I am Jordan O'Hara. I'm a fulltime Software Engineering Student @ Brighton University";
        
        typer
        .clearNow()
        .wait(1000)
        .type("Hi,")
        .remove("Hi,".length)
        .type("Hello, I am Jordan O'Hara.")
        .type(" A Fulltime Software Engineering Student")
        .type(" @ ")
        .type("Brighton University")
        .stop()
        .chain(() => {
            container.innerHTML = htmlString;

            if(socials.classList.contains('hide')) {
                socials.classList.add('fadeIn');
                socials.classList.remove('hide');
            }
        })
        .wait(3000)
        .chain(() => {
            if(!container.classList.contains('no-animation')) {
                container.classList.add('no-animation');
            }
        });
    }
}