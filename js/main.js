let body = document.body;
if (body) {
    /** setting up scroll into view for the navbar */
    let navbar = document.querySelector('.navbar');
    if (navbar) {
        let navElements = navbar.querySelectorAll('a.nav-link');
        navElements.forEach((navElement) => {
            navElement.addEventListener('click', (e) => {
                let hrefId = navElement.hash;
                if (hrefId !== "") {
                    let el = document.querySelector(hrefId);
                    if (el) {
                        /** prevent default click only if the element exists, otherwise it will default. */
                        e.preventDefault();
                        el.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
    }
    /** hiding the socials until word typing has been completed. */
    let socials = document.getElementById('socials');
    if (socials) {
        socials.classList.add('hide');
    }
    /** starting the text typer */
    let introTextSection = document.getElementById('intro-text');
    if (introTextSection) {
        /** creating the container which the text typer will writing into and appending into the parent element. */
        let container = document.createElement('h1');
        container.classList.add('text-cursor');
        introTextSection.append(container);
        const typer = new TextTyper(container, 30, 100);
        /** the html string that will be written after they text typer has finished. */
        let htmlString = "Hello, I am <span><a href=\"https://www.linkedin.com/in/jordan-o-hara-875b841a9/\" target=\"_blank\">Jordan O'Hara</a></span>. A Fulltime Software Engineering Student @ Brighton University";
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
            if (socials.classList.contains('hide')) {
                socials.classList.add('fadeIn');
                socials.classList.remove('hide');
            }
        })
            .wait(3000)
            .chain(() => {
            if (!container.classList.contains('no-animation')) {
                container.classList.add('no-animation');
            }
        });
    }
    /** adding scroll into view to go-to-top */
    let goToTop = document.querySelector('.go-to-top');
    /** if the element exists add click event  */
    if (goToTop) {
        goToTop.addEventListener('click', (e) => {
            /** getting the target element  */
            let target = e.target;
            /** if there is a target get the hash, prevent default and scroll into view. */
            if (target) {
                let hrefId = target.parentElement.hash;
                if (hrefId != "") {
                    let el = document.querySelector(hrefId);
                    if (el) {
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
