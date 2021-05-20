var sideNav = document.querySelector('.rightSidePanel');
if (sideNav) {
    var listItems = sideNav.querySelectorAll('li');
    if (listItems) {
        listItems.forEach(function (listItem) {
            var anchorElement = listItem.querySelector('a');
            if (anchorElement) {
                anchorElement.addEventListener('click', function (e) {
                    e.preventDefault();
                    return false;
                });
                var hrefId_1 = anchorElement.hash;
                listItem.addEventListener('click', function (e) {
                    e.preventDefault();
                    if (hrefId_1 !== "") {
                        var el = document.querySelector(hrefId_1);
                        if (el) {
                            el.scrollIntoView({
                                behavior: 'smooth',
                                block: 'center'
                            });
                        }
                        var previousSelectedElement = sideNav.querySelector('li.active');
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
