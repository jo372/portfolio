let sideNav = document.querySelector('.rightSidePanel');
/** if there is a side nav bar */
if (sideNav) {
    /** try to get the listed items on the side nav */
    let listItems = sideNav.querySelectorAll('li');
    /** if there are elements, loop through them all */
    if (listItems) {
        /** for each of the elements, get their href */
        listItems.forEach((listItem) => {
            let anchorElement = listItem.querySelector('a');
            /** if the anchor element exists, add click event */
            if (anchorElement) {
                let hrefId = anchorElement.hash;
                /** if there is a hash */
                if (hrefId != "") {
                    anchorElement.addEventListener('click', (e) => {
                        e.preventDefault();
                        return false;
                    });
                    listItem.addEventListener('click', function (e) {
                        let el = document.querySelector(hrefId);
                        if (el) {
                            e.preventDefault();
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
                    });
                }
            }
        });
    }
}
