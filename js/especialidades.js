/* =========================
   MODO CLARO / OSCURO
========================= */
const toggle = document.getElementById("themeToggle");
const body = document.body;

// CLARO por defecto
body.classList.remove("dark");

// Cargar preferencia guardada
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
    body.classList.add("dark");
    toggle.textContent = "☀️";
} else {
    toggle.textContent = "🌙";
}

toggle.addEventListener("click", () => {
    body.classList.toggle("dark");
    const isDark = body.classList.contains("dark");

    toggle.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("theme", isDark ? "dark" : "light");
});


/* =========================
   DATOS DE ESPECIALIDADES
========================= */
const data = {
    cardiologia: {
        titulo: "Cardiología",
        descripcion:
            "Especialidad dedicada a la prevención, diagnóstico y tratamiento de enfermedades cardiovasculares.",
        icon: "fa-heart-pulse",
        items: [
            "Chequeos cardiológicos completos",
            "Control de presión arterial",
            "Electrocardiograma",
            "Seguimiento médico personalizado"
        ]
    },
    pediatria: {
        titulo: "Pediatría",
        descripcion:
            "Atención integral para niños y adolescentes con enfoque preventivo y humano.",
        icon: "fa-baby",
        items: [
            "Control de crecimiento y desarrollo",
            "Vacunación",
            "Prevención de enfermedades",
            "Orientación a padres"
        ]
    },
    odontologia: {
        titulo: "Odontología",
        descripcion:
            "Cuidado dental moderno enfocado en la salud y estética bucal.",
        icon: "fa-tooth",
        items: [
            "Limpieza dental profesional",
            "Tratamientos restaurativos",
            "Ortodoncia",
            "Prevención bucal"
        ]
    },
    psicologia: {
        titulo: "Psicología",
        descripcion:
            "Atención especializada para el bienestar emocional y mental.",
        icon: "fa-brain",
        items: [
            "Terapia individual",
            "Orientación emocional",
            "Manejo del estrés",
            "Salud mental integral"
        ]
    },
    medicina: {
        titulo: "Medicina General",
        descripcion:
            "Atención primaria integral enfocada en la prevención y diagnóstico oportuno.",
        icon: "fa-user-doctor",
        items: [
            "Consulta médica general",
            "Evaluaciones preventivas",
            "Control de enfermedades comunes",
            "Derivación a especialistas"
        ]
    },
    dermatologia: {
        titulo: "Dermatología",
        descripcion:
            "Cuidado integral de la piel, cabello y uñas con tecnología especializada.",
        icon: "fa-hand-sparkles",
        items: [
            "Tratamiento del acné",
            "Control de enfermedades cutáneas",
            "Dermatología estética",
            "Prevención y diagnóstico precoz"
        ]
    },
    oftalmologia: {
        titulo: "Oftalmología",
        descripcion:
            "Diagnóstico y tratamiento de enfermedades relacionadas con la visión.",
        icon: "fa-eye",
        items: [
            "Exámenes visuales completos",
            "Control de la visión",
            "Detección temprana de patologías",
            "Salud ocular integral"
        ]
    },
    neumologia: {
        titulo: "Neumología",
        descripcion:
            "Tratamiento especializado de enfermedades respiratorias.",
        icon: "fa-lungs",
        items: [
            "Evaluación pulmonar",
            "Tratamiento de asma y bronquitis",
            "Control de enfermedades respiratorias",
            "Seguimiento clínico"
        ]
    }
};


/* =========================
   MODAL PROFESIONAL
========================= */
const modal = document.getElementById("modalOverlay");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDescription");
const modalList = document.getElementById("modalList");
const modalIcon = document.getElementById("modalIcon");
const modalClose = document.getElementById("modalClose");

document.querySelectorAll(".btn-vermas").forEach(btn => {
    btn.addEventListener("click", () => {
        const key = btn.dataset.especialidad;
        const info = data[key];

        if (!info) return;

        modalTitle.textContent = info.titulo;
        modalDesc.textContent = info.descripcion;
        modalIcon.innerHTML = `<i class="fa-solid ${info.icon}"></i>`;

        modalList.innerHTML = "";
        info.items.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item;
            modalList.appendChild(li);
        });

        modal.classList.add("active");
    });
});

modalClose.addEventListener("click", () => {
    modal.classList.remove("active");
});

modal.addEventListener("click", e => {
    if (e.target === modal) {
        modal.classList.remove("active");
    }
});


/* =========================
   ANIMACIÓN DE CARDS (REVEAL)
========================= */
const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.2 }
);

document.querySelectorAll(".card").forEach(card => {
    observer.observe(card);
});


/* =========================
   PARTICLES JS
========================= */
if (window.particlesJS) {
    particlesJS("particles-bg", {
        particles: {
            number: { value: 70 },
            color: { value: "#3b82f6" },
            shape: { type: "circle" },
            opacity: {
                value: 0.4,
                random: true
            },
            size: {
                value: 3,
                random: true
            },
            move: {
                enable: true,
                speed: 1.4,
                direction: "none",
                out_mode: "out"
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#3b82f6",
                opacity: 0.15,
                width: 1
            }
        },
        retina_detect: true
    });
}
