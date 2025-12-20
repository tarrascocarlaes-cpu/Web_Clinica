document.addEventListener('DOMContentLoaded', () => {

    /* =========================
       MODO OSCURO / CLARO
    ========================= */
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    // Cargar tema guardado
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark');
        themeToggle.textContent = '☀️';
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark');
        const isDark = body.classList.contains('dark');
        themeToggle.textContent = isDark ? '☀️' : '🌙';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    /* =========================
       FAQ ACORDEÓN
    ========================= */
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        item.querySelector('.faq-question').addEventListener('click', () => {
            faqItems.forEach(other => {
                if (other !== item) other.classList.remove('active');
            });
            item.classList.toggle('active');
        });
    });

    /* =========================
       MODAL
    ========================= */
    const modal = document.getElementById('questionModal');
    const openModalBtn = document.getElementById('openModal');
    const closeModalBtn = document.getElementById('closeModal');

    openModalBtn.addEventListener('click', () => modal.classList.add('show'));
    closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', e => e.target === modal && closeModal());

    function closeModal() {
        modal.classList.remove('show');
        clearErrors();
    }

    /* =========================
       VALIDACIÓN FORM
    ========================= */
    const form = document.getElementById('questionForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const questionInput = document.getElementById('question');

    form.addEventListener('submit', e => {
        e.preventDefault();
        clearErrors();

        let valid = true;

        if (nameInput.value.trim().length < 3) {
            showError(nameInput, 'Ingrese un nombre válido');
            valid = false;
        }

        if (!validateEmail(emailInput.value)) {
            showError(emailInput, 'Correo electrónico inválido');
            valid = false;
        }

        if (questionInput.value.trim().length < 10) {
            showError(questionInput, 'La pregunta debe tener al menos 10 caracteres');
            valid = false;
        }

        if (valid) {
            alert('✅ Tu pregunta fue enviada correctamente');
            form.reset();
            closeModal();
        }
    });

    function showError(input, msg) {
        input.parentElement.querySelector('.error').textContent = msg;
    }

    function clearErrors() {
        document.querySelectorAll('.error').forEach(e => e.textContent = '');
    }

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    /* =========================
       PARTÍCULAS
    ========================= */
    const canvas = document.querySelector('.particles');
    const ctx = canvas.getContext('2d');

    let particles = [];
    const count = 80;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speed = Math.random() * 0.6 + 0.2;
        }
        update() {
            this.y -= this.speed;
            if (this.y < 0) this.reset();
        }
        draw() {
            ctx.fillStyle = body.classList.contains('dark')
                ? 'rgba(255,255,255,0.6)'
                : 'rgba(40,90,223,0.25)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();

});
