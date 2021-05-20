let sideNav : HTMLElement | null = document.querySelector('.rightSidePanel');
if(sideNav) {
    let listItems : NodeListOf<HTMLLIElement> | null = sideNav.querySelectorAll('li');
    if(listItems) {
        listItems.forEach((listItem : HTMLLIElement) => {
            let anchorElement : HTMLAnchorElement | null = listItem.querySelector('a');
            if(anchorElement) {
                anchorElement.addEventListener('click', (e: Event) => { 
                    e.preventDefault();
                    return false; 
                });

                let hrefId : string = anchorElement.hash;
                listItem.addEventListener('click', function(e: Event) {
                    e.preventDefault();
                    if(hrefId !== "") {
                        let el : HTMLElement | null = document.querySelector(hrefId);
                        if(el) {
                            el.scrollIntoView({
                                behavior: 'smooth', 
                                block: 'center'
                            });
                        }
                        let previousSelectedElement : HTMLLIElement | null = sideNav.querySelector('li.active');
                            if(previousSelectedElement) {
                                previousSelectedElement.classList.toggle('active');
                            }
                        listItem.classList.add('active');
                    }
                });
            }
        });
    }
}