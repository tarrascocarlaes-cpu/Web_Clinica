/*SCRIPT DEL LOGIN Y REGISTER*/
document.addEventListener('DOMContentLoaded', (event) => {
    //Referencias
    const container = document.querySelector('.container');
    const registerBtn = document.querySelector('.register_btn');
    const loginBtn = document.querySelector('.login_btn');
    
    if (registerBtn && loginBtn && container) {
        registerBtn.addEventListener('click', () => {
            container.classList.add('active');
        });
        loginBtn.addEventListener('click', () => {
            container.classList.remove('active');
        });
    }
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


/*SCRIPT PARA VALIDAR LOS CAMPOS DE LOGIN Y REGISTER AL CAMBIAR DE BUTTON A "a" */
document.addEventListener('DOMContentLoaded', (event) => {
    //Referencias
    const loginLink = document.getElementById('loginLink');
    const loginForm = document.getElementById('loginForm');
    const registerLink = document.getElementById('registerLink');
    const registerForm = document.getElementById('registerForm');
    if (loginLink && loginForm) {
        loginLink.addEventListener('click', (e) => {
            e.preventDefault(); 
            const formValid = loginForm.reportValidity();
            if (formValid) {
                window.location.href = 'formulario_datos.html'; 
            } else {}
        });
    }
    if (registerLink && registerForm) {
        function validateRegistration(form) {
            const password = form.elements['password'].value;
            const confirmPassword = form.elements['confirmPassword'].value;
            if (!form.reportValidity()) {
                return false;
            }
            if (password !== confirmPassword) {
                alert("Las contraseñas no coinciden. Por favor, verifíquelas.");
                form.elements['confirmPassword'].focus();
                return false;
            }
            return true; 
        }
        registerLink.addEventListener('click', (e) => {
            e.preventDefault(); 
            if (validateRegistration(registerForm)) {
                window.location.href = 'formulario_datos.html'; 
            }
        });
    }
});

/*Boton Ver Mas*/
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.boton-ver-mas');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Encuentra el contenedor principal de la tarjeta
            const card = button.closest('.mini-tarjeta');
            // Encuentra el div que contiene el texto completo (clase 'sidebar-full-text')
            const fullText = card.querySelector('.sidebar-full-text');
                
            // Verifica si el texto completo esta oculto (tiene la clase 'hidden')
            if (fullText.classList.contains('hidden')) {
                // Si esta oculto, lo muestra
                fullText.classList.remove('hidden');
                // Cambia el texto del botón
                button.textContent = 'Ver Menos';
                // Opcional: Añade una clase al articulo para cambiar estilos (como el color del botón)
                card.classList.add('expanded');
            } else {
                // Si esto visible, lo oculta
                fullText.classList.add('hidden');
                // Cambia el texto del boton
                button.textContent = 'Ver Más';
                // Opcional: Elimina la clase de expansion
                card.classList.remove('expanded');
            }
        });
    });
});
/*Footer*/
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
/*Modo oscuro*/
document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;
    const icon = darkModeToggle.querySelector('i');

    // Función para actualizar el icono
    const updateIcon = (isDark) => {
        if (isDark) {
            icon.classList.replace('fa-moon', 'fa-sun');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
        }
    };

    // Cargar preferencia guardada
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
        updateIcon(true);
    }

    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDark = body.classList.contains('dark-mode');
        
        updateIcon(isDark);
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
});