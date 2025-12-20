/********************************
 * CONFIGURACIÓN CAMPAÑAS
 ********************************/
const campaigns = {
    1: { end: new Date("2025-12-22"), limit: 1000, enrolled: 0 },
    2: { end: new Date("2025-12-29"), limit: 800, enrolled: 0 },
    3: { end: new Date("2026-01-05"), limit: 600, enrolled: 0 },
    4: { end: new Date("2026-01-12"), limit: 700, enrolled: 0 },
    5: { end: new Date("2026-01-20"), limit: 500, enrolled: 0 },
    6: { end: new Date("2026-02-02"), limit: 900, enrolled: 0 }
};

let currentCampaign = null;
const userEnrollments = {};

/********************************
 * ELEMENTOS
 ********************************/
const modal = document.getElementById("modal");
const closeModal = document.querySelector(".close-modal");
const enrollForm = document.getElementById("enrollForm");
const toast = document.getElementById("toast");
const errorBox = document.querySelector(".modal-error");

/********************************
 * TEMPORIZADOR
 ********************************/
function updateTimers() {
    const now = new Date();

    document.querySelectorAll(".card").forEach(card => {
        const id = card.dataset.id;
        const timer = card.querySelector(".timer");
        const status = card.querySelector(".status");
        const btn = card.querySelector(".enroll-btn");
        const campaign = campaigns[id];

        const diff = campaign.end - now;

        if (diff <= 0) {
            timer.textContent = "Campaña finalizada";
            status.textContent = "Finalizada";
            btn.disabled = true;
            btn.textContent = "Cerrada";
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);

        timer.textContent = `Finaliza en ${days}d ${hours}h`;

        if (!status.classList.contains("active")) {
            btn.disabled = true;
        }
    });
}

setInterval(updateTimers, 1000);
updateTimers();

/********************************
 * INSCRIPCIÓN
 ********************************/
document.querySelectorAll(".enroll-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const card = btn.closest(".card");
        if (!card.querySelector(".status").classList.contains("active")) return;
        currentCampaign = card.dataset.id;
        modal.classList.remove("hidden");
    });
});

closeModal.addEventListener("click", () => {
    modal.classList.add("hidden");
    enrollForm.reset();
    errorBox.textContent = "";
});

enrollForm.addEventListener("submit", e => {
    e.preventDefault();

    const dni = dniInput.value.trim();
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();

    if (!dni || !name || !email) {
        errorBox.textContent = "Complete todos los campos.";
        return;
    }

    userEnrollments[dni] ??= [];

    if (userEnrollments[dni].length >= 2) {
        errorBox.textContent = "Máximo 2 campañas por persona.";
        return;
    }

    if (userEnrollments[dni].includes(currentCampaign)) {
        errorBox.textContent = "Ya estás inscrito.";
        return;
    }

    const campaign = campaigns[currentCampaign];
    if (campaign.enrolled >= campaign.limit) {
        errorBox.textContent = "Cupos agotados.";
        return;
    }

    campaign.enrolled++;
    userEnrollments[dni].push(currentCampaign);

    document
        .querySelector(`.card[data-id="${currentCampaign}"] .enrolled`)
        .textContent = campaign.enrolled;

    modal.classList.add("hidden");
    enrollForm.reset();
    showToast();
});

/********************************
 * TOAST (PASO 5)
 ********************************/
function showToast() {
    toast.classList.remove("hidden");
    setTimeout(() => toast.classList.add("hidden"), 3000);
}

/********************************
 * MODO OSCURO / CLARO
 ********************************/
const toggle = document.createElement("button");
toggle.className = "theme-toggle";
toggle.innerHTML = "🌙";
document.body.appendChild(toggle);

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    toggle.innerHTML = "☀️";
}

toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const dark = document.body.classList.contains("dark");
    toggle.innerHTML = dark ? "☀️" : "🌙";
    localStorage.setItem("theme", dark ? "dark" : "light");
});

/********************************
 * PARTÍCULAS DE FONDO
 ********************************/
const canvas = document.createElement("canvas");
canvas.className = "particles";
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

let particles = [];
const maxParticles = 60;

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

for (let i = 0; i < maxParticles; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 1,
        s: Math.random() * 0.5 + 0.2
    });
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = document.body.classList.contains("dark")
        ? "rgba(255,255,255,0.6)"
        : "rgba(0,0,0,0.2)";

    particles.forEach(p => {
        p.y += p.s;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
    });

    requestAnimationFrame(animate);
}
animate();
