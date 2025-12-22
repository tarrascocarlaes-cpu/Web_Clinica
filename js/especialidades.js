document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM Cargado correctamente");

    // ==========================================
    // 1. DATA (Tus datos)
    // ==========================================
    const especialidadesData = [
        { key: "cardiologia", nombre: "Cardiología", icon: "fa-heart", descripcion: "Prevención y tratamiento de enfermedades cardiovasculares.", items: ["Chequeos completos", "Electrocardiograma", "Control presión arterial"] },
        { key: "pediatria", nombre: "Pediatría", icon: "fa-baby", descripcion: "Atención integral para niños y adolescentes.", items: ["Vacunación", "Control crecimiento", "Orientación a padres"] },
        { key: "odontologia", nombre: "Odontología", icon: "fa-tooth", descripcion: "Salud y estética dental.", items: ["Limpieza dental", "Ortodoncia", "Tratamientos restaurativos"] },
        { key: "psicologia", nombre: "Psicología", icon: "fa-brain", descripcion: "Bienestar emocional y salud mental.", items: ["Terapia individual", "Manejo estrés", "Orientación emocional"] },
        { key: "medicinageneral", nombre: "Medicina General", icon: "fa-user-doctor", descripcion: "Atención primaria integral.", items: ["Consulta general", "Control preventivo", "Derivación a especialistas"] },
        { key: "dermatologia", nombre: "Dermatología", icon: "fa-hand-sparkles", descripcion: "Cuidado de piel, cabello y uñas.", items: ["Tratamiento acné", "Dermatología estética", "Prevención enfermedades cutáneas"] },
        { key: "oftalmologia", nombre: "Oftalmología", icon: "fa-eye", descripcion: "Salud visual y diagnóstico oftalmológico.", items: ["Exámenes visuales", "Control visión", "Detección temprana"] },
        { key: "neumologia", nombre: "Neumología", icon: "fa-lungs", descripcion: "Tratamiento de enfermedades respiratorias.", items: ["Evaluación pulmonar", "Tratamiento asma y bronquitis", "Seguimiento clínico"] }
    ];

    // ==========================================
    // 2. CONFIGURACIÓN DE PARTÍCULAS (Opcional)
    // ==========================================
    // Solo se ejecuta si existe la librería y el div
    if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#16a34a" }, // Color verde secundario
                "opacity": { "value": 0.5 },
                "size": { "value": 3 },
                "line_linked": { "enable": true, "distance": 150, "color": "#0f3f7e", "opacity": 0.4, "width": 1 },
                "move": { "enable": true, "speed": 2 }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" } }
            }
        });
    }

    // ==========================================
    // 3. MODO OSCURO / CLARO
    // ==========================================
    // Usamos getElementById si tiene ID, o querySelector si es clase
    const themeToggle = document.getElementById("themeToggle"); 
    const body = document.body;

    // Cargar tema
    if (localStorage.getItem("theme") === "dark") {
        body.classList.add("dark-mode");
        if(themeToggle) themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }

    if(themeToggle) {
        themeToggle.addEventListener("click", () => {
            body.classList.toggle("dark-mode");
            const isDark = body.classList.contains("dark-mode");
            
            // Cambiar icono
            themeToggle.innerHTML = isDark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
            localStorage.setItem("theme", isDark ? "dark" : "light");
        });
    }

    // ==========================================
    // 4. POPUP DE USUARIO (Corregido con IDs)
    // ==========================================
    const userIcon = document.getElementById("userIcon");
    const userPopup = document.getElementById("userPopup");

    if (userIcon && userPopup) {
        userIcon.addEventListener("click", (e) => {
            e.stopPropagation(); // Evita burbujeo
            userPopup.classList.toggle("active");
        });

        // Cerrar al hacer clic fuera
        document.addEventListener("click", (e) => {
            if (!userIcon.contains(e.target) && !userPopup.contains(e.target)) {
                userPopup.classList.remove("active");
            }
        });
    } else {
        console.error("No se encontró el icono de usuario o el popup en el HTML");
    }

    // ==========================================
    // 5. MENÚ MÓVIL
    // ==========================================
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            navLinks.classList.toggle("active");
            
            // Animación simple del icono hamburguesa
            const bars = menuToggle.querySelectorAll(".bar");
            if(navLinks.classList.contains("active")){
                bars[0].style.transform = "rotate(45deg) translate(5px, 5px)";
                bars[1].style.opacity = "0";
                bars[2].style.transform = "rotate(-45deg) translate(5px, -5px)";
            } else {
                bars[0].style.transform = "none";
                bars[1].style.opacity = "1";
                bars[2].style.transform = "none";
            }
        });
        
        // Cerrar menú al hacer clic fuera
        document.addEventListener("click", (e) => {
            if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
                navLinks.classList.remove("active");
                 // Reset icono
                 const bars = menuToggle.querySelectorAll(".bar");
                 bars[0].style.transform = "none";
                 bars[1].style.opacity = "1";
                 bars[2].style.transform = "none";
            }
        });
    }

    // ==========================================
    // 6. GENERAR CARDS Y MODAL
    // ==========================================
    const grid = document.querySelector(".grid");

    if (grid) {
        grid.innerHTML = "";
        
        especialidadesData.forEach((esp, i) => {
            const card = document.createElement("article");
            card.classList.add("card");
            card.style.transitionDelay = `${i * 100}ms`; // Retraso escalonado
            
            card.innerHTML = `
                <div class="icon"><i class="fa-solid ${esp.icon}"></i></div>
                <h3>${esp.nombre}</h3>
                <p>${esp.descripcion}</p>
                <button class="btn-vermas" data-key="${esp.key}">Ver más</button>
            `;
            grid.appendChild(card);
        });

        // Observador para animación de entrada
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting){
                    entry.target.classList.add("show");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        // Pequeño timeout para asegurar que el DOM pintó las cards
        setTimeout(() => {
            document.querySelectorAll(".card").forEach(c => observer.observe(c));
        }, 100);
    }

    // ==========================================
    // 7. LÓGICA DEL MODAL (Corregida con IDs)
    // ==========================================
    // Seleccionamos por ID porque tu HTML tiene IDs
    const modalOverlay = document.getElementById("modalOverlay");
    const modalClose = document.getElementById("modalClose");
    
    // Elementos internos
    const modalTitle = document.getElementById("modalTitle");
    const modalDescription = document.getElementById("modalDescription");
    const modalList = document.getElementById("modalList");
    const modalIcon = document.getElementById("modalIcon");

    function openModal(key) {
        const data = especialidadesData.find(item => item.key === key);
        if (!data) return;

        // Llenar datos
        if(modalTitle) modalTitle.textContent = data.nombre;
        if(modalDescription) modalDescription.textContent = data.descripcion;
        if(modalIcon) modalIcon.innerHTML = `<i class="fa-solid ${data.icon}"></i>`;
        
        if(modalList) {
            modalList.innerHTML = "";
            data.items.forEach(text => {
                const li = document.createElement("li");
                li.textContent = text;
                modalList.appendChild(li);
            });
        }

        // Mostrar
        if(modalOverlay) {
            modalOverlay.classList.remove("hidden");
            // Forzar un reflow para que la animación CSS funcione si usas transiciones
            void modalOverlay.offsetWidth; 
            modalOverlay.style.opacity = "1";
            modalOverlay.style.pointerEvents = "auto";
        }
        document.body.style.overflow = "hidden";
    }

    function closeModal() {
        if(modalOverlay) {
            modalOverlay.classList.add("hidden");
            modalOverlay.style.opacity = "0";
            modalOverlay.style.pointerEvents = "none";
        }
        document.body.style.overflow = "auto";
    }

    // Event Delegation para los botones "Ver más"
    document.addEventListener("click", (e) => {
        if(e.target.classList.contains("btn-vermas")) {
            const key = e.target.dataset.key;
            openModal(key);
        }
    });

    // Cerrar Modal
    if(modalClose) modalClose.addEventListener("click", closeModal);
    
    if(modalOverlay) {
        modalOverlay.addEventListener("click", (e) => {
            if(e.target === modalOverlay) closeModal();
        });
    }

    document.addEventListener("keydown", (e) => {
        if(e.key === "Escape") closeModal();
    });

});