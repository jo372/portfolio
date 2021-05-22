let sideNav : HTMLElement | null = document.querySelector('.rightSidePanel');
/** if there is a side nav bar */
if(sideNav) {
    /** try to get the listed items on the side nav */
    let listItems : NodeListOf<HTMLLIElement> | null = sideNav.querySelectorAll('li');

    /** if there are elements, loop through them all */
    if(listItems) {
        /** for each of the elements, get their href */
        listItems.forEach((listItem : HTMLLIElement) => {
            let anchorElement : HTMLAnchorElement | null = listItem.querySelector('a');
            /** if the anchor element exists, add click event */
            if(anchorElement) {
                let hrefId : string = anchorElement.hash;
                /** if there is a hash */
                if(hrefId != "") {
                    anchorElement.addEventListener('click', (e: Event) => { 
                        e.preventDefault();
                        return false; 
                    });
                    
                    listItem.addEventListener('click', function(e: Event) {
                        let el : HTMLElement | null = document.querySelector(hrefId);
                        if(el) {
                            e.preventDefault();
                            el.scrollIntoView({
                                behavior: 'smooth', 
                                block: 'start'
                            });
                        }
                        let previousSelectedElement : HTMLLIElement | null = sideNav.querySelector('li.active');
                            if(previousSelectedElement) {
                                previousSelectedElement.classList.toggle('active');
                            }
                        listItem.classList.add('active');
                    });
                }
            }
        });
    }
}