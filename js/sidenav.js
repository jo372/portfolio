let sideNav = document.querySelector('.rightSidePanel');
if (sideNav) {
    let listItems = sideNav.querySelectorAll('li');
    if (listItems) {
        listItems.forEach((listItem) => {
            let anchorElement = listItem.querySelector('a');
            if (anchorElement) {
                anchorElement.addEventListener('click', (e) => {
                    e.preventDefault();
                    return false;
                });
                let hrefId = anchorElement.hash;
                listItem.addEventListener('click', function (e) {
                    e.preventDefault();
                    if (hrefId !== "") {
                        let el = document.querySelector(hrefId);
                        if (el) {
                            el.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            });
                        }
                        let previousSelectedElement = sideNav.querySelector('li.active');
                        if (previousSelectedElement) {
                            previousSelectedElement.classList.toggle('active');
                        }
                        listItem.classList.add('active');
                    }
                });
            }
        });
    }
}
