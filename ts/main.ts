let body : HTMLElement | null = document.body;

if(body) {
    /** setting up scroll into view for the navbar */
    let navbar : HTMLElement | null = document.querySelector('.navbar');
    if(navbar) {
        let navElements : NodeListOf<HTMLAnchorElement> = navbar.querySelectorAll('a.nav-link');
        navElements.forEach((navElement: HTMLAnchorElement) => {
            navElement.addEventListener('click', (e: Event) => {
                let hrefId : string = navElement.hash;
                if(hrefId !== "") {                    
                    let el : HTMLElement | null = document.querySelector(hrefId);
                    if(el) {
                        /** prevent default click only if the element exists, otherwise it will default. */
                        e.preventDefault();

                        el.scrollIntoView({
                            behavior: 'smooth', 
                            block: 'start'
                        });
                    }
                }
            })
        });
    }
   
    /** creating custom video element. */
    let videoHeader : HTMLElement | null = document.getElementById('video-header');
    if(videoHeader) {
        const video : Video = new Video("assets/video/pexels-tea-oebel-6804114.mp4", "assets/img/video-poster.png");
        videoHeader.append(video.element);
    }

    /** hiding the socials until word typing has been completed. */
    let socials : HTMLElement | null = document.getElementById('socials');
    if(socials) {
        socials.classList.add('hide');
    }

    /** starting the text typer */
    let introTextSection : HTMLElement | null = document.getElementById('intro-text');
    
    if(introTextSection) {
        let container : HTMLElement = document.createElement('h1');
            container.classList.add('text-cursor');
        introTextSection.append(container);

        const typer : TextTyper = new TextTyper(container, 30, 100);
        let htmlString : string = "Hello, I am <span><a href=\"https://www.linkedin.com/in/jordan-o-hara-875b841a9/\" target=\"_blank\">Jordan O'Hara</a></span>. A Fulltime Software Engineering Student @ Brighton University";

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

    /** adding scroll into view to go-to-top */
    let goToTop : HTMLElement | null = document.querySelector('.go-to-top');

    /** if the element exists add click event  */
    if(goToTop) {
        goToTop.addEventListener('click', (e: Event) => {
            /** getting the target element  */
            let target: HTMLElement | null = (e.target as HTMLElement);

            /** if there is a target get the hash, prevent default and scroll into view. */
            if(target) {
                let hrefId : string = (target.parentElement as HTMLAnchorElement).hash;
                if(hrefId != "") {
                    let el : HTMLElement | null = document.querySelector(hrefId);
                    if(el) {
                        /** prevent default click only if the element exists, otherwise it will default. */
                        e.preventDefault();

                        el.scrollIntoView({
                            behavior: 'smooth', 
                            block: 'start'
                        });
                    }
                }
            }
        });
    }
}