document.addEventListener('DOMContentLoaded', (event) => {
        const menuToogle = document.querySelector('.menu-toggle'); 
        const nav = document.querySelector('.main-nav'); 
        const navLinks = document.querySelector('.nav-links'); 

        if (menuToogle && nav) {
            menuToogle.addEventListener('click', () => {
                nav.classList.toggle('open');
            });
        }
        
        if (navLinks) {
            navLinks.addEventListener('click', (e) => {
                if (window.innerWidth <= 850) {
                    const link = e.target.closest('a');
                    const listItem = e.target.closest('li');

                    if (link && listItem.querySelector('.submenu')) {
                        e.preventDefault();

                        const submenu = listItem.querySelector('.submenu');

                        document.querySelectorAll('.nav-links > li').forEach(item => {
                            if (item !== listItem && item.classList.contains('submenu-open')) {
                                item.classList.remove('submenu-open');
                                item.querySelector('.submenu').style.maxHeight = 0;
                            }
                        });

                        listItem.classList.toggle('submenu-open');

                        if (listItem.classList.contains('submenu-open')) {
                            submenu.style.maxHeight = submenu.scrollHeight + "px";
                        } else {
                            submenu.style.maxHeight = 0;
                        }
                    }
                }
            });
        }
    });


document.addEventListener('DOMContentLoaded',(event) => {
    if(window.innerWidth<= 767){
        const footerHeaders = document.querySelectorAll('.footer-links h4');

        footerHeaders.forEach(header =>{
            header.addEventListener('click', () =>{
                const parent = header.closest('.footer-links');
                const content = parent.querySelector('.footer-content');

                if(parent.classList.contains('active')){
                    content.style.maxHeight = 0;
                    parent.classList.remove('active');
                }else{
                    document.querySelectorAll('.footer-links.active').forEach(item =>{
                        item.classList.remove('active');
                        item.querySelector('.footer-content').style.maxHeight=0;
                    });

                    parent.classList.add('active');
                    content.style.maxHeight = content.scrollHeight + "px";
                }
            });
        });
    }
});